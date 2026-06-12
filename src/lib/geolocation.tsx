import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type GeoState = {
  city: string;
  province: string;
  provinceShort: string;
  status: "idle" | "loading" | "granted" | "denied" | "error";
};

const DEFAULT: GeoState = {
  city: "",
  province: "Indonesia",
  provinceShort: "Indonesia",
  status: "idle",
};

const PROVINCE_SHORT: Record<string, string> = {
  "DKI Jakarta": "DKI",
  "Jakarta": "DKI",
  "Jawa Barat": "Jabar",
  "West Java": "Jabar",
  "Jawa Tengah": "Jateng",
  "Central Java": "Jateng",
  "Jawa Timur": "Jatim",
  "East Java": "Jatim",
  "Daerah Istimewa Yogyakarta": "DIY",
  "Special Region of Yogyakarta": "DIY",
  "Yogyakarta": "DIY",
  "Banten": "Banten",
  "Aceh": "Aceh",
  "Sumatera Utara": "Sumut",
  "North Sumatra": "Sumut",
  "Sumatera Barat": "Sumbar",
  "West Sumatra": "Sumbar",
  "Riau": "Riau",
  "Kepulauan Riau": "Kepri",
  "Jambi": "Jambi",
  "Bengkulu": "Bengkulu",
  "Sumatera Selatan": "Sumsel",
  "South Sumatra": "Sumsel",
  "Lampung": "Lampung",
  "Bangka Belitung": "Babel",
  "Kalimantan Barat": "Kalbar",
  "West Kalimantan": "Kalbar",
  "Kalimantan Tengah": "Kalteng",
  "Central Kalimantan": "Kalteng",
  "Kalimantan Selatan": "Kalsel",
  "South Kalimantan": "Kalsel",
  "Kalimantan Timur": "Kaltim",
  "East Kalimantan": "Kaltim",
  "Kalimantan Utara": "Kaltara",
  "North Kalimantan": "Kaltara",
  "Sulawesi Utara": "Sulut",
  "North Sulawesi": "Sulut",
  "Sulawesi Tengah": "Sulteng",
  "Central Sulawesi": "Sulteng",
  "Sulawesi Selatan": "Sulsel",
  "South Sulawesi": "Sulsel",
  "Sulawesi Tenggara": "Sultra",
  "Southeast Sulawesi": "Sultra",
  "Gorontalo": "Gorontalo",
  "Sulawesi Barat": "Sulbar",
  "West Sulawesi": "Sulbar",
  "Bali": "Bali",
  "Nusa Tenggara Barat": "NTB",
  "West Nusa Tenggara": "NTB",
  "Nusa Tenggara Timur": "NTT",
  "East Nusa Tenggara": "NTT",
  "Maluku": "Maluku",
  "Maluku Utara": "Malut",
  "North Maluku": "Malut",
  "Papua": "Papua",
  "Papua Barat": "Pabar",
  "West Papua": "Pabar",
};

function shortenProvince(p: string) {
  if (!p) return "Indonesia";
  if (PROVINCE_SHORT[p]) return PROVINCE_SHORT[p];
  for (const [k, v] of Object.entries(PROVINCE_SHORT)) {
    if (p.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return p;
}

async function reverseGeocode(lat: number, lon: number): Promise<{ city: string; province: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=id`,
      { headers: { "Accept": "application/json" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const a = data.address ?? {};
    const city = a.city || a.town || a.municipality || a.village || a.county || a.suburb || "";
    const province = a.state || a.region || "";
    return { city, province };
  } catch {
    return null;
  }
}

const Ctx = createContext<GeoState>(DEFAULT);

export function GeoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GeoState>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("univers-geo");
      if (cached) try { return { ...JSON.parse(cached), status: "granted" }; } catch {}
    }
    return DEFAULT;
  });
  const lastUpdate = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) return;
    setState((s) => ({ ...s, status: "loading" }));
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const now = Date.now();
        if (now - lastUpdate.current < 30_000) return;
        lastUpdate.current = now;
        const result = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        if (!result) return;
        const next: GeoState = {
          city: result.city,
          province: result.province,
          provinceShort: shortenProvince(result.province),
          status: "granted",
        };
        setState(next);
        try { localStorage.setItem("univers-geo", JSON.stringify(next)); } catch {}
      },
      (err) => {
        setState((s) => ({
          ...s,
          status: err.code === err.PERMISSION_DENIED ? "denied" : "error",
          province: s.province || "Indonesia",
          provinceShort: s.provinceShort || "Indonesia",
        }));
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 15_000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useGeo() {
  return useContext(Ctx);
}

export function geoLabel(g: GeoState) {
  if (g.status === "loading" && !g.city) return "Mencari lokasi…";
  if (g.city) return `${g.city}, ${g.provinceShort}`;
  return "Indonesia";
}

export function isNearKalsel(g: GeoState) {
  const p = (g.province || "").toLowerCase();
  return p.includes("kalimantan selatan") || p.includes("south kalimantan") || g.provinceShort === "Kalsel";
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Star, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import Shell from "@/components/Shell";
import LevelSelector from "@/components/LevelSelector";
import { fetchUniversities, initials, type University } from "@/lib/db";
import { useLevel } from "@/lib/level";
import { isNearKalsel, useGeo } from "@/lib/geolocation";

type Params = { q?: string; category?: string; region?: string; type?: string; accreditation?: string };
export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: (s: Record<string, unknown>): Params => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    type: typeof s.type === "string" ? s.type : undefined,
    accreditation: typeof s.accreditation === "string" ? s.accreditation : undefined,
  }),
});

const REGIONS_BY_LEVEL: Record<string, string[]> = {
  UNIVERSITY: ["Semua", "Jawa", "Sumatera", "Kalimantan", "Sulawesi", "Bali & NTB", "NTT & Papua", "Maluku"],
  default: ["Semua", "Jawa", "Sumatera", "Kalimantan", "Sulawesi"],
};

const TYPES_BY_LEVEL: Record<string, string[]> = {
  UNIVERSITY: ["Semua", "Negeri (PTN)", "Swasta (PTS)"],
  default: ["Semua", "Negeri", "Swasta", "Swasta Islam", "Swasta Kristen", "Swasta Katolik", "International"],
};

const ACCREDITATIONS = ["Semua", "Unggul", "Baik Sekali", "Baik"];

function SearchPage() {
  const initial = Route.useSearch();
  const { level } = useLevel();
  const geo = useGeo();
  const [q, setQ] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "Semua");
  const [region, setRegion] = useState(initial.region ?? "Semua");
  const [type, setType] = useState(initial.type ?? "Semua");
  const [accreditation, setAccreditation] = useState(initial.accreditation ?? "Semua");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["search", level, q, category, region, type, accreditation],
    queryFn: () => fetchUniversities({ level, q, category, region, type, accreditation }),
  });

  const regions = REGIONS_BY_LEVEL[level] ?? REGIONS_BY_LEVEL.default;
  const types = TYPES_BY_LEVEL[level] ?? TYPES_BY_LEVEL.default;
  const near = isNearKalsel(geo);

  return (
    <Shell>
      <div className="pt-3 flex items-center gap-3 animate-fade-in">
        <Link to="/" className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold flex-1">Jelajahi</h1>
        <button onClick={() => setFiltersOpen((v) => !v)}
                className="press glass rounded-full w-9 h-9 grid place-items-center">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
      <LevelSelector />

      <div className="mt-3 glass-strong rounded-full px-4 py-3 flex items-center gap-3 animate-fade-up">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari sekolah, universitas, atau program..."
               className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
      </div>

      {filtersOpen && (
        <div className="mt-3 glass rounded-2xl p-4 space-y-4 animate-scale-in">
          <FilterRow label="Wilayah" value={region} onChange={setRegion} options={regions} />
          <FilterRow label="Tipe" value={type} onChange={setType} options={types} />
          <FilterRow label="Akreditasi" value={accreditation} onChange={setAccreditation} options={ACCREDITATIONS} />
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">
        {isLoading ? "Memuat..." : `${data.length} hasil`}
      </div>

      <div className="mt-2 space-y-3">
        {data.map((u, i) => (
          <UniCard key={u.id} u={u} delay={i} near={near} />
        ))}
      </div>
    </Shell>
  );
}

function UniCard({ u, delay, near }: { u: University; delay: number; near: boolean }) {
  const isKalsel = u.region === "Kalimantan" && (u.location.includes("Kalimantan Selatan") || u.location.includes("Banjarbaru") || u.location.includes("Banjarmasin"));
  return (
    <Link to="/university/$id" params={{ id: u.id }}
          className="press block glass rounded-2xl overflow-hidden animate-fade-up"
          style={{ animationDelay: `${Math.min(delay * 0.03, 0.3)}s` }}>
      <div className="flex">
        <div className="w-24 h-auto shrink-0 grid place-items-center text-white font-bold text-lg"
             style={{ background: u.is_featured ? "linear-gradient(135deg,#F5B97A,#F4845F)" : "var(--grad-primary)" }}>
          {u.image_url ? (
            <img src={u.image_url} alt={u.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <span>{initials(u.name)}</span>
          )}
        </div>
        <div className="p-3 flex-1 min-w-0">
          <div className="flex items-start gap-1.5">
            <p className="text-sm font-semibold line-clamp-2 leading-tight flex-1">{u.name}</p>
            {u.is_featured && (
              <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white inline-flex items-center gap-0.5"
                    style={{ background: "linear-gradient(135deg,#F5B97A,#F4845F)" }}>
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">{u.location}</p>
          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px]">
            <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />{u.rating}</span>
            {u.type && <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{u.type}</span>}
            {u.accreditation && <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">{u.accreditation}</span>}
            {near && isKalsel && (
              <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">Dekat Anda</span>
            )}
          </div>
          {u.programs && u.programs.length > 0 && (
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
              {u.programs.slice(0, 3).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function FilterRow({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <div className="text-xs font-medium mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o === value;
          return (
            <button key={o} onClick={() => onChange(o)}
                    className={`press text-[11px] px-3 py-1.5 rounded-full transition ${active ? "gradient-primary text-white shadow" : "glass text-foreground"}`}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

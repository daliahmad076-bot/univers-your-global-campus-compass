import { Bell, ChevronDown, Loader2, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { geoLabel, useGeo } from "@/lib/geolocation";

export default function TopBar() {
  const { theme, toggle } = useTheme();
  const geo = useGeo();
  const label = geoLabel(geo);
  return (
    <div className="flex items-center justify-between pt-3 pb-2 animate-fade-in">
      <button className="press flex items-center gap-2 glass rounded-full pl-3 pr-2 py-1.5" title={geo.status === "denied" ? "Akses lokasi ditolak" : label}>
        <span className="w-2 h-2 rounded-full" style={{ background: "#0061FF", boxShadow: "0 0 0 3px rgba(0,97,255,0.25)" }} />
        <span className="text-xs font-medium max-w-[140px] truncate">{label}</span>
        {geo.status === "loading" && !geo.city ? (
          <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
      <div className="flex items-center gap-2">
        <button onClick={toggle} className="press glass rounded-full w-9 h-9 grid place-items-center" aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="press glass rounded-full w-9 h-9 grid place-items-center relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <div className="press w-9 h-9 rounded-full gradient-primary text-white grid place-items-center font-semibold text-xs shadow-lg">
          IS
        </div>
      </div>
    </div>
  );
}

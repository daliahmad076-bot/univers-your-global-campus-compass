import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Star, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Shell from "@/components/Shell";
import LevelSelector from "@/components/LevelSelector";
import { fetchUniversities } from "@/lib/db";
import { useLevel } from "@/lib/level";

type Params = { q?: string; category?: string; country?: string };
export const Route = createFileRoute("/search")({
  component: SearchPage,
  validateSearch: (s: Record<string, unknown>): Params => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    country: typeof s.country === "string" ? s.country : undefined,
  }),
});

const COUNTRIES = ["All", "USA", "UK", "Singapore", "Switzerland", "Japan", "Indonesia", "Australia"];
const CATEGORIES = ["All", "Computer Science", "Business", "Engineering", "Art & Design", "Medical", "Law", "Science", "Education"];

function SearchPage() {
  const initial = Route.useSearch();
  const [q, setQ] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "All");
  const [country, setCountry] = useState(initial.country ?? "All");
  const [maxTuition, setMaxTuition] = useState<number>(70000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["search", q, category, country, maxTuition],
    queryFn: () => fetchUniversities({ q, category, country, maxTuition }),
  });

  return (
    <Shell>
      <div className="pt-3 flex items-center gap-3 animate-fade-in">
        <Link to="/" className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold flex-1">Explore</h1>
        <button onClick={() => setFiltersOpen((v) => !v)}
                className="press glass rounded-full w-9 h-9 grid place-items-center">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
      <LevelSelector />

      <div className="mt-3 glass-strong rounded-full px-4 py-3 flex items-center gap-3 animate-fade-up">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search universities..."
               className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
      </div>

      {filtersOpen && (
        <div className="mt-3 glass rounded-2xl p-4 space-y-4 animate-scale-in">
          <FilterRow label="Country" value={country} onChange={setCountry} options={COUNTRIES} />
          <FilterRow label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
          <div>
            <div className="flex items-center justify-between text-xs font-medium mb-2">
              <span>Max Tuition</span>
              <span className="text-primary">${maxTuition.toLocaleString()}/yr</span>
            </div>
            <input type="range" min={1500} max={70000} step={500} value={maxTuition}
                   onChange={(e) => setMaxTuition(Number(e.target.value))}
                   className="w-full accent-[color:var(--primary)]" />
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground">{isLoading ? "Loading..." : `${data.length} result(s)`}</div>

      <div className="mt-2 space-y-3">
        {data.map((u, i) => (
          <Link key={u.id} to="/university/$id" params={{ id: u.id }}
                className="press block glass rounded-2xl overflow-hidden animate-fade-up"
                style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }}>
            <div className="flex">
              <div className="w-28 h-28 shrink-0 bg-muted">
                {u.image_url && <img src={u.image_url} alt={u.name} className="w-full h-full object-cover" loading="lazy" />}
              </div>
              <div className="p-3 flex-1 min-w-0">
                <p className="text-sm font-semibold line-clamp-2 leading-tight">{u.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{u.location} · {u.country}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />{u.rating}</span>
                  {u.global_ranking && <span className="text-muted-foreground">#{u.global_ranking} global</span>}
                </div>
                <p className="text-[11px] mt-1.5 font-medium text-gradient-primary">
                  ${u.tuition_min?.toLocaleString()}–${u.tuition_max?.toLocaleString()}/yr
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Shell>
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

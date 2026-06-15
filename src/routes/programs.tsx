import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search, Star } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";
import Shell from "@/components/Shell";
import { PROGRAMS } from "@/lib/programs";

export const Route = createFileRoute("/programs")({ component: ProgramsPage });

const FILTERS = ["Semua", "S1", "S2", "S3", "Diploma"] as const;

function ProgramsPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]>("Semua");

  const items = PROGRAMS.filter((p) => {
    if (f !== "Semua" && p.level !== f) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <Shell>
      <div className="pt-3 flex items-center gap-3 animate-fade-in">
        <Link to="/" className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold flex-1">Program Studi</h1>
      </div>

      <div className="mt-3 glass-strong rounded-full px-4 py-3 flex items-center gap-3 animate-fade-up">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari program..."
               className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
      </div>

      <div className="mt-3 flex gap-1.5 flex-wrap">
        {FILTERS.map((o) => {
          const active = o === f;
          return (
            <button key={o} onClick={() => setF(o)}
                    className={`press text-[11px] px-3 py-1.5 rounded-full transition ${active ? "gradient-primary text-white shadow" : "glass text-foreground"}`}>
              {o}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-muted-foreground">{items.length} program</div>

      <div className="mt-2 space-y-3">
        {items.map((p, i) => {
          const Icon = (Icons as any)[p.icon] ?? Icons.BookOpen;
          return (
            <Link key={p.id} to="/program/$id" params={{ id: p.id }}
                  className="press block glass rounded-2xl p-4 animate-fade-up"
                  style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
                     style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{p.level} · {p.duration}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />{p.rating}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Shell>
  );
}

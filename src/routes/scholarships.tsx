import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search, Award, CalendarDays, Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { getSaved, toggleSaved } from "@/lib/saved";
import { toast } from "sonner";

export const Route = createFileRoute("/scholarships")({ component: ScholarshipsPage });

const FILTERS = ["Semua", "Merit", "Kebutuhan", "Pemerintah", "Internasional"] as const;

function ScholarshipsPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]>("Semua");
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    setSaved(getSaved("scholarship"));
    const h = () => setSaved(getSaved("scholarship"));
    window.addEventListener("univers-saved-change", h);
    return () => window.removeEventListener("univers-saved-change", h);
  }, []);

  const items = SCHOLARSHIPS.filter((s) => {
    if (f !== "Semua" && s.category !== f) return false;
    if (q && !`${s.name} ${s.provider} ${s.coverage}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <Shell>
      <div className="pt-3 flex items-center gap-3 animate-fade-in">
        <Link to="/" className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-lg font-bold flex-1">Beasiswa</h1>
      </div>

      <div className="mt-3 glass-strong rounded-full px-4 py-3 flex items-center gap-3 animate-fade-up">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari beasiswa..."
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

      <div className="mt-4 text-xs text-muted-foreground">{items.length} beasiswa</div>

      <div className="mt-2 space-y-3">
        {items.map((s, i) => {
          const isSaved = saved.includes(s.id);
          return (
            <div key={s.id} className="glass rounded-2xl p-4 animate-fade-up"
                 style={{ animationDelay: `${Math.min(i * 0.04, 0.3)}s` }}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl grid place-items-center text-white shrink-0 shadow"
                     style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}>
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.provider}</p>
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px]">
                    <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{s.category}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">{s.coverage}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" /> Daftar sebelum <span className="font-medium text-foreground">{s.deadline}</span>
                  </div>
                </div>
                <button onClick={() => { toggleSaved(s.id, "scholarship"); toast.success(isSaved ? "Dihapus dari tersimpan" : "Disimpan"); }}
                        className="press w-8 h-8 rounded-full glass grid place-items-center shrink-0">
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
              <button onClick={() => toast.success("Aplikasi dibuka (demo)")}
                      className="press mt-3 w-full rounded-full gradient-primary text-white text-xs font-semibold py-2">
                Daftar Sekarang
              </button>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

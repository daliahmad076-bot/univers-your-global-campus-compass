import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { fetchUniversities, initials } from "@/lib/db";
import { getSaved } from "@/lib/saved";
import { PROGRAMS } from "@/lib/programs";
import { SCHOLARSHIPS } from "@/lib/scholarships";

export const Route = createFileRoute("/bookmarks")({ component: BookmarksPage });

const TABS = ["Sekolah", "Program", "Beasiswa"] as const;

function BookmarksPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Sekolah");
  const [schoolIds, setSchoolIds] = useState<string[]>([]);
  const [programIds, setProgramIds] = useState<string[]>([]);
  const [scholarshipIds, setScholarshipIds] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => {
      setSchoolIds(getSaved("school"));
      setProgramIds(getSaved("program"));
      setScholarshipIds(getSaved("scholarship"));
    };
    refresh();
    window.addEventListener("univers-saved-change", refresh);
    return () => window.removeEventListener("univers-saved-change", refresh);
  }, []);

  const { data: allUnis = [] } = useQuery({ queryKey: ["unis-all"], queryFn: () => fetchUniversities({}) });
  const savedSchools = allUnis.filter((u) => schoolIds.includes(u.id));
  const savedPrograms = PROGRAMS.filter((p) => programIds.includes(p.id));
  const savedScholarships = SCHOLARSHIPS.filter((s) => scholarshipIds.includes(s.id));

  const list =
    tab === "Sekolah" ? savedSchools.length : tab === "Program" ? savedPrograms.length : savedScholarships.length;

  return (
    <Shell>
      <div className="pt-4 animate-fade-in">
        <h1 className="text-2xl font-extrabold tracking-tight">Tersimpan</h1>
      </div>

      <div className="mt-4 flex gap-1.5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
                  className={`press flex-1 text-xs px-3 py-2 rounded-full transition ${tab === t ? "gradient-primary text-white shadow" : "glass text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {list === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-4 space-y-3 animate-fade-up">
          {tab === "Sekolah" && savedSchools.map((u) => (
            <Link key={u.id} to="/university/$id" params={{ id: u.id }} className="press block glass rounded-2xl overflow-hidden">
              <div className="flex">
                <div className="w-24 h-auto shrink-0 grid place-items-center text-white font-bold text-lg"
                     style={{ background: u.is_featured ? "linear-gradient(135deg,#F5B97A,#F4845F)" : "var(--grad-primary)" }}>
                  {u.image_url ? <img src={u.image_url} alt={u.name} className="w-full h-full object-cover" /> : <span>{initials(u.name)}</span>}
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 leading-tight">{u.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{u.location}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px]">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {u.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {tab === "Program" && savedPrograms.map((p) => (
            <Link key={p.id} to="/program/$id" params={{ id: p.id }} className="press block glass rounded-2xl p-4">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{p.level} · {p.duration}</p>
            </Link>
          ))}
          {tab === "Beasiswa" && savedScholarships.map((s) => (
            <div key={s.id} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl grid place-items-center text-white shrink-0"
                   style={{ background: s.color }}>
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{s.name}</p>
                <p className="text-[11px] text-muted-foreground">{s.coverage}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 flex flex-col items-center text-center animate-fade-up">
      <div className="w-20 h-20 rounded-3xl glass grid place-items-center mb-4">
        <Bookmark className="w-9 h-9 text-primary" />
      </div>
      <p className="text-base font-bold">Belum ada yang disimpan</p>
      <p className="mt-1 text-xs text-muted-foreground max-w-xs">Jelajahi dan simpan sekolah, program, dan beasiswa favoritmu.</p>
      <Link to="/search" className="press mt-5 rounded-full gradient-primary text-white text-xs font-semibold px-5 py-2.5 shadow-lg">
        Jelajahi Sekarang
      </Link>
    </div>
  );
}

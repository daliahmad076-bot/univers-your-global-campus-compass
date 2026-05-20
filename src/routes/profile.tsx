import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Award, BookOpen, ChevronRight, GraduationCap, Heart, Settings, Target } from "lucide-react";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import TopBar from "@/components/TopBar";
import LevelSelector from "@/components/LevelSelector";
import { fetchApplications, fetchUniversities } from "@/lib/db";
import { getSaved } from "@/lib/saved";
import { useLevel, levelLabel, LEVELS, type EducationLevel } from "@/lib/level";

export const Route = createFileRoute("/profile")({ component: Profile });

const TARGET_BY_LEVEL: Record<EducationLevel, string> = {
  TK: "Tunas Bangsa Kindergarten",
  SD: "Global Mandiri Elementary",
  SMP: "SMP Labschool Kebayoran",
  SMA: "SMA Negeri 8 Jakarta",
  UNIVERSITY: "National University of Singapore",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "under review": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  accepted: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

function Profile() {
  const { level } = useLevel();
  const { data: apps = [] } = useQuery({ queryKey: ["apps"], queryFn: fetchApplications });
  const { data: unis = [] } = useQuery({ queryKey: ["unis-all"], queryFn: () => fetchUniversities() });
  const [savedIds, setSavedIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSavedIds(getSaved());
    sync(); window.addEventListener("univers-saved-change", sync);
    return () => window.removeEventListener("univers-saved-change", sync);
  }, []);
  const saved = unis.filter((u) => savedIds.includes(u.id));
  const currentIdx = LEVELS.findIndex((l) => l.id === level);

  return (
    <Shell>
      <TopBar />
      <LevelSelector />

      <div className="mt-5 glass-strong rounded-3xl p-5 flex items-center gap-4 animate-fade-up">
        <div className="w-16 h-16 rounded-full gradient-primary grid place-items-center text-white text-xl font-bold shadow-xl">IS</div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold leading-tight">Ilham Syahwana</h1>
          <p className="text-xs text-muted-foreground">Jakarta, Indonesia</p>
          <div className="mt-1.5 inline-flex items-center gap-1 glass rounded-full px-2 py-0.5">
            <GraduationCap className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-semibold text-gradient-primary">{levelLabel(level)}</span>
          </div>
        </div>
        <button className="press glass w-9 h-9 rounded-full grid place-items-center"><Settings className="w-4 h-4" /></button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 animate-fade-up">
        <StatCard icon={BookOpen} label="Applications" value={apps.length} />
        <StatCard icon={Heart} label="Saved" value={saved.length} />
        <StatCard icon={Award} label="Achievements" value={3} />
      </div>

      <Section title="Target School">
        <div className="glass-strong rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary grid place-items-center shrink-0">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{levelLabel(level)} goal</div>
            <div className="text-sm font-semibold truncate">{TARGET_BY_LEVEL[level]}</div>
          </div>
        </div>
      </Section>

      <Section title="Academic Journey">
        <div className="glass rounded-2xl p-4">
          <div className="relative">
            {LEVELS.map((l, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              return (
                <div key={l.id} className="flex items-center gap-3 py-1.5">
                  <div className={`w-7 h-7 rounded-full grid place-items-center shrink-0 text-[10px] font-bold transition ${
                    active ? "gradient-primary text-white shadow-lg" :
                    done ? "bg-primary/15 text-primary" : "glass text-muted-foreground"
                  }`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`text-xs font-semibold ${active ? "text-gradient-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>{l.label}</div>
                  </div>
                  {active && <span className="text-[10px] text-primary font-medium">Current</span>}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section title="My Applications">
        {apps.length === 0 ? (
          <Empty text="No applications yet" />
        ) : (
          <div className="space-y-2">
            {apps.map((a: any) => (
              <div key={a.id} className="glass rounded-2xl p-3 flex items-center gap-3 animate-fade-up">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{a.university_name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.program}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${STATUS_COLORS[a.status] ?? STATUS_COLORS.pending}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Saved Universities">
        {saved.length === 0 ? (
          <Empty text="Save schools you love to see them here" />
        ) : (
          <div className="space-y-2">
            {saved.map((u) => (
              <Link key={u.id} to="/university/$id" params={{ id: u.id }} className="press glass rounded-2xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                  {u.image_url && <img src={u.image_url} alt={u.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{u.name}</div>
                  <div className="text-[11px] text-muted-foreground">{u.location}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section title="Education">
        <div className="glass rounded-2xl p-4">
          <div className="text-sm font-semibold">SMA Negeri 1 Jakarta</div>
          <div className="text-[11px] text-muted-foreground">Science Major · 2020 – 2023</div>
          <div className="mt-2 text-[11px] text-gradient-primary font-medium">GPA: 3.85 / 4.0</div>
        </div>
      </Section>

      <Section title="Achievements">
        {[
          { t: "National Math Olympiad", s: "Silver Medal · 2022" },
          { t: "TOEFL iBT", s: "Score: 105 · 2023" },
          { t: "School Council President", s: "2022 – 2023" },
        ].map((a) => (
          <div key={a.t} className="glass rounded-2xl p-3 mt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary grid place-items-center"><Award className="w-4 h-4 text-white" /></div>
            <div>
              <div className="text-sm font-semibold">{a.t}</div>
              <div className="text-[11px] text-muted-foreground">{a.s}</div>
            </div>
          </div>
        ))}
      </Section>
    </Shell>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <Icon className="w-4 h-4 mx-auto text-primary" />
      <div className="text-lg font-bold mt-1">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 animate-fade-up">
      <h2 className="text-sm font-bold mb-2">{title}</h2>
      {children}
    </section>
  );
}
function Empty({ text }: { text: string }) {
  return <div className="glass rounded-2xl p-6 text-center text-xs text-muted-foreground">{text}</div>;
}

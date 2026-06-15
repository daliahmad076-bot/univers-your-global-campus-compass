import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Star, Check, Briefcase, GraduationCap, CalendarDays, DollarSign } from "lucide-react";
import * as Icons from "lucide-react";
import { useState } from "react";
import Shell from "@/components/Shell";
import { findProgram } from "@/lib/programs";
import { toast } from "sonner";

export const Route = createFileRoute("/program/$id")({ component: ProgramDetail });

const TABS = ["Overview", "Kurikulum", "Karier", "Syarat Masuk"] as const;

function ProgramDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const p = findProgram(id);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  if (!p) {
    return (
      <Shell>
        <div className="pt-10 text-center">
          <p className="text-sm">Program tidak ditemukan.</p>
          <Link to="/programs" className="text-primary text-xs font-medium mt-2 inline-block">Kembali</Link>
        </div>
      </Shell>
    );
  }
  const Icon = (Icons as any)[p.icon] ?? Icons.BookOpen;

  return (
    <Shell>
      <div className="pt-3 flex items-center gap-3 animate-fade-in">
        <button onClick={() => nav({ to: "/programs" })} className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold flex-1 truncate">{p.name}</h1>
      </div>

      <div className="mt-4 rounded-3xl p-5 text-white relative overflow-hidden animate-fade-up"
           style={{ background: "var(--grad-primary)", boxShadow: "0 20px 50px -10px rgba(0,97,255,0.5)" }}>
        <div className="absolute inset-0 opacity-30"
             style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%)" }} />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl grid place-items-center glass"
               style={{ background: "rgba(255,255,255,0.2)" }}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold leading-tight">{p.name}</p>
            <p className="text-xs text-white/85 mt-0.5">{p.level} · {p.duration}</p>
            <div className="mt-1 inline-flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" /> {p.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-1.5 overflow-x-auto hide-scrollbar">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
                  className={`press shrink-0 text-[11px] px-3 py-2 rounded-full transition ${tab === t ? "gradient-primary text-white shadow" : "glass text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 animate-fade-up">
        {tab === "Overview" && (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold mb-1">Tentang Program</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold mb-2">Highlights</p>
              <ul className="space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {tab === "Kurikulum" && (
          <div className="space-y-3">
            {p.curriculum.map((s) => (
              <div key={s.semester} className="glass rounded-2xl p-4">
                <p className="text-xs font-semibold text-primary mb-2">{s.semester}</p>
                <ul className="space-y-1">
                  {s.courses.map((c) => (
                    <li key={c} className="text-xs text-muted-foreground">• {c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {tab === "Karier" && (
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold">Prospek Kerja</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.career.jobs.map((j) => (
                  <span key={j} className="text-[11px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">{j}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <p className="text-xs font-semibold">Rata-rata Gaji</p>
              </div>
              <p className="text-sm font-bold">{p.career.salary}</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xs font-semibold mb-2">Perusahaan Top</p>
              <div className="flex flex-wrap gap-1.5">
                {p.career.companies.map((c) => (
                  <span key={c} className="text-[11px] px-2 py-1 rounded-full glass">{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Syarat Masuk" && (
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <p className="text-xs font-semibold">Persyaratan</p>
              </div>
              <ul className="space-y-2">
                {p.admission.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-[11px] text-muted-foreground">Deadline</p>
                <p className="text-sm font-bold">{p.admission.deadline}</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <div className="flex-1">
                <p className="text-[11px] text-muted-foreground">Biaya Kuliah</p>
                <p className="text-sm font-bold">{p.admission.tuition}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => toast.success("Aplikasi dibuka (demo)")}
              className="press mt-6 w-full rounded-full gradient-primary text-white font-semibold py-3.5 text-sm shadow-xl">
        Daftar Sekarang
      </button>
    </Shell>
  );
}

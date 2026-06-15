import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Search, Star, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import Shell from "@/components/Shell";
import TopBar from "@/components/TopBar";
import LevelSelector from "@/components/LevelSelector";
import { fetchCategories, fetchUniversities, initials } from "@/lib/db";
import { useLevel, levelLabel } from "@/lib/level";
import { isNearKalsel, useGeo } from "@/lib/geolocation";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const HERO_BY_LEVEL: Record<string, { tag: string; title: string; sub: string }> = {
  TK: { tag: "AI-powered", title: "Start Their\nJourney!", sub: "Discover premium kindergartens & parenting programs." },
  SD: { tag: "AI-powered", title: "Build Strong\nFoundations!", sub: "Find elementary schools that nurture curious minds." },
  SMP: { tag: "AI-powered", title: "Grow Their\nTalents!", sub: "Top junior high schools with STEM, sports & language." },
  SMA: { tag: "AI-powered", title: "Prepare For\nThe Future!", sub: "Senior high & vocational schools with scholarship pipelines." },
  UNIVERSITY: { tag: "AI-powered", title: "Discover Your\nFuture!", sub: "Find the right university, anywhere in the world." },
};

function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const { level } = useLevel();
  const geo = useGeo();
  const near = isNearKalsel(geo);
  const { data: categories = [] } = useQuery({ queryKey: ["cats", level], queryFn: () => fetchCategories(level) });
  const { data: universities = [] } = useQuery({ queryKey: ["unis-popular", level], queryFn: () => fetchUniversities({ level }) });
  const popular = universities.filter((u) => u.is_popular || u.is_featured).slice(0, 10);
  const hero = HERO_BY_LEVEL[level];

  function go() {
    nav({ to: "/search", search: { q } as any });
  }

  return (
    <Shell>
      <TopBar />
      <LevelSelector />

      {/* Hero */}
      <div className="mt-5 animate-fade-up rounded-3xl p-5 text-white relative overflow-hidden shadow-xl"
           style={{ background: "var(--grad-primary)", boxShadow: "0 20px 50px -10px rgba(0,97,255,0.5)" }}>
        <div className="absolute inset-0 opacity-30"
             style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[10px] font-medium"
               style={{ background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.4)" }}>
            <Sparkles className="w-3 h-3" /> {hero.tag} · {levelLabel(level)}
          </div>
          <h2 className="mt-2 text-2xl font-bold leading-tight whitespace-pre-line">{hero.title}</h2>
          <p className="mt-1 text-xs text-white/85 max-w-[70%]">{hero.sub}</p>
          <button onClick={() => nav({ to: "/search" })}
            className="press mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.5)", backdropFilter: "blur(10px)" }}>
            Explore <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute right-2 bottom-2 w-24 h-24 opacity-90 animate-float">
          <div className="w-full h-full rounded-2xl glass grid place-items-center" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Icons.GraduationCap className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
        <div className="glass-strong rounded-full px-4 py-3 flex items-center gap-3"
             style={{ boxShadow: "0 12px 30px rgba(0,97,255,0.12)" }}>
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
            placeholder="Search schools, universities, or programs..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button onClick={go} className="press rounded-full gradient-primary text-white text-xs font-semibold px-3 py-1.5">Go</button>
        </div>
      </div>

      {/* Shortcuts */}
      <section className="mt-6 animate-fade-up" style={{ animationDelay: "0.08s" }}>

        <div className="grid grid-cols-3 gap-3">
          <Link to="/programs" className="press glass rounded-2xl p-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
              <Icons.BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-medium">Program</span>
          </Link>
          <Link to="/scholarships" className="press glass rounded-2xl p-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "color-mix(in oklab, #F59E0B 18%, transparent)" }}>
              <Icons.Award className="w-5 h-5" style={{ color: "#F59E0B" }} />
            </div>
            <span className="text-[11px] font-medium">Beasiswa</span>
          </Link>
          <Link to="/chat" className="press glass rounded-2xl p-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "color-mix(in oklab, #8B5CF6 18%, transparent)" }}>
              <Icons.Sparkles className="w-5 h-5" style={{ color: "#8B5CF6" }} />
            </div>
            <span className="text-[11px] font-medium">AI Advisor</span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-7 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <Header title="Field of Study" to="/programs" />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {categories.map((c) => {
            const Icon = (Icons as any)[c.icon] ?? Icons.BookOpen;
            return (
              <Link key={c.id} to="/programs"
                    className="press glass rounded-2xl p-3 flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl grid place-items-center"
                     style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <span className="text-xs font-medium flex-1 truncate">{c.name}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="mt-7 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <Header title="Sekolah Populer" to="/search" />
        <div className="mt-3 -mx-4 px-4 flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
          {popular.map((u) => {
            const isKalsel = u.region === "Kalimantan" && (u.location.includes("Kalimantan Selatan") || u.location.includes("Banjarbaru") || u.location.includes("Banjarmasin"));
            return (
              <Link key={u.id} to="/university/$id" params={{ id: u.id }}
                    className="press snap-start shrink-0 w-60 glass rounded-2xl overflow-hidden">
                <div className="h-28 w-full relative grid place-items-center text-white"
                     style={{ background: u.is_featured ? "linear-gradient(135deg,#F5B97A,#F4845F)" : "var(--grad-primary)" }}>
                  {u.image_url ? (
                    <img src={u.image_url} alt={u.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-3xl font-extrabold tracking-tight">{initials(u.name)}</span>
                  )}
                  <div className="absolute top-2 right-2 glass rounded-full px-2 py-0.5 text-[10px] flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" /> {u.rating}
                  </div>
                  {u.is_featured && (
                    <div className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold text-white inline-flex items-center gap-0.5 bg-black/30 backdrop-blur">
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold line-clamp-2 leading-tight">{u.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{u.location}</p>
                  <div className="mt-2 flex items-center gap-1 flex-wrap text-[9px]">
                    {u.type && <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{u.type}</span>}
                    {u.accreditation && <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">{u.accreditation}</span>}
                    {near && isKalsel && (
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">Dekat Anda</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Shell>
  );
}

function Header({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold tracking-tight">{title}</h3>
      <Link to={to} className="text-xs font-medium text-primary inline-flex items-center gap-0.5">
        View all <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

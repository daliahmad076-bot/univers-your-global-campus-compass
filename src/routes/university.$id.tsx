import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, MapPin, Award, Heart, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { fetchUniversity } from "@/lib/db";
import { getSaved, toggleSaved } from "@/lib/saved";

export const Route = createFileRoute("/university/$id")({ component: UniDetail });

function UniDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { data: u } = useQuery({ queryKey: ["uni", id], queryFn: () => fetchUniversity(id) });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => setSaved(getSaved().includes(id));
    sync(); window.addEventListener("univers-saved-change", sync);
    return () => window.removeEventListener("univers-saved-change", sync);
  }, [id]);

  if (!u) return <Shell><div className="pt-10 text-center text-sm text-muted-foreground">Loading…</div></Shell>;

  return (
    <Shell hideNav>
      <div className="-mx-4">
        <div className="relative h-64 overflow-hidden">
          {u.image_url && <img src={u.image_url} alt={u.name} className="w-full h-full object-cover" />}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <button onClick={() => nav({ to: "/search" })} className="press glass w-10 h-10 rounded-full grid place-items-center text-white"
                    style={{ background: "rgba(0,0,0,0.3)" }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => { toggleSaved(id); }} className="press glass w-10 h-10 rounded-full grid place-items-center text-white"
                    style={{ background: "rgba(0,0,0,0.3)" }}>
              <Heart className={`w-5 h-5 ${saved ? "fill-red-500 stroke-red-500" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-10 relative glass-strong rounded-3xl p-5 animate-fade-up">
        <h1 className="text-xl font-bold leading-tight">{u.name}</h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{u.location}, {u.country}</span>
          <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />{u.rating} ({u.reviews_count})</span>
          {u.global_ranking && <span className="inline-flex items-center gap-1"><Award className="w-3.5 h-3.5" />#{u.global_ranking}</span>}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{u.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label="Akreditasi" value={u.accreditation ?? "—"} />
          <Stat label="Global Rank" value={u.global_ranking ? `#${u.global_ranking}` : "—"} />
        </div>

        <h3 className="mt-6 text-sm font-bold">Available Programs</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(u.programs ?? []).map((p) => (
            <span key={p} className="text-[11px] glass px-3 py-1.5 rounded-full">{p}</span>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-bold">Admission Requirements</h3>
        <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
          {["High school diploma or equivalent","Official transcripts","English proficiency (TOEFL/IELTS)","Motivation letter","Two recommendation letters"].map((r) => (
            <li key={r} className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" />{r}</li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
        <Link to="/apply/$id" params={{ id: u.id }} className="press block w-full text-center rounded-full gradient-primary text-white py-4 font-semibold shadow-2xl"
              style={{ boxShadow: "0 20px 50px -10px rgba(0,97,255,0.6)" }}>
          Apply Now
        </Link>
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-base font-bold text-gradient-primary mt-0.5">{value}</div>
    </div>
  );
}

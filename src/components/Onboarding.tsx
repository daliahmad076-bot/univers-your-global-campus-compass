import { useState } from "react";
import { GraduationCap, Sparkles, Trophy, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: GraduationCap,
    title: "Discover Top Schools & Programs",
    desc: "Temukan universitas, sekolah, dan program terbaik yang sesuai passion dan tujuanmu.",
    cta: "Lanjut",
  },
  {
    icon: Sparkles,
    title: "Rekomendasi Berbasis AI",
    desc: "Dapatkan saran sekolah dan program yang dipersonalisasi berdasarkan minat dan pencapaianmu.",
    cta: "Lanjut",
  },
  {
    icon: Trophy,
    title: "Persiapkan. Daftar. Raih.",
    desc: "Rencanakan perjalanan pendidikanmu, lacak aplikasi, dan raih impianmu bersama UNIVERS.",
    cta: "Mulai Sekarang",
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const s = slides[i];
  const Icon = s.icon;
  const next = () => (i < slides.length - 1 ? setI(i + 1) : onDone());

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-between px-6 py-10 text-white"
      style={{ background: "linear-gradient(135deg, #0061FF 0%, #5B5BFF 50%, #8B5CF6 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #60EFFF 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-32 w-[420px] h-[420px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)", animationDelay: "2s" }} />
      </div>

      <div className="relative w-full flex items-center justify-between text-xs">
        <span className="font-bold tracking-[0.25em]">UNIVERS</span>
        <button onClick={onDone} className="press text-white/80 text-xs">Lewati</button>
      </div>

      <div key={i} className="relative flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
        <div className="w-40 h-40 rounded-3xl glass grid place-items-center mb-8 animate-float"
             style={{ background: "rgba(255,255,255,0.15)" }}>
          <Icon className="w-20 h-20 text-white" strokeWidth={1.6} />
        </div>
        <h2 className="text-2xl font-extrabold leading-tight max-w-sm">{s.title}</h2>
        <p className="mt-3 text-sm text-white/85 max-w-xs leading-relaxed">{s.desc}</p>
      </div>

      <div className="relative w-full flex flex-col items-center gap-5">
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <span key={idx}
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: idx === i ? 24 : 8, background: idx === i ? "#fff" : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
        <button onClick={next}
                className="press w-full max-w-sm inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary font-semibold py-3.5 text-sm shadow-xl">
          {s.cta} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

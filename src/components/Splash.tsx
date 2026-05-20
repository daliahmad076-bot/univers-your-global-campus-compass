import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export default function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1700);
    const t2 = setTimeout(onDone, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ background: "var(--grad-app)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-50 animate-blob"
             style={{ background: "radial-gradient(circle, #60EFFF 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full opacity-50 animate-blob"
             style={{ background: "radial-gradient(circle, #0061FF 0%, transparent 70%)", animationDelay: "2s" }} />
      </div>

      <div className="relative flex flex-col items-center gap-6 animate-scale-in">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl blur-2xl opacity-70 gradient-primary animate-float" />
          <div className="relative w-28 h-28 rounded-3xl bg-white flex items-center justify-center shadow-2xl overflow-hidden"
               style={{ transform: "perspective(600px) rotateX(15deg)" }}>
            <img src={logo} alt="Univers logo" className="w-20 h-20 object-contain" />
          </div>
        </div>
        <div className="text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl font-bold tracking-tight text-gradient-primary">Univers</h1>
          <p className="mt-2 text-sm text-muted-foreground">Discover your future</p>
        </div>
        <div className="mt-4 flex gap-1.5">
          {[0,1,2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full gradient-primary animate-float"
                  style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

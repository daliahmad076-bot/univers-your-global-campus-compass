import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export default function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 3000);
    const t2 = setTimeout(onDone, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{
        background:
          "linear-gradient(135deg, #0061FF 0%, #5B5BFF 45%, #8B5CF6 100%)",
      }}
    >
      {/* ambient floating gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-50 animate-blob"
          style={{ background: "radial-gradient(circle, #60EFFF 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full opacity-50 animate-blob"
          style={{
            background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo with staggered spatial reveal */}
        <div className="relative w-32 h-32">
          {/* Golden sun rays — expand outward after the base */}
          <div
            className="absolute inset-0 rounded-full opacity-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,196,107,0.85) 0%, rgba(255,170,80,0.35) 40%, transparent 70%)",
              filter: "blur(8px)",
              animation:
                "splash-rays 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards",
            }}
          />
          {/* Soft outer glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-0"
            style={{
              background: "linear-gradient(135deg,#60EFFF,#A78BFA)",
              animation: "splash-glow 1s ease-out 0.9s forwards",
            }}
          />
          {/* Blue book base — slides up first */}
          <div
            className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center shadow-2xl overflow-hidden opacity-0"
            style={{
              animation:
                "splash-base 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s forwards",
              transform: "perspective(700px) rotateX(12deg) translateY(28px)",
            }}
          >
            <img src={logo} alt="Univers" className="w-24 h-24 object-contain" />
          </div>
        </div>

        {/* Wordmark */}
        <div
          className="text-center opacity-0"
          style={{ animation: "splash-text 0.7s ease-out 1.2s forwards" }}
        >
          <h1 className="text-5xl font-extrabold tracking-[0.18em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
            UNIVERS
          </h1>
          <p className="mt-3 text-sm text-white/85 tracking-wide">
            Discover Your Future
          </p>
        </div>

        {/* Loading dots */}
        <div
          className="mt-6 flex gap-1.5 opacity-0"
          style={{ animation: "splash-text 0.5s ease-out 1.6s forwards" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              style={{
                animation: "splash-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes splash-base {
          0%   { opacity: 0; transform: perspective(700px) rotateX(12deg) translateY(40px) scale(0.92); }
          100% { opacity: 1; transform: perspective(700px) rotateX(0deg) translateY(0) scale(1); }
        }
        @keyframes splash-rays {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; }
          100% { opacity: 0.9; transform: scale(1.6); }
        }
        @keyframes splash-glow {
          0%   { opacity: 0; transform: scale(0.8); }
          100% { opacity: 0.55; transform: scale(1.1); }
        }
        @keyframes splash-text {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-dot {
          0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
          40%           { opacity: 1;    transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

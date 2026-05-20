import { LEVELS, useLevel } from "@/lib/level";

export default function LevelSelector() {
  const { level, setLevel } = useLevel();
  return (
    <div className="mt-4 -mx-4 px-4 overflow-x-auto hide-scrollbar animate-fade-up">
      <div className="glass-strong rounded-full p-1 inline-flex items-center gap-1 min-w-full">
        {LEVELS.map((l) => {
          const active = l.id === level;
          return (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`press shrink-0 text-[11px] font-semibold px-3.5 py-2 rounded-full transition-all ${
                active ? "gradient-primary text-white shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
              style={active ? { boxShadow: "0 8px 22px -8px rgba(0,97,255,0.55)" } : undefined}
            >
              {l.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

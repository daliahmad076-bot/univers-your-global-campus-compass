import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type EducationLevel = "TK" | "SD" | "SMP" | "SMA" | "UNIVERSITY";

export const LEVELS: { id: EducationLevel; short: string; label: string }[] = [
  { id: "TK", short: "TK", label: "Kindergarten" },
  { id: "SD", short: "SD", label: "Elementary" },
  { id: "SMP", short: "SMP", label: "Junior High" },
  { id: "SMA", short: "SMA/SMK", label: "Senior High" },
  { id: "UNIVERSITY", short: "Univ", label: "University" },
];

const STORAGE_KEY = "univers-level";

type Ctx = { level: EducationLevel; setLevel: (l: EducationLevel) => void };
const LevelCtx = createContext<Ctx>({ level: "UNIVERSITY", setLevel: () => {} });

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<EducationLevel>("UNIVERSITY");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && ["TK","SD","SMP","SMA","UNIVERSITY"].includes(saved)) {
      setLevelState(saved as EducationLevel);
    }
  }, []);
  function setLevel(l: EducationLevel) {
    setLevelState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  }
  return <LevelCtx.Provider value={{ level, setLevel }}>{children}</LevelCtx.Provider>;
}

export function useLevel() {
  return useContext(LevelCtx);
}

export function levelLabel(l: EducationLevel) {
  return LEVELS.find((x) => x.id === l)?.label ?? l;
}

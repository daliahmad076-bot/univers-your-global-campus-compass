import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import Shell from "@/components/Shell";
import TopBar from "@/components/TopBar";
import LevelSelector from "@/components/LevelSelector";
import { useLevel, type EducationLevel } from "@/lib/level";

export const Route = createFileRoute("/schedule")({ component: Schedule });

type Ev = { title: string; time: string; where: string; color: string };
const EVENTS_BY_LEVEL: Record<EducationLevel, Record<string, Ev[]>> = {
  TK: {
    "5":  [{ title: "Open House — Tunas Bangsa", time: "9:00 AM", where: "Jakarta Selatan", color: "var(--grad-primary)" }],
    "12": [{ title: "Parenting Workshop", time: "10:00 AM", where: "Online", color: "linear-gradient(135deg,#EC4899,#8B5CF6)" }],
    "20": [{ title: "TK Registration Deadline", time: "All day", where: "—", color: "linear-gradient(135deg,#10B981,#06B6D4)" }],
  },
  SD: {
    "8":  [{ title: "SD Cendekia Trial Day", time: "8:00 AM", where: "Jakarta", color: "var(--grad-primary)" }],
    "15": [{ title: "Cambridge Primary Test", time: "9:00 AM", where: "Global Mandiri", color: "linear-gradient(135deg,#F59E0B,#F97316)" }],
    "25": [{ title: "PPDB SD Negeri", time: "All day", where: "Online", color: "linear-gradient(135deg,#10B981,#06B6D4)" }],
  },
  SMP: {
    "3":  [{ title: "Robotics Competition", time: "10:00 AM", where: "Labschool", color: "linear-gradient(135deg,#F59E0B,#F97316)" }],
    "10": [{ title: "SMP Entrance Test", time: "8:00 AM", where: "Global Sevilla", color: "var(--grad-primary)" }],
    "18": [{ title: "Language Camp Registration", time: "All day", where: "Online", color: "linear-gradient(135deg,#EC4899,#8B5CF6)" }],
  },
  SMA: {
    "6":  [{ title: "UTBK Practice Test", time: "9:00 AM", where: "Online", color: "var(--grad-primary)" }],
    "14": [{ title: "Scholarship Workshop — LPDP", time: "2:00 PM", where: "Univers HQ", color: "linear-gradient(135deg,#EC4899,#8B5CF6)" }],
    "22": [{ title: "SMA Kanisius Open Day", time: "9:00 AM", where: "Jakarta", color: "linear-gradient(135deg,#10B981,#06B6D4)" }],
    "28": [{ title: "SMK Telkom Entrance Exam", time: "8:00 AM", where: "Jakarta", color: "linear-gradient(135deg,#F59E0B,#F97316)" }],
  },
  UNIVERSITY: {
    "3":  [{ title: "MIT Info Session", time: "10:00 AM", where: "Online", color: "var(--grad-primary)" }],
    "8":  [{ title: "IELTS Exam", time: "9:00 AM", where: "British Council", color: "linear-gradient(135deg,#F59E0B,#F97316)" }],
    "14": [
      { title: "NUS Application Deadline", time: "All day", where: "—", color: "linear-gradient(135deg,#10B981,#06B6D4)" },
      { title: "Oxford Interview", time: "3:00 PM", where: "Video Call", color: "var(--grad-primary)" },
    ],
    "22": [{ title: "Scholarship Workshop", time: "2:00 PM", where: "Univers HQ", color: "linear-gradient(135deg,#EC4899,#8B5CF6)" }],
  },
};

function Schedule() {
  const { level } = useLevel();
  const EVENTS = EVENTS_BY_LEVEL[level];
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState(String(today.getDate()));

  const { cells, monthName } = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = Array.from({ length: first }, () => null);
    for (let d = 1; d <= days; d++) arr.push(d);
    while (arr.length % 7) arr.push(null);
    return { cells: arr, monthName: new Date(year, month).toLocaleString("en", { month: "long" }) };
  }, [month, year]);

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1);
    setMonth(d.getMonth()); setYear(d.getFullYear());
  }

  const events = EVENTS[selected] ?? [];

  return (
    <Shell>
      <TopBar />
      <LevelSelector />
      <h1 className="mt-4 text-2xl font-bold animate-fade-up">Schedule</h1>
      <p className="text-xs text-muted-foreground animate-fade-up">Track your applications & important dates</p>

      <div className="mt-5 glass-strong rounded-3xl p-4 animate-fade-up">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => shift(-1)} className="press glass w-8 h-8 rounded-full grid place-items-center"><ChevronLeft className="w-4 h-4" /></button>
          <div className="text-sm font-bold">{monthName} {year}</div>
          <button onClick={() => shift(1)} className="press glass w-8 h-8 rounded-full grid place-items-center"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground mb-1">
          {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            const key = d ? String(d) : "";
            const hasEvent = d && EVENTS[key];
            const isSel = d && key === selected;
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <button key={i} disabled={!d} onClick={() => d && setSelected(key)}
                      className={`press aspect-square rounded-xl text-xs font-medium transition ${
                        isSel ? "gradient-primary text-white shadow-lg" : isToday ? "glass text-primary" : "hover:bg-muted"
                      } ${!d ? "opacity-0 pointer-events-none" : ""}`}>
                <div className="flex flex-col items-center justify-center h-full">
                  {d}
                  {hasEvent && !isSel && <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 animate-fade-up">
        <h2 className="text-sm font-bold mb-3">Events on {monthName} {selected}</h2>
        {events.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-xs text-muted-foreground">No events scheduled</div>
        ) : (
          <div className="space-y-2">
            {events.map((e: Ev, i: number) => (
              <div key={i} className="glass rounded-2xl p-3 flex gap-3 animate-fade-up">
                <div className="w-1.5 rounded-full" style={{ background: e.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{e.where}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}

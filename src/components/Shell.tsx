import { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function Shell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="relative min-h-screen mx-auto max-w-md px-4 pb-32">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #60EFFF 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #0061FF 0%, transparent 70%)", animationDelay: "3s" }} />
      </div>
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}

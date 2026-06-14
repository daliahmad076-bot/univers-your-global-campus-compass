import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mic, MicOff, Volume2, PhoneOff, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUniversity, initials } from "@/lib/db";

export const Route = createFileRoute("/contact/$id/call")({ component: CallPage });

function CallPage() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { data: u } = useQuery({ queryKey: ["uni", id], queryFn: () => fetchUniversity(id) });
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => { const t = setTimeout(() => setConnected(true), 3000); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!connected) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [connected]);

  function end() { nav({ to: "/university/$id", params: { id } }); }
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  if (!u) return null;

  return (
    <div className="fixed inset-0 text-white flex flex-col items-center justify-between py-12"
         style={{ background: "linear-gradient(180deg,#0B1530,#1a2566 60%,#3b2e6b)" }}>
      <div className="w-full px-5 flex items-center">
        <button onClick={end} className="press w-9 h-9 rounded-full grid place-items-center bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center px-6">
        <div className="relative">
          {!connected && (
            <>
              <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
              <span className="absolute -inset-4 rounded-full border border-white/20 animate-ping" style={{ animationDelay: "0.4s" }} />
              <span className="absolute -inset-8 rounded-full border border-white/10 animate-ping" style={{ animationDelay: "0.8s" }} />
            </>
          )}
          <div className="relative w-36 h-36 rounded-full grid place-items-center text-4xl font-bold"
               style={{ background: "var(--grad-primary)", boxShadow: "0 20px 60px rgba(0,97,255,0.5)" }}>
            {initials(u.name)}
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-semibold">{u.name}</h2>
        <p className="mt-2 text-white/70 text-sm">
          {connected ? `Sedang Terhubung · ${mm}:${ss}` : "Menghubungi Bagian Admisi…"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <CtrlBtn active={mute} onClick={() => setMute((v) => !v)}>
          {mute ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </CtrlBtn>
        <button onClick={end} className="press w-16 h-16 rounded-full grid place-items-center bg-red-500 shadow-2xl">
          <PhoneOff className="w-6 h-6" />
        </button>
        <CtrlBtn active={speaker} onClick={() => setSpeaker((v) => !v)}>
          <Volume2 className="w-5 h-5" />
        </CtrlBtn>
      </div>
    </div>
  );
}

function CtrlBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
            className={`press w-14 h-14 rounded-full grid place-items-center transition ${active ? "bg-white text-primary" : "bg-white/15 text-white"}`}>
      {children}
    </button>
  );
}

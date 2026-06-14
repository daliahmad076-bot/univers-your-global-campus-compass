import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mic, MicOff, Video, VideoOff, SwitchCamera, PhoneOff, ArrowLeft, User } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUniversity, initials } from "@/lib/db";

export const Route = createFileRoute("/contact/$id/video")({ component: VideoPage });

function VideoPage() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { data: u } = useQuery({ queryKey: ["uni", id], queryFn: () => fetchUniversity(id) });
  const [connected, setConnected] = useState(false);
  const [mute, setMute] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { const t = setTimeout(() => setConnected(true), 2000); return () => clearTimeout(t); }, []);
  function end() { nav({ to: "/university/$id", params: { id } }); }

  if (!u) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900 text-white">
      {/* Remote feed */}
      <div className="absolute inset-0 grid place-items-center"
           style={{ background: "linear-gradient(180deg,#1f2937,#0f172a)" }}>
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full grid place-items-center bg-white/10 backdrop-blur">
            <User className="w-12 h-12 text-white/80" />
          </div>
          <div className="mt-3 text-sm text-white/80">Staff Admisi</div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center gap-3 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={end} className="press w-9 h-9 rounded-full grid place-items-center bg-white/15">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{u.name}</div>
          <div className="text-[11px] opacity-90 flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
            Video Call - Admisi · {connected ? "Terhubung" : "Menghubungkan…"}
          </div>
        </div>
      </div>

      {/* Self feed */}
      <div className="absolute bottom-28 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl"
           style={{ background: "linear-gradient(180deg,#374151,#111827)" }}>
        <div className="w-full h-full grid place-items-center text-[10px] text-white/80 text-center px-2">
          {videoOff ? "Kamera Mati" : (<><User className="w-7 h-7 mb-1 opacity-80" /><span>Kamera Anda{flipped ? " (Depan)" : ""}</span></>)}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4">
        <CtrlBtn active={flipped} onClick={() => setFlipped((v) => !v)}><SwitchCamera className="w-5 h-5" /></CtrlBtn>
        <CtrlBtn active={mute} onClick={() => setMute((v) => !v)}>{mute ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}</CtrlBtn>
        <CtrlBtn active={videoOff} onClick={() => setVideoOff((v) => !v)}>{videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}</CtrlBtn>
        <button onClick={end} className="press w-14 h-14 rounded-full grid place-items-center bg-red-500 shadow-xl">
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      {/* hidden ref to avoid unused warn */}
      <span className="sr-only">{initials(u.name)}</span>
    </div>
  );
}

function CtrlBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
            className={`press w-12 h-12 rounded-full grid place-items-center transition ${active ? "bg-white text-neutral-900" : "bg-white/15 text-white"}`}>
      {children}
    </button>
  );
}

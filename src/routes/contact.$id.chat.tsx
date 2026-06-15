import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fetchUniversity, initials } from "@/lib/db";

export const Route = createFileRoute("/contact/$id/chat")({ component: ChatPage });

type Msg = { from: "school" | "me"; text: string };

function ChatPage() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { data: u } = useQuery({ queryKey: ["uni", id], queryFn: () => fetchUniversity(id) });
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!u) return;
    setMsgs([
      { from: "school", text: `Halo! Selamat datang di ${u.name}. Ada yang bisa kami bantu?` },
      { from: "me", text: "Saya ingin tanya tentang pendaftaran" },
      { from: "school", text: "Tentu! Pendaftaran gelombang 2 dibuka 1 Juli - 31 Agustus 2026. Apakah ada yang ingin ditanyakan lebih lanjut?" },
    ]);
  }, [u]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [msgs]);

  useEffect(() => {
    if (!u || msgs.length === 0) return;
    try {
      const raw = localStorage.getItem("univers-chat-threads");
      const list: { id: string; last: string; ts: number }[] = raw ? JSON.parse(raw) : [];
      const last = msgs[msgs.length - 1];
      const next = [{ id, last: last.text, ts: Date.now() }, ...list.filter((t) => t.id !== id)];
      localStorage.setItem("univers-chat-threads", JSON.stringify(next));
      window.dispatchEvent(new Event("univers-chat-change"));
    } catch {}
  }, [msgs, u, id]);

  function send() {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t }]);
    setText("");
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "school", text: "Terima kasih pesannya! Tim kami akan segera merespons dalam 1x24 jam." }]);
    }, 1400);
  }

  if (!u) return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-md bg-background">
      <header className="px-4 py-3 flex items-center gap-3 text-white" style={{ background: "var(--grad-primary)" }}>
        <button onClick={() => nav({ to: "/university/$id", params: { id } })} className="press w-9 h-9 rounded-full grid place-items-center bg-white/15">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center font-bold text-sm">{initials(u.name)}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{u.name}</div>
          <div className="text-[11px] opacity-90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · Student Admissions
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-up`}>
            <div className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm ${m.from === "me" ? "rounded-br-sm text-primary-foreground" : "rounded-bl-sm bg-muted text-foreground"}`}
                 style={m.from === "me" ? { background: "var(--grad-primary)" } : undefined}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t bg-background flex items-center gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
               placeholder="Tulis pesan…" className="flex-1 h-11 px-4 rounded-full bg-muted text-sm outline-none focus:ring-2 focus:ring-primary/40" />
        <button onClick={send} className="press w-11 h-11 rounded-full grid place-items-center text-white" style={{ background: "var(--grad-primary)" }}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

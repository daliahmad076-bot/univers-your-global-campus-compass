import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { fetchUniversities, initials } from "@/lib/db";

export const Route = createFileRoute("/messages")({ component: MessagesPage });

type Thread = { id: string; last: string; ts: number };

function readThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("univers-chat-threads");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    setThreads(readThreads());
    const h = () => setThreads(readThreads());
    window.addEventListener("univers-chat-change", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("univers-chat-change", h);
      window.removeEventListener("storage", h);
    };
  }, []);

  const { data: unis = [] } = useQuery({ queryKey: ["unis-all"], queryFn: () => fetchUniversities({}) });
  const byId = new Map(unis.map((u) => [u.id, u]));
  const sorted = [...threads].sort((a, b) => b.ts - a.ts);

  return (
    <Shell>
      <div className="pt-4 animate-fade-in">
        <h1 className="text-2xl font-extrabold tracking-tight">Pesan</h1>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center animate-fade-up">
          <div className="w-20 h-20 rounded-3xl glass grid place-items-center mb-4">
            <MessageCircle className="w-9 h-9 text-primary" />
          </div>
          <p className="text-base font-bold">Belum ada pesan</p>
          <p className="mt-1 text-xs text-muted-foreground max-w-xs">Hubungi sekolah atau universitas yang kamu minati.</p>
          <Link to="/search" className="press mt-5 rounded-full gradient-primary text-white text-xs font-semibold px-5 py-2.5 shadow-lg">
            Jelajahi Sekarang
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-2 animate-fade-up">
          {sorted.map((t) => {
            const u = byId.get(t.id);
            const name = u?.name ?? "Sekolah";
            return (
              <Link key={t.id} to="/contact/$id/chat" params={{ id: t.id }}
                    className="press block glass rounded-2xl p-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full grid place-items-center text-white font-bold text-xs shrink-0"
                     style={{ background: "var(--grad-primary)" }}>
                  {u?.image_url ? (
                    <img src={u.image_url} alt={name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{initials(name)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate">{name}</p>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">{t.last}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {new Date(t.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </Shell>
  );
}

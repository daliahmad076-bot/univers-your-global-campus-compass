import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import Shell from "@/components/Shell";
import TopBar from "@/components/TopBar";

type Msg = { role: "ai" | "user"; text: string };

const STARTERS = [
  "Which major fits me if I love math and design?",
  "Best universities for Computer Science in Asia",
  "How do I prepare for studying abroad?",
  "Compare MIT vs Stanford for AI",
];

function aiReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("design") && lower.includes("math")) return "You'd love programs that mix both — try Computational Design, Human-Computer Interaction, or Architecture. MIT, ETH Zurich, and RISD offer strong tracks.";
  if (lower.includes("asia")) return "For CS in Asia, top picks: National University of Singapore (#8 global), University of Tokyo, and Tsinghua. NUS has great industry links.";
  if (lower.includes("abroad")) return "Start by: 1) picking 5 target schools, 2) preparing IELTS/TOEFL, 3) drafting your motivation letter early, 4) checking scholarships like Chevening or Fulbright.";
  if (lower.includes("mit") || lower.includes("stanford")) return "MIT leans deep technical & research-heavy. Stanford blends tech + entrepreneurship. For pure AI research → MIT. For AI startups → Stanford.";
  return "Great question! Based on global rankings and student outcomes, I'd recommend exploring top schools that match your interests. Try searching the Explore tab and filtering by category.";
}

export const Route = createFileRoute("/chat")({ component: Chat });

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm your Univers AI Advisor 👋 Tell me about your interests, and I'll help you find the right major and schools." },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "ai", text: aiReply(text) }]), 600);
  }

  return (
    <Shell>
      <TopBar />
      <div className="mt-4 flex items-center gap-2 animate-fade-up">
        <div className="w-9 h-9 rounded-full gradient-primary grid place-items-center"><Sparkles className="w-4 h-4 text-white" /></div>
        <div>
          <h1 className="text-base font-bold leading-tight">AI Education Advisor</h1>
          <p className="text-[11px] text-muted-foreground">Personalized guidance, 24/7</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex animate-fade-up ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 text-sm rounded-2xl ${m.role === "user" ? "gradient-primary text-white rounded-br-md shadow-lg" : "glass rounded-bl-md"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="mt-5 space-y-2 animate-fade-up">
          <p className="text-[11px] text-muted-foreground font-medium">Try asking:</p>
          {STARTERS.map((s) => (
            <button key={s} onClick={() => send(s)} className="press w-full text-left glass rounded-2xl px-4 py-3 text-xs">
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-40">
        <div className="glass-strong rounded-full pl-4 pr-1 py-1 flex items-center gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the advisor..."
                 className="flex-1 bg-transparent outline-none text-sm py-2" />
          <button type="submit" className="press w-10 h-10 rounded-full gradient-primary grid place-items-center">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </Shell>
  );
}

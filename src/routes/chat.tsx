import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Shell from "@/components/Shell";
import TopBar from "@/components/TopBar";
import LevelSelector from "@/components/LevelSelector";
import { useLevel, levelLabel, type EducationLevel } from "@/lib/level";

type Msg = { role: "ai" | "user"; text: string };

const STARTERS: Record<EducationLevel, string[]> = {
  TK: [
    "How do I choose the right kindergarten?",
    "What should my child learn before TK?",
    "Best bilingual kindergartens nearby",
    "How to ease separation anxiety?",
  ],
  SD: [
    "How to build strong reading habits?",
    "Best SD with Cambridge curriculum",
    "How to support math foundations at home?",
    "Public vs private elementary — which fits?",
  ],
  SMP: [
    "Which extracurriculars build leadership?",
    "Top SMP for STEM & robotics",
    "How to discover my child's talent?",
    "Best language programs in SMP",
  ],
  SMA: [
    "IPA or IPS — how to choose?",
    "Best SMA for Ivy League prep",
    "How to start scholarship hunting?",
    "SMK vs SMA — which is better?",
  ],
  UNIVERSITY: [
    "Which major fits me if I love math and design?",
    "Best universities for Computer Science in Asia",
    "How do I prepare for studying abroad?",
    "Compare MIT vs Stanford for AI",
  ],
};

const GREETING: Record<EducationLevel, string> = {
  TK: "Hi! I'm your Univers Advisor 👶 Tell me about your child and I'll help you pick the right kindergarten and parenting program.",
  SD: "Hi! I'm your Univers Advisor 📚 Share your child's interests and I'll suggest elementary schools and learning paths.",
  SMP: "Hi! I'm your Univers Advisor 🚀 Tell me your child's passions — I'll guide on SMP, talents, and skill development.",
  SMA: "Hi! I'm your Univers Advisor 🎯 Let's plan majors, scholarships, and university prep for SMA/SMK.",
  UNIVERSITY: "Hi, I'm your Univers AI Advisor 👋 Tell me about your interests, and I'll help you find the right major and schools.",
};

function aiReply(q: string, level: EducationLevel): string {
  const lower = q.toLowerCase();
  if (level === "TK") {
    if (lower.includes("bilingual")) return "For bilingual TK, look at Tunas Bangsa, Little Stars, and Global Mandiri — all blend English with strong Indonesian identity and Montessori play.";
    if (lower.includes("separation")) return "Ease separation with: short trial days, a familiar comfort item, consistent goodbye rituals, and 2 weeks of gradual full-day adaptation.";
    return "At TK level, focus on play-based learning, social skills, and motor development. I can recommend kindergartens with strong parenting programs — switch to the Explore tab.";
  }
  if (level === "SD") {
    if (lower.includes("reading")) return "Build reading by: 20 min/day shared reading, choice-based book selection, and reading aloud even after they can read alone. Cendekia Harapan has a strong literacy track.";
    if (lower.includes("cambridge")) return "Top SD with Cambridge curriculum: Global Mandiri Elementary (Tangerang) and several internationals in Jakarta. They follow Cambridge Primary stages 1–6.";
    return "At SD, foundations matter most: literacy, numeracy, curiosity. Pick schools with strong character + STEAM balance.";
  }
  if (level === "SMP") {
    if (lower.includes("stem") || lower.includes("robotic")) return "For STEM/robotics, SMP Labschool Kebayoran leads — strong olympiad track and robotics club. SMP Global Sevilla offers IB MYP with design tech.";
    if (lower.includes("talent")) return "Discover talents through: variety of extracurriculars in first semester, strength-based feedback, and tools like Gallup StrengthsExplorer for teens.";
    return "SMP is the talent-discovery window. Try schools with diverse extracurriculars — sports, coding, language, arts — then double down on what sparks joy.";
  }
  if (level === "SMA") {
    if (lower.includes("ipa") || lower.includes("ips")) return "Pick IPA if math/science excite you and you target engineering, medicine, or pure sciences. Pick IPS for economics, law, psychology, international relations. Strengths > stereotypes.";
    if (lower.includes("scholarship")) return "Start scholarship hunting in grade 10: track LPDP, Indonesian Heritage, Chevening, Fulbright timelines. SMA Kanisius and SMAN 8 have alumni networks that help.";
    if (lower.includes("smk")) return "SMK fits if you want job-ready skills + early career entry (e.g. SMK Telkom for software). SMA fits if you target university. Both can lead to S1 — your call.";
    return "SMA is about positioning for the next 4 years. Pick a major track, build a portfolio, and start scholarship research early.";
  }
  if (lower.includes("design") && lower.includes("math")) return "You'd love programs that mix both — try Computational Design, HCI, or Architecture. MIT, ETH Zurich, and RISD offer strong tracks.";
  if (lower.includes("asia")) return "For CS in Asia: NUS (#8 global), University of Tokyo, Tsinghua. NUS has great industry links.";
  if (lower.includes("abroad")) return "Start by: 1) picking 5 target schools, 2) IELTS/TOEFL, 3) drafting motivation letter early, 4) scholarships like Chevening or Fulbright.";
  if (lower.includes("mit") || lower.includes("stanford")) return "MIT: deep technical & research. Stanford: tech + entrepreneurship. For AI research → MIT. For AI startups → Stanford.";
  return "Great question! Based on global rankings and student outcomes, explore the Explore tab and filter by category to match your interests.";
}

export const Route = createFileRoute("/chat")({ component: Chat });

function Chat() {
  const { level } = useLevel();
  const [messages, setMessages] = useState<Msg[]>([{ role: "ai", text: GREETING[level] }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([{ role: "ai", text: GREETING[level] }]);
  }, [level]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "ai", text: aiReply(text, level) }]), 600);
  }

  return (
    <Shell>
      <TopBar />
      <LevelSelector />
      <div className="mt-4 flex items-center gap-2 animate-fade-up">
        <div className="w-9 h-9 rounded-full gradient-primary grid place-items-center"><Sparkles className="w-4 h-4 text-white" /></div>
        <div>
          <h1 className="text-base font-bold leading-tight">AI Education Advisor</h1>
          <p className="text-[11px] text-muted-foreground">{levelLabel(level)} · Personalized guidance, 24/7</p>
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
          {STARTERS[level].map((s) => (
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

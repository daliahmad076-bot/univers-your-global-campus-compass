import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.jpg";

export default function Login({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-background">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #60EFFF 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full opacity-40 animate-blob"
             style={{ background: "radial-gradient(circle, #0061FF 0%, transparent 70%)", animationDelay: "3s" }} />
      </div>

      <div className="relative mx-auto max-w-md px-6 pt-12 pb-10 min-h-screen flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-md">
            <img src={logo} alt="Univers" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold tracking-[0.2em] text-sm">UNIVERS</span>
        </div>

        <div className="animate-fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight">Selamat Datang Kembali!</h1>
          <p className="mt-2 text-sm text-muted-foreground">Masuk untuk melanjutkan perjalananmu</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onDone(); }}
          className="mt-8 space-y-3 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="Email atau nomor telepon"
                   className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
          </div>
          <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <input type={show ? "text" : "password"} placeholder="Password"
                   className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
            <button type="button" onClick={() => setShow((v) => !v)} className="press text-muted-foreground">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex justify-end">
            <button type="button" className="text-xs text-primary font-medium">Lupa Password?</button>
          </div>
          <button type="submit"
                  className="press w-full rounded-full gradient-primary text-white font-semibold py-3.5 text-sm shadow-xl">
            Masuk
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex-1 h-px bg-border" />
          atau masuk dengan
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { name: "Google", color: "#EA4335", letter: "G" },
            { name: "Apple", color: "#111", letter: "" },
            { name: "Facebook", color: "#1877F2", letter: "f" },
          ].map((p) => (
            <button key={p.name} onClick={onDone}
                    className="press glass rounded-2xl py-3 flex items-center justify-center gap-2 text-xs font-medium">
              <span className="w-6 h-6 rounded-full grid place-items-center text-white text-xs font-bold"
                    style={{ background: p.color }}>{p.letter || ""}</span>
              {p.name}
            </button>
          ))}
        </div>

        <p className="mt-auto pt-8 text-center text-xs text-muted-foreground">
          Belum punya akun?{" "}
          <button onClick={onDone} className="text-primary font-semibold">Daftar</button>
        </p>
      </div>
    </div>
  );
}

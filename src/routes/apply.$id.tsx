import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, Upload, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Shell from "@/components/Shell";
import { fetchUniversity, submitApplication } from "@/lib/db";

export const Route = createFileRoute("/apply/$id")({ component: ApplyPage });

function ApplyPage() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const { data: u } = useQuery({ queryKey: ["uni", id], queryFn: () => fetchUniversity(id) });
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", program: "", gpa: "", cv_name: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);

  const m = useMutation({
    mutationFn: async () => {
      if (!u) return;
      await submitApplication({
        university_id: u.id, university_name: u.name,
        full_name: form.full_name, email: form.email, phone: form.phone,
        program: form.program, gpa: form.gpa ? Number(form.gpa) : undefined,
        cv_url: form.cv_name || undefined, motivation: form.motivation,
      });
    },
    onSuccess: () => { toast.success("Application submitted!"); setSubmitted(true); },
    onError: (e: any) => toast.error(e.message ?? "Failed to submit"),
  });

  if (!u) return <Shell><div className="pt-10 text-center text-sm">Loading…</div></Shell>;

  if (submitted) {
    return (
      <Shell hideNav>
        <div className="pt-20 flex flex-col items-center text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full gradient-primary grid place-items-center shadow-2xl">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Application Sent!</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">Your application to {u.name} is pending review. Track its status in your Profile.</p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => nav({ to: "/" })} className="press glass rounded-full px-5 py-3 text-sm font-medium">Back home</button>
            <button onClick={() => nav({ to: "/profile" })} className="press gradient-primary text-white rounded-full px-5 py-3 text-sm font-medium">My Applications</button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell hideNav>
      <div className="pt-3 flex items-center gap-3">
        <button onClick={() => nav({ to: "/university/$id", params: { id } })} className="press glass w-9 h-9 rounded-full grid place-items-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-bold">Apply Now</h1>
      </div>

      <div className="mt-4 glass rounded-2xl p-4 animate-fade-up">
        <div className="text-[11px] uppercase text-muted-foreground tracking-wide">Applying to</div>
        <div className="text-sm font-semibold mt-0.5">{u.name}</div>
        <div className="text-[11px] text-muted-foreground">{u.location}, {u.country}</div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mt-4 space-y-3 pb-8">
        <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

        <div className="glass rounded-2xl p-3">
          <label className="text-[11px] font-medium text-muted-foreground">Program</label>
          <select required value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className="w-full mt-1 bg-transparent outline-none text-sm">
            <option value="" disabled>Select a program</option>
            {(u.programs ?? []).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <Field label="GPA (0-4.0)" type="number" value={form.gpa} onChange={(v) => setForm({ ...form, gpa: v })} />

        <label className="press glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl gradient-primary grid place-items-center">
            <Upload className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium">Upload CV / Resume</div>
            <div className="text-[11px] text-muted-foreground truncate">{form.cv_name || "PDF, DOC, or DOCX"}</div>
          </div>
          <input type="file" className="hidden" accept=".pdf,.doc,.docx"
                 onChange={(e) => setForm({ ...form, cv_name: e.target.files?.[0]?.name ?? "" })} />
        </label>

        <div className="glass rounded-2xl p-3">
          <label className="text-[11px] font-medium text-muted-foreground">Motivation Letter</label>
          <textarea rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    placeholder="Why do you want to study here?"
                    className="w-full mt-1 bg-transparent outline-none text-sm resize-none" />
        </div>

        <button type="submit" disabled={m.isPending}
                className="press w-full gradient-primary text-white rounded-full py-4 font-semibold shadow-2xl mt-4"
                style={{ boxShadow: "0 20px 50px -10px rgba(0,97,255,0.6)" }}>
          {m.isPending ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </Shell>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="glass rounded-2xl p-3">
      <label className="text-[11px] font-medium text-muted-foreground">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
             className="w-full mt-1 bg-transparent outline-none text-sm" />
    </div>
  );
}

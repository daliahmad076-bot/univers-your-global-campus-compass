type Kind = "school" | "program" | "scholarship";
const KEY_BY: Record<Kind, string> = {
  school: "univers-saved",
  program: "univers-saved-program",
  scholarship: "univers-saved-scholarship",
};

export function getSaved(kind: Kind = "school"): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY_BY[kind]) || "[]"); } catch { return []; }
}
export function toggleSaved(id: string, kind: Kind = "school"): string[] {
  const cur = getSaved(kind);
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  localStorage.setItem(KEY_BY[kind], JSON.stringify(next));
  window.dispatchEvent(new Event("univers-saved-change"));
  return next;
}

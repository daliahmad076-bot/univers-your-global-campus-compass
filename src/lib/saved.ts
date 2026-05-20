const KEY = "univers-saved";
export function getSaved(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function toggleSaved(id: string): string[] {
  const cur = getSaved();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("univers-saved-change"));
  return next;
}

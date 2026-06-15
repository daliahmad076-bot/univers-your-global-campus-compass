export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  category: "Merit" | "Kebutuhan" | "Pemerintah" | "Internasional";
  coverage: string;
  deadline: string;
  color: string;
};

export const SCHOLARSHIPS: Scholarship[] = [
  { id: "univers-excellence", name: "UNIVERS Excellence", provider: "UNIVERS Foundation", category: "Merit", coverage: "Full Tuition", deadline: "30 Jun 2026", color: "#0061FF" },
  { id: "indonesia-maju", name: "Indonesia Maju Scholarship", provider: "Kemendikbud", category: "Pemerintah", coverage: "Full Tuition + Tunjangan Hidup", deadline: "15 Agt 2026", color: "#DC2626" },
  { id: "kip-k", name: "KIP-K (Kartu Indonesia Pintar Kuliah)", provider: "Pemerintah RI", category: "Pemerintah", coverage: "Need-Based · Full Tuition", deadline: "30 Jun 2026", color: "#16A34A" },
  { id: "lpdp", name: "LPDP Beasiswa Unggulan", provider: "Kemenkeu RI", category: "Pemerintah", coverage: "Full Tuition + Riset + Living", deadline: "01 Sep 2026", color: "#0EA5E9" },
  { id: "future-leaders", name: "Future Leaders Award", provider: "UNIVERS x Industry", category: "Merit", coverage: "50% Tuition", deadline: "01 Jul 2026", color: "#F59E0B" },
  { id: "global-talent", name: "Global Talent Scholarship", provider: "International Council", category: "Internasional", coverage: "Full Tuition", deadline: "31 Jul 2026", color: "#8B5CF6" },
  { id: "prestasi-kalsel", name: "Beasiswa Prestasi Daerah Kalsel", provider: "Pemprov Kalsel", category: "Merit", coverage: "Partial Tuition", deadline: "15 Jul 2026", color: "#0D9488" },
];

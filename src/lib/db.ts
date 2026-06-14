import { supabase } from "@/integrations/supabase/client";
import type { EducationLevel } from "@/lib/level";

export type University = {
  id: string;
  name: string;
  location: string;
  country: string;
  global_ranking: number | null;
  rating: number | null;
  reviews_count: number | null;
  tuition_min: number | null;
  tuition_max: number | null;
  image_url: string | null;
  description: string | null;
  programs: string[] | null;
  category: string | null;
  is_popular: boolean | null;
  education_level: EducationLevel;
  type: string | null;
  accreditation: string | null;
  region: string | null;
  website: string | null;
  is_featured: boolean | null;
};
export type Category = { id: string; name: string; icon: string; education_level: EducationLevel };

export async function fetchUniversities(filters?: {
  q?: string;
  region?: string;
  type?: string;
  accreditation?: string;
  category?: string;
  level?: EducationLevel;
}) {
  let qb = supabase
    .from("universities")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("global_ranking", { ascending: true, nullsFirst: false })
    .order("rating", { ascending: false, nullsFirst: false });
  if (filters?.level) qb = qb.eq("education_level", filters.level);
  if (filters?.q) qb = qb.ilike("name", `%${filters.q}%`);
  if (filters?.region && filters.region !== "Semua") qb = qb.eq("region", filters.region);
  if (filters?.type && filters.type !== "Semua") qb = qb.eq("type", filters.type);
  if (filters?.accreditation && filters.accreditation !== "Semua") qb = qb.eq("accreditation", filters.accreditation);
  if (filters?.category && filters.category !== "Semua") qb = qb.eq("category", filters.category);
  const { data, error } = await qb;
  if (error) throw error;
  const { enrich } = await import("./school-overrides");
  return ((data ?? []) as University[]).map(enrich);
}

export async function fetchCategories(level?: EducationLevel) {
  let qb = supabase.from("categories").select("*").order("name");
  if (level) qb = qb.eq("education_level", level);
  const { data, error } = await qb;
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchUniversity(id: string) {
  const { data, error } = await supabase.from("universities").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as University | null;
}

export async function submitApplication(input: {
  university_id: string; university_name: string;
  full_name: string; email: string; phone?: string;
  program: string; gpa?: number; cv_url?: string; motivation?: string;
  education_level?: EducationLevel;
}) {
  const { error } = await supabase.from("applications").insert(input);
  if (error) throw error;
}

export async function fetchApplications() {
  const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export function initials(name: string) {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
}

import { supabase } from "@/integrations/supabase/client";

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
};
export type Category = { id: string; name: string; icon: string };

export async function fetchUniversities(filters?: {
  q?: string; country?: string; category?: string; maxTuition?: number;
}) {
  let qb = supabase.from("universities").select("*").order("global_ranking", { ascending: true });
  if (filters?.q) qb = qb.ilike("name", `%${filters.q}%`);
  if (filters?.country && filters.country !== "All") qb = qb.eq("country", filters.country);
  if (filters?.category && filters.category !== "All") qb = qb.eq("category", filters.category);
  if (filters?.maxTuition) qb = qb.lte("tuition_min", filters.maxTuition);
  const { data, error } = await qb;
  if (error) throw error;
  return (data ?? []) as University[];
}

export async function fetchCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name");
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
}) {
  const { error } = await supabase.from("applications").insert(input);
  if (error) throw error;
}

export async function fetchApplications() {
  const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

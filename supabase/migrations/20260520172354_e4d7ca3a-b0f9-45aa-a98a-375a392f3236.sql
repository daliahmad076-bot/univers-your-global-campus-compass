
-- Add education_level columns
ALTER TABLE public.universities ADD COLUMN IF NOT EXISTS education_level text NOT NULL DEFAULT 'UNIVERSITY';
ALTER TABLE public.categories  ADD COLUMN IF NOT EXISTS education_level text NOT NULL DEFAULT 'UNIVERSITY';
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS education_level text NOT NULL DEFAULT 'UNIVERSITY';

CREATE INDEX IF NOT EXISTS idx_universities_level ON public.universities(education_level);
CREATE INDEX IF NOT EXISTS idx_categories_level   ON public.categories(education_level);

-- Seed Categories per level (skip if already present by name+level)
INSERT INTO public.categories (name, icon, education_level)
SELECT v.name, v.icon, v.lvl FROM (VALUES
  ('Playful Learning','Palette','TK'),
  ('Early Literacy','BookOpen','TK'),
  ('Motor Skills','Sparkles','TK'),
  ('Parenting Program','Heart','TK'),
  ('Math Foundations','Calculator','SD'),
  ('Reading & Writing','BookOpen','SD'),
  ('Science Discovery','Microscope','SD'),
  ('Creative Arts','Palette','SD'),
  ('STEM & Robotics','Cpu','SMP'),
  ('Languages','Languages','SMP'),
  ('Sports & Talent','Trophy','SMP'),
  ('Coding Club','Code','SMP'),
  ('Science (IPA)','Atom','SMA'),
  ('Social (IPS)','Globe','SMA'),
  ('Vocational (SMK)','Wrench','SMA'),
  ('Scholarship Prep','Award','SMA')
) AS v(name, icon, lvl)
WHERE NOT EXISTS (
  SELECT 1 FROM public.categories c WHERE c.name = v.name AND c.education_level = v.lvl
);

-- Seed schools per level
INSERT INTO public.universities (name, location, country, global_ranking, rating, reviews_count, tuition_min, tuition_max, image_url, description, programs, category, is_popular, education_level)
VALUES
-- TK
('Tunas Bangsa Kindergarten','Jakarta Selatan','Indonesia',NULL,4.8,142,800,1500,'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800','Premium playful learning kindergarten with bilingual program and Montessori approach.',ARRAY['Playgroup','TK A','TK B'],'Playful Learning',true,'TK'),
('Pelangi Ceria TK','Bandung','Indonesia',NULL,4.7,98,600,1200,'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800','Creative early learning with art, music, and motor development focus.',ARRAY['TK A','TK B'],'Creative Arts',true,'TK'),
('Little Stars Preschool','Surabaya','Indonesia',NULL,4.6,76,700,1300,'https://images.unsplash.com/photo-1597392582469-a697322d5c16?w=800','International curriculum kindergarten with parenting support program.',ARRAY['Toddler','TK A','TK B'],'Parenting Program',false,'TK'),

-- SD
('SD Cendekia Harapan','Jakarta','Indonesia',NULL,4.7,210,1200,2400,'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800','Foundational learning with strong literacy and numeracy program.',ARRAY['Reguler','Bilingual'],'Math Foundations',true,'SD'),
('Global Mandiri Elementary','Tangerang','Indonesia',NULL,4.8,185,1800,3200,'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800','International primary school with Cambridge curriculum and STEAM labs.',ARRAY['Cambridge Primary','National Plus'],'Science Discovery',true,'SD'),
('SD Pelita Bangsa','Yogyakarta','Indonesia',NULL,4.5,134,900,1700,'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800','Character-based foundational school with creative arts emphasis.',ARRAY['Reguler'],'Creative Arts',false,'SD'),

-- SMP
('SMP Labschool Kebayoran','Jakarta','Indonesia',NULL,4.8,256,1500,2800,'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800','Top junior high with strong STEM, robotics, and language programs.',ARRAY['Reguler','Akselerasi'],'STEM & Robotics',true,'SMP'),
('SMP Global Sevilla','Jakarta','Indonesia',NULL,4.7,189,2200,3800,'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800','International junior high with IB Middle Years Programme.',ARRAY['IB MYP','National Plus'],'Languages',true,'SMP'),
('SMP Athalia','Tangerang','Indonesia',NULL,4.6,142,1700,3100,'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800','Balanced academic and talent development with strong sports program.',ARRAY['Reguler'],'Sports & Talent',false,'SMP'),

-- SMA / SMK
('SMA Negeri 8 Jakarta','Jakarta','Indonesia',NULL,4.9,512,400,800,'https://images.unsplash.com/photo-1562774053-701939374585?w=800','Top public senior high with consistent national olympiad winners and Ivy League acceptances.',ARRAY['IPA','IPS'],'Science (IPA)',true,'SMA'),
('SMA Kanisius','Jakarta','Indonesia',NULL,4.8,387,2500,4500,'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800','Elite all-boys senior high with strong scholarship pipeline.',ARRAY['IPA','IPS'],'Scholarship Prep',true,'SMA'),
('SMK Telkom Jakarta','Jakarta','Indonesia',NULL,4.6,221,1200,2200,'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800','Premier vocational school for software engineering and networking.',ARRAY['Rekayasa Perangkat Lunak','Teknik Jaringan','Multimedia'],'Vocational (SMK)',true,'SMA')
;

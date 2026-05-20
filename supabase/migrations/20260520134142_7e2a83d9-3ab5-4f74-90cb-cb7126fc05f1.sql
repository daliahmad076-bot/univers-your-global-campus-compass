
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  country text NOT NULL,
  global_ranking int,
  rating numeric(2,1) DEFAULT 4.5,
  reviews_count int DEFAULT 0,
  tuition_min int,
  tuition_max int,
  image_url text,
  description text,
  programs text[] DEFAULT '{}',
  category text,
  is_popular boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES public.universities(id) ON DELETE CASCADE,
  university_name text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  program text NOT NULL,
  gpa numeric(3,2),
  cv_url text,
  motivation text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "public read universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "public read applications" ON public.applications FOR SELECT USING (true);
CREATE POLICY "public insert applications" ON public.applications FOR INSERT WITH CHECK (true);

INSERT INTO public.categories (name, icon) VALUES
('Computer Science','Cpu'),
('Business','Briefcase'),
('Engineering','Wrench'),
('Art & Design','Palette'),
('Medical','Stethoscope'),
('Law','Scale'),
('Science','FlaskConical'),
('Education','GraduationCap');

INSERT INTO public.universities (name, location, country, global_ranking, rating, reviews_count, tuition_min, tuition_max, image_url, description, programs, category, is_popular) VALUES
('Massachusetts Institute of Technology','Cambridge, MA','USA',1,4.9,1284,55000,60000,'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800','World-renowned institution focused on scientific and technological research.','{Computer Science,Data Science,AI,Robotics}','Computer Science',true),
('Stanford University','Stanford, CA','USA',2,4.9,1820,56000,62000,'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800','Leading research university in the heart of Silicon Valley.','{Computer Science,Business,Engineering}','Business',true),
('Harvard University','Cambridge, MA','USA',3,4.9,2210,54000,59000,'https://images.unsplash.com/photo-1559135197-8a45ea74d367?w=800','One of the most prestigious universities in the world.','{Law,Medicine,Business}','Law',true),
('University of Oxford','Oxford','UK',4,4.8,1560,40000,48000,'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=800','One of the oldest universities in the English-speaking world.','{Humanities,Science,Law}','Science',true),
('National University of Singapore','Singapore','Singapore',8,4.7,2105,22000,30000,'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800','Leading global university centered in Asia.','{Engineering,Business,Computer Science}','Engineering',true),
('ETH Zurich','Zurich','Switzerland',7,4.8,980,1500,3000,'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800','Premier science and technology university in Europe.','{Engineering,Science,Architecture}','Engineering',true),
('University of Tokyo','Tokyo','Japan',23,4.7,1340,9000,12000,'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800','Top research university in Japan and Asia.','{Science,Engineering,Medicine}','Science',true),
('Rhode Island School of Design','Providence, RI','USA',24,4.8,850,53000,58000,'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800','One of the oldest and best-known colleges of art and design.','{Graphic Design,Illustration,Industrial Design}','Art & Design',true),
('Universitas Indonesia','Depok','Indonesia',206,4.6,3200,3000,5000,'https://images.unsplash.com/photo-1562774053-701939374585?w=800','Top public research university in Indonesia.','{Medicine,Engineering,Business,Law}','Medical',true),
('Institut Teknologi Bandung','Bandung','Indonesia',281,4.6,2890,2500,4500,'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800','Premier engineering university in Indonesia.','{Engineering,Science,Art & Design}','Engineering',true),
('Universitas Gadjah Mada','Yogyakarta','Indonesia',231,4.5,2750,2800,4800,'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800','One of the largest and oldest universities in Indonesia.','{Medicine,Law,Education}','Education',true),
('University of Melbourne','Melbourne','Australia',14,4.7,1890,30000,38000,'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800','Leading Australian research university.','{Medicine,Law,Business}','Medical',true);

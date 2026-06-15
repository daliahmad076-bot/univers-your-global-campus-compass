export type Program = {
  id: string;
  name: string;
  level: "S1" | "S2" | "S3" | "Diploma";
  duration: string;
  rating: number;
  icon: string; // lucide icon name
  description: string;
  highlights: string[];
  curriculum: { semester: string; courses: string[] }[];
  career: { jobs: string[]; salary: string; companies: string[] };
  admission: { requirements: string[]; deadline: string; tuition: string };
};

export const PROGRAMS: Program[] = [
  {
    id: "teknik-informatika",
    name: "Teknik Informatika",
    level: "S1", duration: "4 Tahun", rating: 4.8, icon: "Cpu",
    description: "Program studi yang fokus pada rekayasa perangkat lunak, AI, data, dan jaringan komputer.",
    highlights: ["Tingkat keterserapan kerja tinggi", "Kurikulum industri-aligned", "Lab modern & cloud lab", "Magang global"],
    curriculum: [
      { semester: "Semester 1", courses: ["Algoritma & Pemrograman", "Matematika Diskrit", "Pengantar TI", "Kalkulus"] },
      { semester: "Semester 2", courses: ["Struktur Data", "Basis Data", "Statistika", "Bahasa Inggris"] },
      { semester: "Semester 3-4", courses: ["RPL", "Sistem Operasi", "Jaringan", "Pemrograman Web"] },
      { semester: "Semester 5-8", courses: ["AI & ML", "Cloud Computing", "Cyber Security", "Skripsi"] },
    ],
    career: { jobs: ["Software Engineer", "Data Scientist", "DevOps", "Cyber Security Analyst"], salary: "Rp 8 – 25 jt / bulan", companies: ["Gojek", "Tokopedia", "Google", "Traveloka"] },
    admission: { requirements: ["Lulus SMA/SMK", "Nilai Matematika ≥ 75", "Lulus tes UTBK / mandiri"], deadline: "30 Juni 2026", tuition: "Rp 8 – 15 jt / semester" },
  },
  {
    id: "manajemen-bisnis",
    name: "Manajemen Bisnis",
    level: "S1", duration: "4 Tahun", rating: 4.7, icon: "Briefcase",
    description: "Belajar mengelola bisnis modern: strategi, marketing, finance, dan kewirausahaan digital.",
    highlights: ["Banyak alumni di startup", "Kelas studi kasus nyata", "Inkubator bisnis", "Sertifikasi internasional"],
    curriculum: [
      { semester: "Semester 1", courses: ["Pengantar Bisnis", "Akuntansi Dasar", "Mikroekonomi", "Komunikasi Bisnis"] },
      { semester: "Semester 2", courses: ["Manajemen Pemasaran", "Manajemen Keuangan", "Statistika Bisnis", "Etika Bisnis"] },
      { semester: "Semester 3-4", courses: ["Manajemen SDM", "Operasional", "Strategi Bisnis", "Digital Marketing"] },
      { semester: "Semester 5-8", courses: ["Kewirausahaan", "Bisnis Internasional", "Capstone", "Skripsi"] },
    ],
    career: { jobs: ["Marketing Manager", "Business Analyst", "Entrepreneur", "Consultant"], salary: "Rp 7 – 20 jt / bulan", companies: ["Unilever", "P&G", "BCA", "McKinsey"] },
    admission: { requirements: ["Lulus SMA/SMK semua jurusan", "Esai motivasi", "Wawancara"], deadline: "15 Juli 2026", tuition: "Rp 7 – 13 jt / semester" },
  },
  {
    id: "kedokteran",
    name: "Kedokteran",
    level: "S1", duration: "6 Tahun", rating: 4.9, icon: "Stethoscope",
    description: "Pendidikan dokter umum dengan praktik klinis, etika kedokteran, dan riset biomedis.",
    highlights: ["Akreditasi A", "Rumah sakit jejaring", "Tutor 1-on-1", "Beasiswa kemenkes"],
    curriculum: [
      { semester: "Tahun 1-2", courses: ["Anatomi", "Fisiologi", "Biokimia", "Histologi"] },
      { semester: "Tahun 3", courses: ["Patologi", "Farmakologi", "Mikrobiologi", "Public Health"] },
      { semester: "Tahun 4", courses: ["Penyakit Dalam", "Bedah", "Anak", "Obgyn"] },
      { semester: "Tahun 5-6", courses: ["Koas (Clinical Clerkship)", "UKMPPD", "Internship"] },
    ],
    career: { jobs: ["Dokter Umum", "Dokter Spesialis", "Peneliti Medis", "Public Health Officer"], salary: "Rp 10 – 40 jt / bulan", companies: ["RSCM", "RS Premier", "Kemenkes", "WHO"] },
    admission: { requirements: ["Lulus SMA IPA", "UTBK Saintek", "Tes kesehatan & wawancara"], deadline: "01 Juli 2026", tuition: "Rp 20 – 40 jt / semester" },
  },
  {
    id: "hukum",
    name: "Hukum",
    level: "S1", duration: "4 Tahun", rating: 4.6, icon: "Scale",
    description: "Pendidikan ilmu hukum: perdata, pidana, tata negara, dan hukum bisnis internasional.",
    highlights: ["Moot court", "Magang firma hukum", "Klinik hukum pro-bono", "Dosen praktisi"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Pengantar Ilmu Hukum", "Hukum Perdata", "Hukum Pidana", "PIH"] },
      { semester: "Semester 3-4", courses: ["Hukum Acara", "Tata Negara", "Hukum Bisnis", "Hukum Internasional"] },
      { semester: "Semester 5-6", courses: ["Hukum Adat", "HKI", "Hukum Lingkungan", "Hukum Perpajakan"] },
      { semester: "Semester 7-8", courses: ["KKN", "Skripsi", "Praktik Peradilan"] },
    ],
    career: { jobs: ["Pengacara", "Notaris", "Jaksa", "Legal Counsel"], salary: "Rp 8 – 30 jt / bulan", companies: ["HHP", "AHP", "Kejaksaan", "Mahkamah Agung"] },
    admission: { requirements: ["Lulus SMA/SMK", "UTBK Soshum", "Wawancara"], deadline: "10 Juli 2026", tuition: "Rp 7 – 14 jt / semester" },
  },
  {
    id: "akuntansi",
    name: "Akuntansi",
    level: "S1", duration: "4 Tahun", rating: 4.7, icon: "Calculator",
    description: "Akuntansi keuangan, audit, perpajakan, dan akuntansi manajerial untuk dunia korporat.",
    highlights: ["Sertifikasi CPA / CA", "Lab akuntansi", "Kerjasama Big Four", "Tax clinic"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Pengantar Akuntansi", "Mikro/Makro", "Matematika Ekonomi", "Bisnis Pengantar"] },
      { semester: "Semester 3-4", courses: ["Akuntansi Keuangan", "Auditing", "Perpajakan", "Sistem Informasi Akuntansi"] },
      { semester: "Semester 5-6", courses: ["Akuntansi Biaya", "Akuntansi Manajemen", "Akuntansi Sektor Publik"] },
      { semester: "Semester 7-8", courses: ["Skripsi", "Praktik Audit", "Capstone"] },
    ],
    career: { jobs: ["Auditor", "Tax Consultant", "Financial Analyst", "Controller"], salary: "Rp 7 – 22 jt / bulan", companies: ["PwC", "EY", "Deloitte", "KPMG"] },
    admission: { requirements: ["Lulus SMA/SMK", "UTBK Soshum/Saintek", "Tes Matematika"], deadline: "20 Juli 2026", tuition: "Rp 6 – 12 jt / semester" },
  },
  {
    id: "teknik-sipil",
    name: "Teknik Sipil",
    level: "S1", duration: "4 Tahun", rating: 4.6, icon: "HardHat",
    description: "Perancangan dan konstruksi bangunan, jalan, jembatan, dan infrastruktur skala besar.",
    highlights: ["Lab struktur & material", "Field trip proyek", "Sertifikasi SKA", "Industri partner"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Kalkulus", "Fisika Teknik", "Menggambar Teknik", "Material Konstruksi"] },
      { semester: "Semester 3-4", courses: ["Mekanika Tanah", "Mekanika Struktur", "Hidrolika", "Beton Bertulang"] },
      { semester: "Semester 5-6", courses: ["Manajemen Konstruksi", "Jembatan", "Geoteknik", "Rekayasa Gempa"] },
      { semester: "Semester 7-8", courses: ["KP", "Skripsi", "Capstone Proyek"] },
    ],
    career: { jobs: ["Site Engineer", "Structural Engineer", "Project Manager", "Konsultan"], salary: "Rp 7 – 25 jt / bulan", companies: ["Waskita", "Wijaya Karya", "PP", "Adhi Karya"] },
    admission: { requirements: ["Lulus SMA IPA / SMK Bangunan", "UTBK Saintek"], deadline: "30 Juni 2026", tuition: "Rp 7 – 13 jt / semester" },
  },
  {
    id: "psikologi",
    name: "Psikologi",
    level: "S1", duration: "4 Tahun", rating: 4.7, icon: "Brain",
    description: "Memahami perilaku manusia, psikologi klinis, industri, perkembangan, dan sosial.",
    highlights: ["Lab psikologi", "Magang HR & klinis", "Konseling center", "Asesmen psikologi"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Psikologi Umum", "Biopsikologi", "Statistika", "Filsafat Manusia"] },
      { semester: "Semester 3-4", courses: ["Psikologi Perkembangan", "Sosial", "Kepribadian", "Kognitif"] },
      { semester: "Semester 5-6", courses: ["PIO", "Klinis", "Pendidikan", "Asesmen"] },
      { semester: "Semester 7-8", courses: ["PKL", "Skripsi", "Etika Profesi"] },
    ],
    career: { jobs: ["HR Specialist", "Konselor", "Researcher", "UX Researcher"], salary: "Rp 6 – 18 jt / bulan", companies: ["Gojek", "Bank Mandiri", "BPS", "Lazada"] },
    admission: { requirements: ["Lulus SMA semua jurusan", "UTBK Soshum", "Wawancara"], deadline: "15 Juli 2026", tuition: "Rp 6 – 12 jt / semester" },
  },
  {
    id: "farmasi",
    name: "Farmasi",
    level: "S1", duration: "5 Tahun", rating: 4.8, icon: "Pill",
    description: "Ilmu obat-obatan, formulasi, farmakologi, dan praktik apoteker profesional.",
    highlights: ["Lab farmasi modern", "Apoteker profesi", "Riset herbal", "Kolaborasi industri"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Kimia Dasar", "Biologi", "Anatomi-Fisiologi", "Matematika"] },
      { semester: "Semester 3-4", courses: ["Farmakologi", "Farmasetika", "Kimia Medisinal", "Mikrobiologi"] },
      { semester: "Semester 5-6", courses: ["Teknologi Farmasi", "Farmakoterapi", "Analisis Obat"] },
      { semester: "Semester 7-10", courses: ["Skripsi", "Profesi Apoteker", "PKPA"] },
    ],
    career: { jobs: ["Apoteker", "Industri Farmasi", "QA/QC", "Peneliti"], salary: "Rp 8 – 20 jt / bulan", companies: ["Kalbe", "Sanbe", "Kimia Farma", "Bio Farma"] },
    admission: { requirements: ["Lulus SMA IPA", "UTBK Saintek", "Tes kesehatan"], deadline: "10 Juli 2026", tuition: "Rp 10 – 18 jt / semester" },
  },
  {
    id: "ilmu-komunikasi",
    name: "Ilmu Komunikasi",
    level: "S1", duration: "4 Tahun", rating: 4.6, icon: "Megaphone",
    description: "Media, jurnalistik, public relations, periklanan, dan strategi komunikasi digital.",
    highlights: ["Studio TV & radio", "Magang media nasional", "Portfolio production", "Sertifikasi digital marketing"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Pengantar Komunikasi", "Filsafat Komunikasi", "Bahasa Inggris", "Sosiologi"] },
      { semester: "Semester 3-4", courses: ["Jurnalistik", "Public Relations", "Periklanan", "Media Digital"] },
      { semester: "Semester 5-6", courses: ["Manajemen Media", "Komunikasi Politik", "Riset Komunikasi"] },
      { semester: "Semester 7-8", courses: ["KKL/Magang", "Skripsi"] },
    ],
    career: { jobs: ["PR Officer", "Content Strategist", "Journalist", "Social Media Manager"], salary: "Rp 5 – 18 jt / bulan", companies: ["Kompas", "Detik", "Ogilvy", "Tokopedia"] },
    admission: { requirements: ["Lulus SMA/SMK", "UTBK Soshum", "Portofolio (opsional)"], deadline: "25 Juli 2026", tuition: "Rp 6 – 11 jt / semester" },
  },
  {
    id: "arsitektur",
    name: "Arsitektur",
    level: "S1", duration: "4 Tahun", rating: 4.7, icon: "Building2",
    description: "Perancangan ruang, bangunan, dan kawasan dengan pendekatan estetika & berkelanjutan.",
    highlights: ["Studio desain", "Field study", "Software BIM/CAD", "Kompetisi nasional"],
    curriculum: [
      { semester: "Semester 1-2", courses: ["Pengantar Arsitektur", "Menggambar Arsitektur", "Sejarah Arsitektur"] },
      { semester: "Semester 3-4", courses: ["Studio Perancangan 1-2", "Struktur Bangunan", "Fisika Bangunan"] },
      { semester: "Semester 5-6", courses: ["Studio Perancangan 3-4", "Urban Design", "Arsitektur Hijau"] },
      { semester: "Semester 7-8", courses: ["Tugas Akhir Studio", "Skripsi"] },
    ],
    career: { jobs: ["Arsitek", "Urban Planner", "Interior Designer", "BIM Specialist"], salary: "Rp 6 – 22 jt / bulan", companies: ["PTI", "Urbane", "Airmas Asri", "PDW"] },
    admission: { requirements: ["Lulus SMA IPA", "UTBK Saintek", "Tes gambar"], deadline: "05 Juli 2026", tuition: "Rp 8 – 14 jt / semester" },
  },
];

export function findProgram(id: string) {
  return PROGRAMS.find((p) => p.id === id);
}

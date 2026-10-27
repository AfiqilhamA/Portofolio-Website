export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Data & AI' | 'Data Engineering' | 'Full-Stack & Mobile' | 'Game Dev';
  status: string;
  problem: string;
  architecture: string;
  outcome: string;
  techStack: string[];
}

export const PROFILE_DATA = {
  name: "Afiq Ilham Akbar",
  title: "Data Scientist, AI/ML Engineer & Full-Stack Developer",
  degree: "Sarjana Teknik Informatika (S.Kom.) — Konsentrasi Data Science",
  university: "BINUS University (Lulus Desember 2026)",
  location: "Tangerang Selatan, Indonesia",
  availability: "Tersedia untuk Peran Full-Time & Proyek Konsultasi",
  email: "afiq.ilham@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  heroPitch:
    "Merancang sistem berbasis data dari hulu ke hilir: mulai dari deployment Large Language Model (LLM) lokal berskala enterprise, pipa data streaming real-time, hingga aplikasi web produksi untuk digitalisasi operasional.",
  quickMetrics: [
    { label: "Pengalaman Enterprise", value: "1+ Tahun", detail: "Proyek ML/LLM untuk Telkomsel & PLN (via NUN)" },
    { label: "Fokus Utama", value: "AI & Data Pipeline", detail: "Self-Hosted LLM (Gemma 3 27B), PySpark, Kafka" },
    { label: "Kualifikasi Akademik", value: "S1 Teknik Informatika", detail: "BINUS University — Riset NLP & Genomics" },
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "IT Consultant & Full-Stack Developer",
    company: "PT Profindo Multi Dinamika",
    period: "2026",
    location: "Indonesia",
    type: "Project / Consulting",
    summary: "Memimpin digitalisasi alur kerja operasional teknisi lapangan dan tim administrasi melalui sistem manajemen aset terpusat.",
    highlights: [
      "Merancang dan men-deploy dashboard input data berbasis web serta REST API menggunakan Next.js, React, dan Supabase.",
      "Mengintegrasikan sistem pembuatan dan pemindaian QR Code otomatis untuk mempercepat pelacakan aset fisik oleh teknisi di lapangan.",
      "Menerapkan Role-Based Access Control (RBAC) yang memisahkan hak akses operasional antara teknisi lapangan dan administrator pusat."
    ],
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "REST API", "Vercel"]
  },
  {
    id: "exp-2",
    role: "Data Science Intern (Enterprise ML & LLM)",
    company: "NUN (Klien: Telkomsel & PLN)",
    period: "Februari 2025 – Februari 2026",
    location: "Indonesia",
    type: "Internship (1 Tahun)",
    summary: "Mengembangkan dan mengelola model Machine Learning serta arsitektur Large Language Model (LLM) untuk kebutuhan operasional BUMN dan telekomunikasi.",
    highlights: [
      "Men-deploy dan mengoptimalkan model Gemma 3 27B secara lokal (self-hosted) pada infrastruktur khusus demi menjamin kerahasiaan data tingkat enterprise tanpa ketergantungan pada API cloud publik.",
      "Membangun pipa pemrosesan data dan alur kerja otomatisasi LLM (termasuk eksplorasi integrasi Langflow) untuk analisis umpan balik pelanggan dan ekstraksi dokumen internal.",
      "Berkolaborasi dalam pengembangan model prediktif dan analitik skala besar untuk mendukung pengambilan keputusan di lingkungan Telkomsel dan PLN."
    ],
    techStack: ["Python", "Gemma 3 27B (Self-Hosted)", "Machine Learning", "NLP", "Langflow", "Docker", "Linux"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Real-Time Solana DEX Data Pipeline & Execution Engine",
    category: "Data Engineering",
    status: "Active System",
    problem: "Transaksi pada Decentralized Exchange (DEX) bergerak dalam hitungan milidetik; pemrosesan batch konvensional terlalu lambat untuk mendeteksi anomali likuiditas.",
    architecture: "Arsitektur microservices poliglot (Go, Rust, Python) yang disambungkan dengan Apache Kafka sebagai message broker dan PySpark untuk agregasi streaming serta disajikan via FastAPI.",
    outcome: "Mampu memproses aliran transaksi on-chain secara real-time dengan latensi rendah untuk mendukung sistem eksekusi perdagangan terotomatisasi.",
    techStack: ["Apache Kafka", "PySpark", "FastAPI", "Python", "Go", "Rust", "Docker"]
  },
  {
    id: "proj-2",
    title: "Algorithmic Trading System: XAU/USD & Nasdaq",
    category: "Data & AI",
    status: "R&D / Quantitative",
    problem: "Indikator teknikal ritel tradisional sering terlambat merespons pergerakan struktur pasar institusional pada instrumen emas (XAU) dan indeks Nasdaq.",
    architecture: "Menggabungkan analisis mikrostruktur pasar (Order Flow, Fair Value Gaps / FVG, dan Smart Money Concepts / SMC) sebagai fitur input ke dalam model Deep Learning.",
    outcome: "Sistem identifikasi probabilitas setup perdagangan otomatis yang terukur secara kuantitatif dan bebas dari bias emosional manual.",
    techStack: ["Python", "Deep Learning", "Time-Series Analysis", "Quantitative Finance", "Order Flow"]
  },
  {
    id: "proj-3",
    title: "Analisis Sentimen Pasar Kendaraan Listrik (Studi Kasus: BYD M6)",
    category: "Data & AI",
    status: "Skripsi S1 — BINUS University",
    problem: "Memetakan persepsi publik dan hambatan adopsi konsumen Indonesia terhadap kendaraan listrik berbasis baterai (BEV) pada segmen keluarga (MPV).",
    architecture: "Pipeline ekstraksi data komentar YouTube, preprocessing teks bahasa Indonesia tidak baku, pembobotan fitur TF-IDF, dan pemodelan klasifikasi Multinomial Naïve Bayes.",
    outcome: "Menghasilkan evaluasi metrik klasifikasi yang tervalidasi secara akademik untuk membedah sentimen positif/negatif konsumen terhadap segmen MPV listrik.",
    techStack: ["Python", "Scikit-Learn", "TF-IDF", "Multinomial Naïve Bayes", "NLP", "Data Visualization"]
  },
  {
    id: "proj-4",
    title: "Analisis Genomik Immuno-Oncology berbasis Data TCGA",
    category: "Data & AI",
    status: "Research Track",
    problem: "Data ekspresi gen kanker dari The Cancer Genome Atlas (TCGA) memiliki dimensi fitur yang sangat tinggi (high-dimensional) sehingga sulit diinterpretasikan secara klinis.",
    architecture: "Penerapan algoritma seleksi fitur dan klasifikasi Machine Learning menggunakan Python untuk mengidentifikasi biomarker imunologi yang relevan.",
    outcome: "Menyusun kerangka pemodelan komputasi bioinformatika untuk mendukung riset abstrak pada konferensi ilmiah onkologi (SOHC).",
    techStack: ["Python", "Bioinformatics", "Machine Learning", "Feature Selection", "Pandas"]
  },
  {
    id: "proj-5",
    title: "Enterprise QR Asset Management & Technician Portal",
    category: "Full-Stack & Mobile",
    status: "Production",
    problem: "Pencatatan riwayat pemeliharaan aset oleh teknisi masih dilakukan secara manual sehingga rawan selisih data dan lambat direkap oleh admin.",
    architecture: "Aplikasi web full-stack menggunakan React di sisi klien dan Supabase (PostgreSQL + Auth) di sisi backend, dilengkapi modul generator QR Code dinamis.",
    outcome: "Memangkas waktu pelaporan teknisi di lapangan dan memberikan visibilitas status aset secara real-time bagi manajemen.",
    techStack: ["React", "Supabase", "PostgreSQL", "Tailwind CSS", "QR Code Integration"]
  },
  {
    id: "proj-6",
    title: "2D Cozy Multiplayer RV & Mobile Bookshop",
    category: "Game Dev",
    status: "In Development",
    problem: "Sinkronisasi state pemain dan inventaris toko secara real-time tanpa membebani biaya sewa dedicated server.",
    architecture: "Dikembangkan di Godot Engine dengan arsitektur jaringan Peer-to-Peer (P2P), sistem manajemen state kustom untuk toko buku keliling, dan estetika visual low-poly/2D.",
    outcome: "Prototipe co-op multiplayer yang dapat dimainkan bersama dengan mekanika kustomisasi item dan eksplorasi interaktif.",
    techStack: ["Godot Engine", "GDScript", "P2P Networking", "Game Systems Design"]
  }
];

export const SKILL_CATEGORIES = [
  {
    domain: "Data Science, AI & LLM",
    description: "Pemodelan prediktif, NLP, dan infrastruktur model bahasa lokal.",
    skills: ["Python (3.12)", "Self-Hosted LLM (Gemma 3 27B)", "Scikit-Learn", "Deep Learning", "NLP (TF-IDF, Naïve Bayes)", "Langflow", "Quantitative Analysis"]
  },
  {
    domain: "Data Engineering & Backend",
    description: "Arsitektur streaming real-time, API berkinerja tinggi, dan basis data.",
    skills: ["Apache Kafka", "PySpark", "FastAPI", "PostgreSQL / Supabase", "RESTful API", "Go & Rust (Microservices)"]
  },
  {
    domain: "Frontend & Mobile Engineering",
    description: "Antarmuka web responsif, dashboard internal, dan aplikasi lintas platform.",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Flutter (Dart)", "HTML5 / Canvas API"]
  },
  {
    domain: "Infrastructure & Dev Environment",
    description: "Deployment mandiri, kontainerisasi, dan administrasi server Linux.",
    skills: ["Docker", "Linux (Ubuntu WSL 2 & Debian Headless Server)", "Git & GitHub", "Vercel", "VS Code"]
  }
];
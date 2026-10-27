import { useState } from 'react';

// Mendefinisikan Tipe Data Sertifikat agar TypeScript (Build) tidak error
type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: { id: string; en: string };
  credentialId: string;
  desc: { id: string; en: string };
  category: string;
  verifyUrl?: string; // Tanda tanya (?) berarti opsional, tidak semua harus punya
};

// Data Profil & Kontak
const PROFILE_DATA = {
  degree: "Sarjana Teknik Informatika (S.Kom.)",
  university: "BINUS University",
  location: "Tangerang Selatan, Indonesia",
  email: "afiqilham.akbar4@gmail.com",
  github: "https://github.com/AfiqilhamA",
  linkedin: "https://www.linkedin.com/in/afiq-ilham-akbar-302816281?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/afiqilham4?cplk=em1jbmk2c3hteGg4",
  whatsapp: "081315129834",
  quickMetrics: [
    { label: "PENGALAMAN ENTERPRISE", val: "1+ Tahun", sub: "Proyek ML/LLM untuk Telkomsel & PLN" },
    { label: "FOKUS UTAMA", val: "AI & Data Pipeline", sub: "Self-Hosted LLM, PySpark, Kafka" },
    { label: "KUALIFIKASI AKADEMIK", val: "S1 Teknik Informatika", sub: "BINUS University — Riset NLP" }
  ]
};

// Data Keahlian
const ENHANCED_SKILL_CATEGORIES = [
  {
    domain: { id: "Data Science, AI & LLM", en: "Data Science, AI & LLM" },
    description: { id: "Pemodelan prediktif, visualisasi data, NLP, dan model bahasa lokal.", en: "Predictive modeling, data visualization, NLP, and local language models." },
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
      { name: "Tableau", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg" },
      { name: "Scikit-Learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Deep Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Langflow", icon: "https://raw.githubusercontent.com/langflow-ai/langflow/main/docs/static/img/langflow_logo.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" }
    ]
  },
  {
    domain: { id: "Data Engineering & Jaringan", en: "Data Engineering & Networking" },
    description: { id: "Arsitektur streaming real-time, jaringan, API, dan basis data.", en: "Real-time streaming architecture, networking, APIs, and databases." },
    skills: [
      { name: "Apache Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg" },
      { name: "Apache Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      { name: "Apache Iceberg", icon: "https://iceberg.apache.org/img/Iceberg-logo.png" },
      { name: "PySpark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Cisco", icon: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg" },
      { name: "Go & Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" }
    ]
  },
  {
    domain: { id: "Frontend & Mobile Engineering", en: "Frontend & Mobile Engineering" },
    description: { id: "Antarmuka web responsif, dashboard internal, dan aplikasi lintas platform.", en: "Responsive web interfaces, internal dashboards, and cross-platform apps." },
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" }
    ]
  },
  {
    domain: { id: "Infrastructure & Dev Environment", en: "Infrastructure & Dev Environment" },
    description: { id: "Deployment mandiri, kontainerisasi, dan administrasi server Linux.", en: "Self-deployment, containerization, and Linux server administration." },
    skills: [
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Vercel", icon: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
    ]
  }
];

const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "Real-Time Solana DEX Data Pipeline & Execution Engine",
    category: "Data Engineering",
    status: { id: "Dalam Pengembangan", en: "In Development" },
    problem: {
      id: "Transaksi jual-beli crypto di DEX berjalan sangat cepat (dalam hitungan milidetik), sehingga sistem biasa terlalu lambat untuk mendeteksi perubahan harga atau likuiditas.",
      en: "Crypto swap transactions on DEX execute within milliseconds, making standard systems too slow to detect liquidity shifts or price anomalies."
    },
    architecture: {
      id: "Menggunakan gabungan teknologi modern (Go, Rust, Python) dengan Apache Kafka untuk menangani data masuk yang masif serta PySpark untuk memproses aliran data secara langsung.",
      en: "Built using a polyglot microservices architecture (Go, Rust, Python) connected with Apache Kafka for massive message broker ingestion and PySpark for stream aggregation."
    },
    outcome: {
      id: "Mampu memproses data transaksi blockchain secara instan dengan jeda waktu sangat rendah untuk persiapan sistem trading otomatis.",
      en: "Capable of processing on-chain transaction streams in real-time with low latency to support automated trade execution systems."
    },
    techStack: ["Apache Kafka", "PySpark", "FastAPI", "Python", "Go", "Rust", "Docker"]
  },
  {
    id: "proj-2",
    title: "Algorithmic Trading System: XAU/USD & Nasdaq",
    category: "Data & AI",
    status: { id: "Dalam Pengembangan", en: "In Development" },
    problem: {
      id: "Indikator analisis teknikal konvensional sering terlambat membaca arah pergerakan pasar institusional pada instrumen Emas (XAU) dan indeks Nasdaq.",
      en: "Traditional retail technical indicators often lag behind institutional market structure movements on Gold (XAU) and Nasdaq instruments."
    },
    architecture: {
      id: "Menggabungkan analisis struktur pasar institusional (seperti Order Flow dan Smart Money Concepts) sebagai input data untuk model kecerdasan buatan (Deep Learning).",
      en: "Combining institutional market microstructure analysis (Order Flow, Fair Value Gaps, and Smart Money Concepts) as feature inputs into Deep Learning models."
    },
    outcome: {
      id: "Menciptakan sistem bantu keputusan trading yang lebih terukur secara statistik dan mengurangi keputusan yang didorong emosi sesaat.",
      en: "Establishing a quantitatively measurable trading setup identification system free from manual emotional bias."
    },
    techStack: ["Python", "Deep Learning", "Time-Series Analysis", "Quantitative Finance", "Order Flow"]
  },
  {
    id: "proj-3",
    title: "Analisis Sentimen Pasar Kendaraan Listrik (Studi Kasus: BYD M6)",
    category: "Data & AI",
    status: { id: "Skripsi S1", en: "Undergrad Thesis" },
    problem: {
      id: "Belum banyak yang memetakan bagaimana pandangan serta hambatan masyarakat Indonesia terhadap mobil listrik keluarga (MPV) seperti BYD M6.",
      en: "Mapping public perception and consumer adoption barriers in Indonesia towards Battery Electric Vehicles (BEVs) in the family MPV segment."
    },
    architecture: {
      id: "Mengambil data komentar YouTube, merapikan teks bahasa Indonesia tidak baku, lalu menerapkan metode perhitungan TF-IDF dan algoritma Naïve Bayes.",
      en: "YouTube comment data extraction pipeline, unstructured Indonesian text preprocessing, TF-IDF feature weighting, and Multinomial Naïve Bayes classification."
    },
    outcome: {
      id: "Menghasilkan laporan evaluasi akurat mengenai persentase sentimen positif dan negatif masyarakat terhadap mobil listrik keluarga.",
      en: "Delivered academically validated evaluation metrics assessing consumer sentiment regarding electric family vehicles."
    },
    techStack: ["Python", "Scikit-Learn", "TF-IDF", "Multinomial Naïve Bayes", "NLP", "Tableau"]
  },
  {
    id: "proj-4",
    title: "Analisis Genomik Kanker berbasis Data TCGA",
    category: "Data & AI",
    status: { id: "Riset Akademik", en: "Research Track" },
    problem: {
      id: "Data ekspresi genetik dari pasien kanker memiliki ribuan variabel kompleks yang sangat sulit dianalisis secara manual oleh tenaga medis.",
      en: "Cancer gene expression data from The Cancer Genome Atlas (TCGA) features high-dimensional datasets that are difficult to interpret clinically."
    },
    architecture: {
      id: "Menerapkan algoritma Machine Learning dengan teknik penyaringan fitur data untuk menemukan penanda biologis (biomarker) imunologi yang penting.",
      en: "Implementation of feature selection algorithms and Machine Learning classification to identify relevant immunological biomarkers."
    },
    outcome: {
      id: "Mendukung penyusunan riset ilmiah komputasi bioinformatika untuk kebutuhan konferensi onkologi (SOHC).",
      en: "Formulated computational bioinformatics modeling frameworks to support scientific abstracts in oncology conferences (SOHC)."
    },
    techStack: ["Python", "Bioinformatics", "Machine Learning", "Feature Selection", "Pandas"]
  },
  {
    id: "proj-5",
    title: "Enterprise QR Asset Management & Technician Portal",
    category: "Full-Stack & Mobile",
    status: { id: "Produksi", en: "Production" },
    problem: {
      id: "Pencatatan dan pengecekan inventaris alat oleh teknisi lapangan masih memakai cara manual, sehingga laporan sering terlambat dan selisih data.",
      en: "Manual asset maintenance record-keeping by field technicians led to data discrepancies and delayed administrative reporting."
    },
    architecture: {
      id: "Membangun aplikasi web interaktif dengan React di sisi tampilan dan Supabase sebagai database, lengkap dengan fitur cetak & scan QR Code instan.",
      en: "Full-stack web application using React on the client side and Supabase (PostgreSQL + Auth) on the backend with dynamic QR Code generator modules."
    },
    outcome: {
      id: "Mempercepat proses pelaporan kerja teknisi di lapangan dan memberikan data real-time bagi admin pusat.",
      en: "Streamlined field reporting workflows and provided real-time asset visibility for central management."
    },
    techStack: ["React", "Supabase", "PostgreSQL", "Tailwind CSS", "QR Code Integration"]
  },
  {
    id: "proj-6",
    title: "2D Cozy Multiplayer RV & Mobile Bookshop Game",
    category: "Game Dev",
    status: { id: "Dalam Pengembangan", en: "In Development" },
    problem: {
      id: "Menyamakan posisi bermain dan data toko antar pemain secara bersamaan (real-time) tanpa harus menyewa server pusat yang mahal.",
      en: "Synchronizing player states and mobile shop inventories in real-time without expensive dedicated server hosting costs."
    },
    architecture: {
      id: "Memanfaatkan Godot Engine dengan jaringan Peer-to-Peer (P2P) serta sistem pengelolaan item permainan mandiri.",
      en: "Developed in Godot Engine using Peer-to-Peer (P2P) networking architecture, custom state management systems, and low-poly 2D aesthetics."
    },
    outcome: {
      id: "Prototipe game co-op santai di mana pemain bisa menjelajah dan mengelola toko buku keliling bersama teman secara online.",
      en: "A playable co-op multiplayer prototype featuring custom item customization and interactive exploration."
    },
    techStack: ["Godot Engine", "GDScript", "P2P Networking", "Game Systems Design"]
  }
];

// Data Sertifikasi dengan Tipe Data yang Ditentukan
const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-0",
    title: "Data Analysis: Fullstack Intensive Bootcamp (Batch 18)",
    issuer: "MySkill",
    date: { id: "30 Okt 2024", en: "30 Oct 2024" },
    credentialId: "MS-30/10/2024-0qfghWp7xLoZjalhX4Ob",
    desc: {
      id: "Bootcamp intensif mencakup SQL Basic hingga Advanced, Data Analysis dengan Python, serta visualisasi data komprehensif.",
      en: "Intensive bootcamp covering Basic to Advanced SQL, Data Analysis with Python, and comprehensive data visualization."
    },
    category: "Data Science & Analytics"
  },
  {
    id: "cert-01",
    title: "Build a Blockchain & Cryptocurrency | Full-Stack Edition",
    issuer: "Udemy",
    date: { id: "16 Nov 2025", en: "16 Nov 2025" },
    credentialId: "UC-1f78e0ea-5564-4516-95c8-1eeb7b9c2f5a",
    desc: {
      id: "Sertifikasi 22 jam pelatihan pengembangan full-stack untuk ekosistem blockchain dan aset kriptografi.",
      en: "22-hour certification training in full-stack development for blockchain ecosystems and cryptographic assets."
    },
    category: "Full-Stack & Web3"
  },
  {
    id: "cert-1",
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: { id: "21 Okt 2026", en: "21 Oct 2026" },
    credentialId: "ALM-COURSE_3825456",
    desc: {
      id: "Pelatihan praktis tentang cara membangun dan mengotomatisasi sistem berbasis agen kecerdasan buatan (AI Agents).",
      en: "Practical training on building and automating systems powered by artificial intelligence agents."
    },
    category: "AI & Machine Learning"
  },
  {
    id: "cert-2",
    title: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    date: { id: "20 Okt 2026", en: "20 Oct 2026" },
    credentialId: "ALM-COURSE_4058910",
    desc: {
      id: "Keahlian mengelompokkan dan mengklasifikasikan data terstruktur memakai model bahasa IBM Granite.",
      en: "Expertise in grouping and classifying structured data using IBM Granite foundation models."
    },
    category: "Data Science"
  },
  {
    id: "cert-3",
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    date: { id: "20 Okt 2026", en: "20 Oct 2026" },
    credentialId: "Credly Verified Badge",
    verifyUrl: "https://www.credly.com/badges/8501eb18-ad72-4d6e-94ee-dcddcdb69fcd",
    desc: {
      id: "Sertifikasi dasar pengolahan data, pemahaman analitik awal, dan manajemen informasi digital.",
      en: "Fundamental competency certification in data processing, initial analytics, and information management."
    },
    category: "Data Engineering"
  },
  {
    id: "cert-4",
    title: "Enterprise Machine Learning & LLM Deployment",
    issuer: "NUN / Enterprise Partner",
    date: { id: "2025 - 2026", en: "2025 - 2026" },
    credentialId: "NUN-ML-2026",
    desc: {
      id: "Pengalaman langsung mengelola dan memasang model LLM secara mandiri (on-premise) untuk kebutuhan BUMN.",
      en: "Hands-on experience managing and deploying on-premise LLM models for enterprise requirements."
    },
    category: "AI Infrastructure"
  },
  {
    id: "cert-5",
    title: "English Proficiency Verified Certificate (C-Level & B-Level)",
    issuer: "Beelingua (BINUS University)",
    date: { id: "Juli 2024", en: "July 2024" },
    credentialId: "Multiple (e.g., 2024-C-hbB3UvBa1G4KZ)",
    desc: {
      id: "Berbagai sertifikasi bahasa Inggris level profesional (Professional Office, Advanced English, Market Research & Business Comm, Creative Writing).",
      en: "Multiple professional-level English certifications (Professional Office, Advanced English, Market Research & Business Comm, Creative Writing)."
    },
    category: "Language & Professional Skills"
  }
];

const ACTIVITIES_DATA = [
  {
    id: "act-1",
    title: { id: "Seminar: Unveiling AI Magic in Data Science", en: "Seminar: Unveiling AI Magic in Data Science" },
    organizer: "Data Science Club BINUS",
    date: { id: "15 Okt 2024", en: "15 Oct 2024" },
    level: "Provinsi",
    type: "Tech Seminar"
  },
  {
    id: "act-2",
    title: { id: "Kemanggisan Sport Festival", en: "Kemanggisan Sport Festival" },
    organizer: "SSO Kemanggisan",
    date: { id: "30 Sep 2024", en: "30 Sep 2024" },
    level: "Provinsi",
    type: "Sports & Athletics"
  },
  {
    id: "act-3",
    title: { id: "HIMSCON: Confidence in Public Speaking & Social Media Branding", en: "HIMSCON: Confidence in Public Speaking & Social Media Branding" },
    organizer: "HIMSI BINUS",
    date: { id: "26 Jun 2024", en: "26 Jun 2024" },
    level: "Provinsi",
    type: "Soft Skills Workshop"
  },
  {
    id: "act-4",
    title: { id: "Digital Content Creation Series", en: "Digital Content Creation Series" },
    organizer: "Internship Center",
    date: { id: "21 Jun 2024", en: "21 Jun 2024" },
    level: "Provinsi",
    type: "Creative Training"
  }
];

const EXPERIENCES_DATA = [
  {
    id: "exp-1",
    role: "IT Consultant & Full-Stack Developer",
    company: "PT Profindo Multi Dinamika",
    period: { id: "2026", en: "2026" },
    location: { id: "Indonesia", en: "Indonesia" },
    type: { id: "Project / Consulting", en: "Project / Consulting" },
    summary: {
      id: "Memimpin digitalisasi alur kerja operasional teknisi lapangan dan tim administrasi melalui sistem manajemen aset terpusat.",
      en: "Led the digitalization of operational workflows for field technicians and administrative teams through a centralized asset management system."
    },
    highlights: {
      id: [
        "Merancang dan men-deploy dashboard input data berbasis web serta REST API menggunakan Next.js, React, dan Supabase.",
        "Mengintegrasikan sistem pembuatan dan pemindaian QR Code otomatis untuk mempercepat pelacakan aset fisik oleh teknisi di lapangan.",
        "Menerapkan Role-Based Access Control (RBAC) yang memisahkan hak akses operasional antara teknisi lapangan dan administrator pusat."
      ],
      en: [
        "Designed and deployed a web-based data input dashboard and REST API using Next.js, React, and Supabase.",
        "Integrated an automated QR Code generation and scanning system to accelerate physical asset tracking by field technicians.",
        "Implemented Role-Based Access Control (RBAC) to separate operational access rights between field technicians and central administrators."
      ]
    },
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "REST API", "Vercel"]
  },
  {
    id: "exp-2",
    role: "Data Science Intern (Enterprise ML & LLM)",
    company: "NUN (Klien: Telkomsel & PLN)",
    period: { id: "Februari 2025 – Februari 2026", en: "February 2025 – February 2026" },
    location: { id: "Indonesia", en: "Indonesia" },
    type: { id: "Internship (1 Tahun)", en: "Internship (1 Year)" },
    summary: {
      id: "Mengembangkan dan mengelola model Machine Learning serta arsitektur Large Language Model (LLM) untuk kebutuhan operasional BUMN dan telekomunikasi.",
      en: "Developed and managed Machine Learning models and Large Language Model (LLM) architectures for state-owned enterprise and telecommunication operational needs."
    },
    highlights: {
      id: [
        "Men-deploy dan mengoptimalkan model Gemma 3 27B secara lokal (self-hosted) pada infrastruktur khusus demi menjamin kerahasiaan data tingkat enterprise tanpa ketergantungan pada API cloud publik.",
        "Membangun pipa pemrosesan data dan alur kerja otomatisasi LLM (termasuk eksplorasi integrasi Langflow) untuk analisis umpan balik pelanggan dan ekstraksi dokumen internal.",
        "Berkolaborasi dalam pengembangan model prediktif dan analitik skala besar untuk mendukung pengambilan keputusan di lingkungan Telkomsel dan PLN."
      ],
      en: [
        "Deployed and optimized the Gemma 3 27B model locally (self-hosted) on dedicated infrastructure to ensure enterprise-level data confidentiality without relying on public cloud APIs.",
        "Built data processing pipelines and LLM automation workflows (including Langflow integration exploration) for customer feedback analysis and internal document extraction.",
        "Collaborated on the development of predictive models and large-scale analytics to support decision-making within Telkomsel and PLN environments."
      ]
    },
    techStack: ["Python", "Gemma 3 27B (Self-Hosted)", "Machine Learning", "NLP", "Langflow", "Docker", "Linux"]
  }
];

const TEXTS = {
  id: {
    nav: { about: "Tentang Saya", exp: "Pengalaman", projects: "Proyek", certs: "Sertifikat", activities: "Kegiatan", skills: "Keahlian", contact: "Hubungi Saya" },
    hero: { location: "TANGERANG SELATAN, INDONESIA", degree: "Sarjana Teknik Informatika (S.Kom.)", status: "Tersedia untuk Kerja", greeting: "Halo, saya Afiq Ilham Akbar. Data Scientist, AI Engineer & Full-Stack Developer.", desc: "Berpengalaman merancang sistem cerdas dari awal hingga siap pakai: mulai dari memasang model AI khusus perusahaan, membuat jalur aliran data real-time, hingga membangun aplikasi web yang fungsional.", btnProjects: "Lihat Proyek Saya", btnAbout: "Tentang Saya" },
    metrics: { m1: { label: "PENGALAMAN ENTERPRISE", val: "1+ Tahun", sub: "Proyek ML/LLM untuk Telkomsel & PLN" }, m2: { label: "FOKUS UTAMA", val: "AI & Data Pipeline", sub: "Self-Hosted LLM, PySpark, Kafka" }, m3: { label: "KUALIFIKASI AKADEMIK", val: "S1 Teknik Informatika", sub: "BINUS University — Riset NLP" } },
    about: { tag: "TENTANG SAYA", title: "Menggabungkan Ilmu Analisis Data dan Pemrograman Perangkat Lunak.", p1: "Saya adalah seorang pengembang dan praktisi Data Science yang tinggal di Tangerang Selatan. Lulusan Teknik Informatika BINUS University ini memiliki pengalaman kerja nyata selama satu tahun di industri enterprise (menangani proyek untuk Telkomsel dan PLN).", p2: "Fokus utama saya adalah mengolah data kompleks menjadi sistem yang berguna—mulai dari melatih model Machine Learning, mengamankan data perusahaan dengan AI lokal, hingga membuat aplikasi yang nyaman digunakan.", eduLabel: "PENDIDIKAN:", instLabel: "KAMPUS:", degreeFull: "Sarjana Teknik Informatika (S.Kom.) – Konsentrasi Data Science", univFull: "BINUS University (Lulus Desember 2026)" },
    exp: { tag: "PENGALAMAN KERJA", title: "Rekam Jejak Profesional & Konsultasi", desc: "Pengalaman langsung dalam menangani sistem kecerdasan buatan korporat dan merapikan sistem operasional." },
    projects: { tag: "PROYEK PILIHAN", title: "Portofolio & Studi Kasus Riset", problem: "MASALAH:", solution: "SOLUSI & ARSITEKTUR:", impact: "DAMPAK:", all: "Semua" },
    certs: { tag: "SERTIFIKASI", title: "Sertifikat Resmi & Pelatihan Profesional", verify: "Verifikasi Credly ↗" },
    activities: { tag: "KEGIATAN & KETERLIBATAN", title: "Aktivitas Kemahasiswaan & Organisasi", desc: "Berpartisipasi aktif dalam seminar teknologi, pengembangan soft skill, dan kegiatan olahraga selama masa perkuliahan." },
    skills: { tag: "KEAHLIAN TEKNIS", title: "Keahlian & Kualifikasi Akademik", eduTitle: "KUALIFIKASI AKADEMIK RESMI (PDDIKTI)", status: "Tugas Akhir Selesai (2026)", focus: "Fokus Riset: Natural Language Processing & Machine Learning" },
    footer: { title: "Hubungi Saya", desc: "Data Scientist & Software Engineer.", call: "Tertarik berdiskusi atau bekerja sama? Mari terhubung.", email: "Email", linkedin: "LinkedIn", github: "GitHub", instagram: "Instagram", whatsapp: "WhatsApp" }
  },
  en: {
    nav: { about: "About Me", exp: "Experience", projects: "Projects", certs: "Certificates", activities: "Activities", skills: "Skills", contact: "Let's Talk" },
    hero: { location: "SOUTH TANGERANG, INDONESIA", degree: "Bachelor of Computer Science", status: "Available for Hire", greeting: "Hi! I'm Afiq Ilham Akbar. Data Scientist, AI Engineer & Full-Stack Developer.", desc: "Passionate about building end-to-end data systems: from deploying enterprise-grade local LLMs and real-time data pipelines to developing production-ready web applications.", btnProjects: "Explore Projects", btnAbout: "About Me" },
    metrics: { m1: { label: "ENTERPRISE EXPERIENCE", val: "1+ Year", sub: "ML/LLM Projects for Telkomsel & PLN" }, m2: { label: "CORE FOCUS", val: "AI & Data Pipeline", sub: "Self-Hosted LLM, PySpark, Kafka" }, m3: { label: "ACADEMIC QUALIFICATION", val: "B.Sc. Computer Science", sub: "BINUS University — NLP Research" } },
    about: { tag: "ABOUT ME", title: "Bridging Quantitative Data Analysis and Modern Software Engineering.", p1: "I am a developer and Data Scientist based in South Tangerang. Armed with a Computer Science degree from BINUS University and a 1-year enterprise internship experience handling projects for Telkomsel and PLN.", p2: "My core expertise covers Machine Learning modeling, self-hosted LLM deployment for strict data privacy, large-scale real-time data pipelines, and interactive web applications.", eduLabel: "EDUCATION:", instLabel: "UNIVERSITY:", degreeFull: "Bachelor of Computer Science – Data Science Focus", univFull: "BINUS University (Graduating Dec 2026)" },
    exp: { tag: "WORK EXPERIENCE", title: "Professional Experience & Consulting", desc: "Hands-on experience handling enterprise AI infrastructure and operational workflow digitalization." },
    projects: { tag: "RECENT PROJECTS", title: "Selected Projects & Research", problem: "PROBLEM:", solution: "ARCHITECTURE & SOLUTION:", impact: "IMPACT:", all: "All" },
    certs: { tag: "CREDENTIALS", title: "Official Certifications & Professional Training", verify: "Verify Certificate ↗" },
    activities: { tag: "ACTIVITIES & INVOLVEMENT", title: "Student Activities & Organizations", desc: "Actively participating in technology seminars, soft skill development, and sports activities during university years." },
    skills: { tag: "SKILLS & EXPERTISE", title: "Tech Stack & Academic Qualification", eduTitle: "OFFICIAL ACADEMIC QUALIFICATION (PDDIKTI)", status: "Thesis Completed (2026)", focus: "Research Focus: Natural Language Processing & Machine Learning" },
    footer: { title: "Get in Touch", desc: "Data Scientist & Software Engineer.", call: "Interested in discussing opportunities or collaboration? Let's connect.", email: "Email", linkedin: "LinkedIn", github: "GitHub", instagram: "Instagram", whatsapp: "WhatsApp" }
  }
};

function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  
  const t = TEXTS[lang];
  
  const categories = [
    t.projects.all, 
    'Data & AI', 
    'Data Engineering', 
    'Full-Stack & Mobile', 
    'Game Dev'
  ];

  const filteredProjects =
    activeCategory === t.projects.all
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900 font-sans antialiased">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-bold tracking-wider text-white uppercase">
              AFIQ ILHAM AKBAR
            </a>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-xs font-mono bg-zinc-900 text-emerald-400 border border-zinc-800">
              ● {t.hero.status}
            </span>
          </div>

          <nav className="flex items-center gap-5 text-xs sm:text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition">{t.nav.about}</a>
            <a href="#pengalaman" className="hover:text-white transition hidden md:inline">{t.nav.exp}</a>
            <a href="#proyek" className="hover:text-white transition">{t.nav.projects}</a>
            <a href="#sertifikat" className="hover:text-white transition hidden lg:inline">{t.nav.certs}</a>
            <a href="#kegiatan" className="hover:text-white transition hidden xl:inline">{t.nav.activities}</a>
            <a href="#keahlian" className="hover:text-white transition hidden sm:inline">{t.nav.skills}</a>
            
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded p-0.5 font-mono text-xs ml-2">
              <button
                onClick={() => { setLang('id'); setActiveCategory('Semua'); }}
                className={`px-2 py-1 rounded transition ${lang === 'id' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                ID
              </button>
              <button
                onClick={() => { setLang('en'); setActiveCategory('All'); }}
                className={`px-2 py-1 rounded transition ${lang === 'en' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hidden sm:inline-block px-3.5 py-1.5 rounded bg-zinc-100 text-zinc-900 text-xs font-mono uppercase tracking-wider hover:bg-white transition font-semibold"
            >
              {t.nav.contact}
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="border-b border-zinc-800 bg-[#09090b] py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 mb-6">
              <span>{t.hero.location}</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200">{t.hero.degree}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-5xl leading-tight mb-6">
              {t.hero.greeting}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed mb-10">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-16">
              <a
                href="#proyek"
                className="px-5 py-2.5 rounded bg-zinc-100 text-zinc-900 font-medium text-xs font-mono uppercase tracking-wider hover:bg-white transition"
              >
                {t.hero.btnProjects} ↓
              </a>
              <a
                href="#about"
                className="px-5 py-2.5 rounded bg-zinc-900 text-zinc-300 font-medium text-xs font-mono uppercase tracking-wider border border-zinc-800 hover:text-white transition"
              >
                {t.hero.btnAbout}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-800 rounded-xl bg-zinc-900/50 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
              <div className="p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">01 / {t.metrics.m1.label}</div>
                <div className="text-xl font-bold text-white mb-1">{t.metrics.m1.val}</div>
                <div className="text-xs text-zinc-400">{t.metrics.m1.sub}</div>
              </div>
              <div className="p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">02 / {t.metrics.m2.label}</div>
                <div className="text-xl font-bold text-white mb-1">{t.metrics.m2.val}</div>
                <div className="text-xs text-zinc-400">{t.metrics.m2.sub}</div>
              </div>
              <div className="p-6">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">03 / {t.metrics.m3.label}</div>
                <div className="text-xl font-bold text-white mb-1">{t.metrics.m3.val}</div>
                <div className="text-xs text-zinc-400">{t.metrics.m3.sub}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME */}
        <section id="about" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="p-2 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center relative">
                    <img 
                      src="/src/assets/profil.jpeg" 
                      alt="Afiq Ilham Akbar" 
                      className="w-full h-full object-cover absolute inset-0 z-10"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <span className="text-zinc-500 font-mono text-xs z-0">[Afiq Ilham Akbar Photo Space]</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                    {t.about.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {t.about.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {t.about.p1}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t.about.p2}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block mb-1">{t.about.eduLabel}</span>
                    {t.about.degreeFull}
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1">{t.about.instLabel}</span>
                    {t.about.univFull}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORK EXPERIENCE */}
        <section id="pengalaman" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  {t.exp.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {t.exp.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                {t.exp.desc}
              </p>
            </div>

            <div className="space-y-6">
              {EXPERIENCES_DATA.map((exp) => (
                <div
                  key={exp.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-900/30"
                >
                  <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 pb-6 lg:pb-0 lg:pr-6">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-300 rounded mb-3">
                        {exp.period[lang]}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-zinc-300 mt-1">
                        {exp.company}
                      </div>
                      <div className="text-xs font-mono text-zinc-500 mt-1">
                        {exp.type[lang]} • {exp.location[lang]}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <div className="text-xs font-mono text-zinc-500 uppercase mb-2">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-center">
                    <p className="text-sm text-zinc-300 font-medium mb-4 leading-relaxed">
                      {exp.summary[lang]}
                    </p>
                    <ul className="space-y-2.5">
                      {exp.highlights[lang].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          <span className="font-mono text-zinc-600 mt-0.5">[{idx + 1}]</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROJECTS */}
        <section id="proyek" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-zinc-800 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  {t.projects.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {t.projects.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition ${
                      activeCategory === cat
                        ? 'bg-zinc-100 text-zinc-900 font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {project.category}
                      </span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${project.status[lang] === 'In Development' || project.status[lang] === 'Dalam Pengembangan' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-zinc-500'}`}>
                        {project.status[lang]}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                      {project.title}
                    </h3>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="pl-3 border-l border-zinc-700">
                        <span className="text-xs font-mono uppercase text-zinc-500 block mb-0.5">
                          {t.projects.problem}
                        </span>
                        <p className="text-zinc-400 leading-relaxed">{project.problem[lang]}</p>
                      </div>

                      <div className="pl-3 border-l border-zinc-500">
                        <span className="text-xs font-mono uppercase text-zinc-300 block mb-0.5 font-semibold">
                          {t.projects.solution}
                        </span>
                        <p className="text-zinc-300 leading-relaxed">{project.architecture[lang]}</p>
                      </div>

                      <div className="pl-3 border-l border-zinc-600">
                        <span className="text-xs font-mono uppercase text-zinc-400 block mb-0.5">
                          {t.projects.impact}
                        </span>
                        <p className="text-zinc-400 leading-relaxed">{project.outcome[lang]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CERTIFICATES */}
        <section id="sertifikat" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 pb-6 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                {t.certs.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.certs.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {cert.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {cert.date[lang]}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mb-3">
                      Issuer: {cert.issuer} • ID: {cert.credentialId}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {cert.desc[lang]}
                    </p>
                  </div>
                  {cert.verifyUrl && (
                    <div className="mt-6 pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">Credly Badge</span>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-zinc-200 hover:text-white underline"
                      >
                        {t.certs.verify}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6B. STUDENT ACTIVITIES & INVOLVEMENTS */}
        <section id="kegiatan" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                  {t.activities.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {t.activities.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                {t.activities.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACTIVITIES_DATA.map((act) => (
                <div key={act.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {act.type}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">{act.date[lang]}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                      {act.title[lang]}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/50">
                    <span className="text-xs text-zinc-400 block">{act.organizer}</span>
                    <span className="text-[10px] font-mono text-zinc-500 mt-1 block">Level: {act.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SKILLS & EXPERTISE */}
        <section id="keahlian" className="border-b border-zinc-800 bg-[#09090b] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12 pb-6 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                {t.skills.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.skills.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {ENHANCED_SKILL_CATEGORIES.map((group, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <h3 className="text-base font-bold text-white mb-1">{group.domain[lang]}</h3>
                  <p className="text-xs text-zinc-400 mb-4">{group.description[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-zinc-800/80 text-zinc-200 border border-zinc-700 rounded-lg hover:border-zinc-500 transition"
                      >
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="w-4 h-4 object-contain filter brightness-110" 
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Kotak Pendidikan Resmi PDDIKTI */}
            <div className="p-6 sm:p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  {t.skills.eduTitle}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {t.about.degreeFull}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {t.about.univFull} • {t.skills.focus}
                </p>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
                {t.skills.status}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER DENGAN KONTAK ASLI */}
      <footer className="bg-[#09090b] py-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-1">
              {t.footer.title}
            </h2>
            <p className="text-sm text-zinc-400">
              {t.footer.call}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-4 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              {t.footer.email}
            </a>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              {t.footer.linkedin}
            </a>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              {t.footer.github}
            </a>
            <a
              href={PROFILE_DATA.instagram}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              {t.footer.instagram}
            </a>
            <a
              href={`https://wa.me/${PROFILE_DATA.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded bg-emerald-900/30 border border-emerald-800 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 transition"
            >
              {t.footer.whatsapp}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
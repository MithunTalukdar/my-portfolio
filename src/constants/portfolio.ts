import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGlobe,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostman, SiRedux, SiRender, SiTailwindcss, SiVercel } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { MdOutlineCloudDone, MdOutlineDesignServices } from "react-icons/md";
import type { Project, Service, Skill } from "../types/portfolio";

export const profile = {
  name: "Mithun Talukdar",
  role: "AI-Powered Full Stack Developer",
  status: "Available for Opportunities",
  location: "Kolkata, West Bengal, India",
  email: "mithuntalukdar2003@gmail.com",
  phone: "+91 87776 73839",
  github: "https://github.com/MithunTalukdar",
  linkedin: "https://linkedin.com/in/mithun-talukdar",
  bio: "Specializing in building modern, scalable web applications with MERN Stack, Next.js, and AI Integration. Crafting robust REST APIs and high-performance, user-centric interfaces.",
  resume: "/Mithun-Talukdar-Resume.pdf",
};

export const navItems = [
  "Home",
  "About",
  "Education",
  "Skills",
  "Projects",
  "Experience",
  "Services",
  "GitHub",
  "Contact",
];

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: FaEnvelope },
];

export const aboutCards = [
  { label: "Education", value: "Bachelor Degree", detail: "Computer science foundation with software engineering focus." },
  { label: "Skills", value: "MERN Stack", detail: "React, Node, Express, MongoDB, APIs, auth, and deployment." },
  { label: "Experience", value: "Project Ready", detail: "Academic, full-stack, and business website delivery experience." },
  { label: "Career Goals", value: "Product Builder", detail: "Create scalable web products that solve practical business problems." },
];

export const education = {
  degree: "Bachelor Degree in Computer Science",
  institution: "Undergraduate Academic Program",
  period: "2026",
  summary:
    "Focused on practical software development, database-backed applications, modern web architecture, and deployment workflows.",
  coursework: ["Web Development", "Database Management", "Software Engineering", "Computer Networks"],
};

export const skills: Skill[] = [
  { name: "HTML5", level: 95, category: "Frontend" },
  { name: "CSS3", level: 92, category: "Frontend" },
  { name: "JavaScript ES6+", level: 90, category: "Frontend" },
  { name: "React.js", level: 88, category: "Frontend" },
  { name: "Tailwind CSS", level: 86, category: "Frontend" },
  { name: "Redux", level: 78, category: "Frontend" },
  { name: "React Router", level: 84, category: "Frontend" },
  { name: "Node.js", level: 84, category: "Backend" },
  { name: "Express.js", level: 83, category: "Backend" },
  { name: "REST APIs", level: 87, category: "Backend" },
  { name: "JWT Authentication", level: 82, category: "Backend" },
  { name: "Bcrypt", level: 78, category: "Backend" },
  { name: "MongoDB Atlas", level: 84, category: "Database" },
  { name: "Mongoose", level: 82, category: "Database" },
  { name: "Git", level: 86, category: "Tools" },
  { name: "GitHub", level: 86, category: "Tools" },
  { name: "Postman", level: 82, category: "Tools" },
  { name: "VS Code", level: 90, category: "Tools" },
  { name: "Vercel", level: 82, category: "Tools" },
  { name: "Render", level: 78, category: "Tools" },
];

export const skillOrbits = [
  {
    label: "Frontend Orbit",
    category: "Frontend",
    radius: 42,
    duration: 28,
    color: "cyan",
    skills: [
      { name: "React.js", icon: FaReact, detail: "Component-driven interfaces, hooks, routing, state, and production React patterns." },
      { name: "JavaScript", icon: FaJs, detail: "Modern ES6+ logic, async flows, DOM behavior, and application interactions." },
      { name: "HTML5", icon: FaHtml5, detail: "Semantic structure, accessibility-first markup, and clean document foundations." },
      { name: "CSS3", icon: FaCss3Alt, detail: "Responsive layouts, animation, visual systems, and polished interface styling." },
      { name: "Tailwind CSS", icon: SiTailwindcss, detail: "Utility-first design systems, fast iteration, and consistent responsive UI." },
      { name: "Redux", icon: SiRedux, detail: "Predictable state management for complex React application workflows." },
    ],
  },
  {
    label: "Backend Orbit",
    category: "Backend",
    radius: 32,
    duration: 34,
    color: "violet",
    skills: [
      { name: "Node.js", icon: FaNodeJs, detail: "Server-side JavaScript runtimes for scalable API and business logic." },
      { name: "Express.js", icon: SiExpress, detail: "Modular REST APIs, middleware, protected routes, and clean controllers." },
      { name: "REST API", icon: FaGlobe, detail: "Resource-oriented API design with reliable request and response flows." },
      { name: "JWT Authentication", icon: FaReact, detail: "Token-based authentication, authorization, and protected application areas." },
      { name: "Bcrypt", icon: SiMongodb, detail: "Secure password hashing and account credential protection." },
    ],
  },
  {
    label: "Database Orbit",
    category: "Database",
    radius: 24,
    duration: 38,
    color: "emerald",
    skills: [
      { name: "MongoDB", icon: SiMongodb, detail: "Document database design, collections, aggregation pipelines, and Atlas clusters." },
      { name: "Mongoose", icon: SiMongodb, detail: "Schema validation, business models, indexing, and transactional integrity." },
      { name: "MongoDB Atlas", icon: SiMongodb, detail: "Cloud-hosted database clusters, automated backups, and global scalability." },
    ],
  },
  {
    label: "Tools Orbit",
    category: "Tools",
    radius: 50,
    duration: 42,
    color: "amber",
    skills: [
      { name: "Git", icon: FaGitAlt, detail: "Version control workflows, branching, review-friendly commits, and collaboration." },
      { name: "GitHub", icon: FaGithub, detail: "Repository management, project hosting, collaboration, and portfolio proof." },
      { name: "VS Code", icon: VscCode, detail: "Efficient development environment with extensions and debugging workflows." },
      { name: "Postman", icon: SiPostman, detail: "API testing, request collections, auth checks, and integration validation." },
      { name: "Vercel", icon: SiVercel, detail: "Frontend deployment, previews, and optimized production hosting." },
      { name: "Render", icon: SiRender, detail: "Backend service hosting, environment configuration, and full-stack deployment." },
    ],
  },
] as const;

export const techWall = [
  { name: "React.js", icon: FaReact, accent: "from-cyan-300 to-sky-500" },
  { name: "Node.js", icon: FaNodeJs, accent: "from-emerald-300 to-lime-500" },
  { name: "MongoDB", icon: SiMongodb, accent: "from-green-300 to-emerald-600" },
  { name: "Express.js", icon: SiExpress, accent: "from-slate-200 to-slate-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, accent: "from-cyan-200 to-teal-500" },
  { name: "GitHub", icon: FaGithub, accent: "from-fuchsia-300 to-violet-600" },
];

export const projects: Project[] = [
  {
    title: "Learning Management System (LMS)",
    slug: "lms",
    description:
      "A full-stack academic platform built using MERN Stack that enables students, instructors, and administrators to manage courses, track real-time learning progress, attempt quizzes, and issue verified completion certificates.",
    features: [
      "Role-Based Authentication (JWT)",
      "Course Curriculum Management",
      "Interactive Quiz Engine",
      "Real-Time Progress Tracking",
      "Automated Certificate Generation",
      "Admin Analytics Dashboard",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS"],
    categories: ["Full Stack"],
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    liveUrl: "https://lms-pi-six-31.vercel.app",
    repoUrl: "https://github.com/MithunTalukdar/LMS",
  },
  {
    title: "Lumina E-Commerce Shopping Platform",
    slug: "lumina",
    description:
      "A modern, full-featured online storefront with rapid product discovery, interactive category filters, real-time cart state management, checkout flows, and responsive mobile-first UI.",
    features: [
      "Dynamic Product Catalog",
      "Cart & State Persistence",
      "Instant Search & Category Filters",
      "Seamless Checkout Flow",
      "Mobile-Optimized Experience",
    ],
    tech: ["TypeScript", "React.js", "Tailwind CSS", "REST APIs", "Vite"],
    categories: ["Full Stack", "E-Commerce"],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    liveUrl: "https://lumina-shoping.vercel.app",
    repoUrl: "https://github.com/MithunTalukdar/lumina-shoping",
  },
  {
    title: "Course Learning Web Platform",
    slug: "course",
    description:
      "An interactive educational platform designed for seamless video course consumption, structured module navigation, progress indicators, and intuitive student dashboards.",
    features: [
      "Course Module Directory",
      "Video Player Integration",
      "Curriculum Outlines",
      "Responsive Learning View",
      "Student Dashboard UI",
    ],
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "Vercel"],
    categories: ["Frontend"],
    gradient: "from-purple-500 via-violet-600 to-pink-600",
    liveUrl: "https://course-pi-navy.vercel.app/",
    repoUrl: "https://github.com/MithunTalukdar/course",
  },
  {
    title: "User Management & Auth System",
    slug: "user-auth",
    description:
      "A production-ready full-stack authentication and user profile management system with JWT sessions, encrypted password hashing via Bcrypt, and complete CRUD user controls.",
    features: [
      "Secure JWT Token Auth",
      "Bcrypt Password Encryption",
      "Protected Route Guards",
      "User Profile CRUD",
      "RESTful API Architecture",
    ],
    tech: ["TypeScript", "React.js", "Node.js", "Express.js", "MongoDB Atlas"],
    categories: ["Full Stack", "Business"],
    gradient: "from-blue-500 via-indigo-600 to-purple-700",
    liveUrl: "https://user-iota-ashy.vercel.app",
    repoUrl: "https://github.com/MithunTalukdar/User",
  },
  {
    title: "Swastik International Corporate Portal",
    slug: "swastik",
    description:
      "A premier business website designed for an international trade and consulting enterprise, featuring modern aesthetic layouts, company profile sections, and high-conversion client inquiry channels.",
    features: [
      "Company Profile Presentation",
      "Global Services Showcase",
      "Lead Capture & Contact Forms",
      "High-Performance Responsive Layout",
      "SEO & Accessibility Optimized",
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript ES6+", "Vercel"],
    categories: ["Frontend", "Business"],
    gradient: "from-amber-500 via-rose-600 to-purple-700",
    liveUrl: "https://swastik-international.vercel.app",
    repoUrl: "https://github.com/MithunTalukdar/Swastik-International",
  },
  {
    title: "HomePro Service Management",
    slug: "homepro",
    description:
      "A comprehensive full-stack service booking and technician management platform built with modern TypeScript and React for on-demand home maintenance requests.",
    features: [
      "On-Demand Service Catalog",
      "Service Booking Management",
      "Technician Dispatch & Tracking",
      "Role-Based Access Control",
    ],
    tech: ["TypeScript", "React.js", "Node.js", "Express.js", "MongoDB"],
    categories: ["Full Stack", "Business"],
    gradient: "from-cyan-500 via-teal-600 to-emerald-700",
    liveUrl: "https://github.com/MithunTalukdar/HomePro",
    repoUrl: "https://github.com/MithunTalukdar/HomePro",
  },
];

export const experience = [
  {
    title: "MERN Stack Development",
    detail: "Building end-to-end production web applications using MongoDB, Express.js, React.js, and Node.js.",
  },
  {
    title: "Frontend Engineering",
    detail: "Crafting highly responsive, accessible, and dynamic user interfaces using React, TypeScript, and Tailwind CSS.",
  },
  {
    title: "Backend API Architecture",
    detail: "Designing modular RESTful APIs, implementing JWT authentication, middleware pipelines, and Bcrypt security.",
  },
  {
    title: "Database Modeling",
    detail: "Structuring schema architectures, relationships, indexing, and Atlas cloud clusters in MongoDB.",
  },
  {
    title: "Production Deployment",
    detail: "Deploying and managing frontend client apps on Vercel and scalable backend services on Render.",
  },
];

export const services: Service[] = [
  {
    title: "Full Stack Web Development",
    description:
      "End-to-end custom web applications built with high scalability, type-safe code, and optimal performance.",
    icon: FaReact,
  },
  {
    title: "Responsive Frontend Design",
    description:
      "Clean, modern, and high-conversion UI/UX interfaces that render flawlessly on mobile, tablet, and desktop screens.",
    icon: MdOutlineDesignServices,
  },
  {
    title: "MERN Stack Applications",
    description:
      "Complete full-stack database-backed platforms utilizing MongoDB, Express.js, React.js, and Node.js.",
    icon: SiMongodb,
  },
  {
    title: "REST API Development",
    description:
      "Secure, scalable, and modular RESTful APIs with token-based JWT authentication and validation layers.",
    icon: FaGlobe,
  },
  {
    title: "Database Architecture",
    description:
      "Efficient schema modeling, indexing strategies, and database cluster management with MongoDB Atlas.",
    icon: SiMongodb,
  },
  {
    title: "Cloud Deployment & DevOps",
    description:
      "Continuous deployment workflows, domain routing, and production infrastructure management on Vercel and Render.",
    icon: MdOutlineCloudDone,
  },
];

export const achievements = [
  { value: 12, suffix: "+", label: "Projects Completed" },
  { value: 9, suffix: "", label: "Public Repositories" },
  { value: 20, suffix: "+", label: "Technologies Mastered" },
  { value: 1200, suffix: "+", label: "Hours of Coding" },
];

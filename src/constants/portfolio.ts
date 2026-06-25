import {
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaRocket,
  FaServer,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostman, SiRedux, SiRender, SiTailwindcss, SiVercel } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineCloudDone, MdOutlineDesignServices } from "react-icons/md";
import type { Project, Service, Skill } from "../types/portfolio";

export const profile = {
  name: "Mithun Talukdar",
  title: "Full Stack Web Developer | MERN Stack Developer",
  email: "mithuntalukdar2003@gmail.com",
  phone: "+91 8777673839",
  github: "https://github.com/MithunTalukdar",
  linkedin: "https://linkedin.com/in/mithun-talukdar",
  resume: "/Mithun-Talukdar-Resume.pdf",
  tagline: "Building Modern, Scalable and User-Centric Web Applications.",
  location: "India",
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
      { name: "REST API", icon: FaServer, detail: "Resource-oriented API design with reliable request and response flows." },
      { name: "JWT Authentication", icon: FaCode, detail: "Token-based authentication, authorization, and protected application areas." },
      { name: "Bcrypt", icon: FaDatabase, detail: "Secure password hashing and account credential protection." },
    ],
  },
  {
    label: "Database Orbit",
    category: "Database",
    radius: 23,
    duration: 24,
    color: "emerald",
    skills: [
      { name: "MongoDB", icon: SiMongodb, detail: "Document database modeling for flexible, application-friendly data." },
      { name: "Mongoose", icon: SiMongodb, detail: "Schemas, validation, relationships, and maintainable MongoDB access patterns." },
      { name: "MongoDB Atlas", icon: SiMongodb, detail: "Cloud database hosting, connection management, and deployment-ready storage." },
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
      "A full-stack academic management platform built using MERN Stack that enables students, teachers, and administrators to manage courses, quizzes, assignments, progress tracking, and certificates.",
    features: [
      "Authentication System",
      "Course Management",
      "Quiz System",
      "Progress Tracking",
      "Certificate Generation",
      "Admin Dashboard",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    categories: ["Full Stack"],
    gradient: "from-cyan-400 via-violet-500 to-fuchsia-500",
    liveUrl: "#",
    repoUrl: "https://github.com/MithunTalukdar",
  },
  {
    title: "Lumina E-Commerce Website",
    slug: "lumina",
    description:
      "A modern shopping platform featuring responsive UI, product browsing, cart management, authentication, and secure checkout flow.",
    features: ["Responsive storefront", "Product browsing", "Cart management", "Authentication", "Checkout flow"],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    categories: ["Full Stack", "E-Commerce"],
    gradient: "from-emerald-300 via-sky-400 to-indigo-500",
    liveUrl: "#",
    repoUrl: "https://github.com/MithunTalukdar",
  },
  {
    title: "Swastik International Website",
    slug: "swastik",
    description:
      "A professional business website designed with modern UI, responsive layouts, company profile pages, and service showcases.",
    features: ["Company profile pages", "Service showcases", "Responsive layouts", "Modern UI", "Conversion-ready contact areas"],
    tech: ["React.js", "Tailwind CSS", "Responsive Design"],
    categories: ["Frontend", "Business"],
    gradient: "from-amber-300 via-rose-400 to-violet-500",
    liveUrl: "#",
    repoUrl: "https://github.com/MithunTalukdar",
  },
];

export const experience = [
  { title: "MERN Stack Development", detail: "Building full-stack applications with React, Express, MongoDB, authentication, dashboards, and APIs." },
  { title: "Frontend Development", detail: "Designing responsive, accessible interfaces with React, Tailwind CSS, animations, and reusable components." },
  { title: "Backend API Development", detail: "Creating clean REST APIs, protected routes, validation flows, and reliable server-side architecture." },
  { title: "Database Design", detail: "Modeling MongoDB collections with Mongoose schemas, references, indexes, and scalable data flows." },
  { title: "Deployment & Hosting", detail: "Deploying modern web apps on Vercel, Render, and MongoDB Atlas with production environment management." },
];

export const services: Service[] = [
  { title: "Full Stack Web Development", description: "End-to-end MERN applications from database schema to polished frontend.", icon: FaCode },
  { title: "Responsive Website Design", description: "Fast, accessible websites that feel refined across mobile, tablet, and desktop.", icon: HiOutlineDevicePhoneMobile },
  { title: "MERN Stack Applications", description: "Dashboards, portals, commerce flows, LMS tools, and business platforms.", icon: FaNodeJs },
  { title: "REST API Development", description: "Secure APIs with auth, validation, modular routing, and maintainable controllers.", icon: FaServer },
  { title: "Database Design", description: "MongoDB data models optimized for real application workflows.", icon: FaDatabase },
  { title: "Website Deployment", description: "Production deployments, environment setup, performance passes, and launch support.", icon: MdOutlineCloudDone },
];

export const achievements = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "GitHub Repositories", value: 18, suffix: "+" },
  { label: "Technologies Learned", value: 24, suffix: "+" },
  { label: "Hours of Coding", value: 1200, suffix: "+" },
];

export const expertiseIcons = [FaRocket, MdOutlineDesignServices, FaServer, FaDatabase];

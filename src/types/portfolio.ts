import type { IconType } from "react-icons";

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools";
export type ProjectCategory = "Full Stack" | "Frontend" | "Business" | "E-Commerce";

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  features: string[];
  tech: string[];
  categories: ProjectCategory[];
  gradient: string;
  liveUrl: string;
  repoUrl: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconType;
}

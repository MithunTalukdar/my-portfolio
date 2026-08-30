import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiServer,
  FiTool,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import { FaCode, FaCss3Alt, FaDatabase, FaGitAlt, FaGithub, FaHtml5, FaJs, FaNodeJs, FaReact, FaServer } from "react-icons/fa";
import { SiExpress, SiMongodb, SiPostman, SiRedux, SiRender, SiTailwindcss, SiVercel } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { AtomicSkills } from "../components/AtomicSkills";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { skills } from "../constants/portfolio";
import type { Skill } from "../types/portfolio";

const skillCategories = [
  { id: "All", label: "All Skills", icon: FiZap },
  { id: "Frontend", label: "Frontend", icon: FiLayers },
  { id: "Backend", label: "Backend", icon: FiServer },
  { id: "Database", label: "Database", icon: FiDatabase },
  { id: "Tools", label: "Tools & Cloud", icon: FiTool },
];

const skillIconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "HTML5": FaHtml5,
  "CSS3": FaCss3Alt,
  "JavaScript ES6+": FaJs,
  "React.js": FaReact,
  "Tailwind CSS": SiTailwindcss,
  "Redux": SiRedux,
  "React Router": FaReact,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  "REST APIs": FaServer,
  "JWT Authentication": FaCode,
  "Bcrypt": FaDatabase,
  "MongoDB Atlas": SiMongodb,
  "Mongoose": SiMongodb,
  "Git": FaGitAlt,
  "GitHub": FaGithub,
  "Postman": SiPostman,
  "VS Code": VscCode,
  "Vercel": SiVercel,
  "Render": SiRender,
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSkill, setActiveSkill] = useState<string>("React.js");

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technology Ecosystem"
          title="Interactive Skills Universe"
          description="A production-ready technology stack spanning modern frontend UI, scalable backend architecture, databases, and deployment pipelines."
        />

        {/* 3D Atomic Interactive Galaxy */}
        <div className="mb-14">
          <AtomicSkills />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? "border border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "border border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon className={isSelected ? "text-cyan-400" : "text-slate-400"} />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = skillIconsMap[skill.name] || FiCode;
              const isHighlighted = activeSkill === skill.name;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                    isHighlighted
                      ? "border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-slate-900/90 to-blue-600/20 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                      : "border-white/10 bg-slate-900/60 hover:border-cyan-400/50 hover:bg-slate-800/60 shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
                  }`}
                  whileHover={{ y: -6, scale: 1.03 }}
                  onMouseEnter={() => setActiveSkill(skill.name)}
                >
                  {/* Glowing corner flare */}
                  <div className="pointer-events-none absolute -right-6 -top-6 size-16 rounded-full bg-cyan-400/10 blur-xl group-hover:bg-cyan-400/25 transition-all" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-white/10 text-cyan-300 text-xl group-hover:scale-110 group-hover:text-cyan-200 transition-transform">
                      <Icon />
                    </div>
                    <span className="text-xs font-black text-cyan-300/80">{skill.level}%</span>
                  </div>

                  <h3 className="mt-3 text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {skill.category}
                  </span>

                  {/* Level progress bar */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_#38bdf8]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.04 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

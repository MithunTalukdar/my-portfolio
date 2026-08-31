import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiServer,
  FiTool,
  FiZap,
  FiSearch,
  FiX,
  FiSliders,
  FiCheckCircle,
  FiArrowUpRight,
  FiActivity,
  FiCompass,
} from "react-icons/fi";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaServer,
  FaCode,
  FaDatabase as FaDb,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiPostman,
  SiRedux,
  SiRender,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { AtomicSkills } from "../components/AtomicSkills";
import { SectionHeader } from "../components/SectionHeader";
import { SkillDetailModal } from "../components/SkillDetailModal";
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
  "Bcrypt": FaDb,
  "MongoDB Atlas": SiMongodb,
  "Mongoose": SiMongodb,
  "Git": FaGitAlt,
  "GitHub": FaGithub,
  "Postman": SiPostman,
  "VS Code": VscCode,
  "Vercel": SiVercel,
  "Render": SiRender,
};

type SortMode = "proficiency" | "alphabetical" | "default";

// Single Interactive Spotlight Card Component
function SkillCard({
  skill,
  index,
  isHovered,
  isSynergyActive,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  skill: Skill;
  index: number;
  isHovered: boolean;
  isSynergyActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const Icon = skillIconsMap[skill.name] || FiCode;
  const brandColor = skill.brandColor || "#38bdf8";
  const glowColor = skill.glowColor || "rgba(56, 189, 248, 0.4)";
  const levelTier = skill.levelTier || (skill.level >= 90 ? "Master" : skill.level >= 80 ? "Advanced" : "Proficient");

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.3) }}
      onMouseEnter={() => {
        setIsMouseOver(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
        onHoverEnd();
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 backdrop-blur-xl cursor-pointer transition-all duration-300 overflow-hidden ${
        isHovered
          ? "border-cyan-400/80 bg-slate-900/90 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          : isSynergyActive
          ? "border-amber-400/70 bg-amber-950/20 shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          : "border-white/10 bg-slate-900/60 hover:border-white/25 hover:bg-slate-900/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      }`}
      style={{
        borderColor: isHovered ? brandColor : isSynergyActive ? "#fbbf24" : undefined,
        boxShadow: isHovered
          ? `0 0 35px -5px ${glowColor}, 0 20px 40px rgba(0,0,0,0.7)`
          : isSynergyActive
          ? "0 0 25px rgba(251, 191, 36, 0.3)"
          : undefined,
      }}
    >
      {/* Interactive Mouse Tracking Spotlight Glass Highlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(320px circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor.replace("0.45", "0.22")}, transparent 70%)`,
        }}
      />

      {/* Ambient Corner Flare */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-2xl opacity-15 group-hover:opacity-35 transition-opacity"
        style={{ backgroundColor: brandColor }}
      />

      {/* Card Content Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          {/* Tech Brand Icon */}
          <div
            className="flex size-11 items-center justify-center rounded-xl border bg-slate-950/80 text-2xl transition-all duration-300 shadow-md group-hover:scale-110"
            style={{
              borderColor: `${brandColor}50`,
              color: brandColor,
              boxShadow: isMouseOver ? `0 0 16px ${glowColor}` : "none",
            }}
          >
            <Icon />
          </div>

          {/* Level & Tier Badge */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: brandColor }}
              />
              <span className="font-mono text-xs font-bold text-white">
                {skill.level}%
              </span>
            </div>
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
              style={{ color: brandColor }}
            >
              {levelTier}
            </span>
          </div>
        </div>

        {/* Title and Category */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center gap-1">
              <span>{skill.name}</span>
            </h3>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-300 text-xs">
              <FiArrowUpRight />
            </span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            {skill.category}
          </p>
        </div>

        {/* Key Concepts Chips */}
        {skill.keyConcepts && skill.keyConcepts.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {skill.keyConcepts.slice(0, 2).map((concept, i) => (
              <span
                key={i}
                className="rounded-md bg-white/[0.04] border border-white/5 px-1.5 py-0.5 text-[10px] text-slate-300 truncate max-w-[120px]"
              >
                {concept}
              </span>
            ))}
            {skill.keyConcepts.length > 2 && (
              <span className="rounded-md bg-white/[0.02] px-1 py-0.5 text-[10px] text-slate-400">
                +{skill.keyConcepts.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Synergy Alert Ribbon if Active */}
      {isSynergyActive && !isHovered && (
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-300">
          <FiZap className="text-amber-400" />
          <span>Ecosystem Synergy</span>
        </div>
      )}

      {/* Card Bottom: Animated Cyber Progress Bar */}
      <div className="mt-4 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
          <span>Proficiency</span>
          <span className="text-cyan-300 group-hover:text-cyan-200 group-hover:underline flex items-center gap-0.5">
            Inspect details →
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              backgroundColor: brandColor,
              boxShadow: `0 0 10px ${brandColor}`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: Math.min(index * 0.03, 0.35) }}
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortMode>("default");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [inspectModalSkill, setInspectModalSkill] = useState<Skill | null>(null);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skillCategories.forEach((cat) => {
      if (cat.id !== "All") {
        counts[cat.id] = skills.filter((s) => s.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted skills
  const processedSkills = useMemo(() => {
    let result = skills.filter((s) => {
      const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tagline && s.tagline.toLowerCase().includes(q)) ||
        (s.keyConcepts && s.keyConcepts.some((c) => c.toLowerCase().includes(q))) ||
        (s.projectsUsed && s.projectsUsed.some((p) => p.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "proficiency") {
      result = [...result].sort((a, b) => b.level - a.level);
    } else if (sortBy === "alphabetical") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Set of skills that have synergy with currently hovered skill
  const synergySkillNames = useMemo(() => {
    if (!hoveredSkill || !hoveredSkill.synergyWith) return new Set<string>();
    return new Set<string>(hoveredSkill.synergyWith);
  }, [hoveredSkill]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background ambient neon lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 size-[600px] rounded-full bg-blue-600/5 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Technology Ecosystem"
          title="Interactive Skills Universe"
          description="A production-ready technology stack spanning modern frontend UI, scalable backend architecture, databases, and deployment pipelines."
        />

        {/* 3D Atomic Interactive Galaxy */}
        <div className="mb-14">
          <AtomicSkills />
        </div>

        {/* Quick Tech Stack Overview Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 p-4 sm:p-6 backdrop-blur-2xl shadow-xl"
        >
          <div className="flex items-center gap-3 border-r border-white/5 pr-2">
            <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-lg sm:text-xl">
              <FiZap />
            </div>
            <div>
              <span className="block text-lg sm:text-2xl font-black text-white">20+</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Core Technologies</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-r border-white/5 pr-2">
            <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-lg sm:text-xl">
              <FiCheckCircle />
            </div>
            <div>
              <span className="block text-lg sm:text-2xl font-black text-white">100%</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Production Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-r border-white/5 pr-2">
            <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-300 text-lg sm:text-xl">
              <FiLayers />
            </div>
            <div>
              <span className="block text-lg sm:text-2xl font-black text-white">MERN</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Architecture Core</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-lg sm:text-xl">
              <FiActivity />
            </div>
            <div>
              <span className="block text-lg sm:text-2xl font-black text-white">15+</span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Active Code Repos</span>
            </div>
          </div>
        </motion.div>

        {/* Filter, Search & Sort Control Deck */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Filter Tabs with Counters */}
            <div className="flex flex-wrap items-center gap-2">
              {skillCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border border-cyan-400 bg-gradient-to-r from-cyan-500/25 to-blue-600/25 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        : "border border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white hover:bg-slate-800/60"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Icon className={isSelected ? "text-cyan-400" : "text-slate-400"} />
                    <span>{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected
                          ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Search Input & Sort Controls */}
            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tech e.g. React, JWT, Mongo..."
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortMode)}
                  aria-label="Sort skills"
                  className="rounded-xl border border-white/10 bg-slate-900/80 py-2 pl-3 pr-7 text-xs font-semibold text-slate-300 focus:border-cyan-400 focus:outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="default" className="bg-slate-900 text-white">Default Stack</option>
                  <option value="proficiency" className="bg-slate-900 text-white">Highest Mastery</option>
                  <option value="alphabetical" className="bg-slate-900 text-white">Alphabetical (A-Z)</option>
                </select>
                <FiSliders className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              </div>
            </div>
          </div>

          {/* Active search or synergy indicator */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-slate-300 bg-cyan-950/40 border border-cyan-500/20 rounded-xl px-3 py-1.5 backdrop-blur-md"
            >
              <FiCompass className="text-cyan-400" />
              <span>
                Inspecting <strong className="text-cyan-300">{hoveredSkill.name}</strong>
                {hoveredSkill.synergyWith && hoveredSkill.synergyWith.length > 0 && (
                  <> • Synergies highlighted in gold</>
                )}
              </span>
            </motion.div>
          )}
        </div>

        {/* Dynamic Skill Cards Grid */}
        {processedSkills.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-xl">
            <FiSearch className="mx-auto text-3xl text-slate-500 mb-3" />
            <h4 className="text-base font-bold text-white">No technologies found</h4>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {processedSkills.map((skill, index) => {
                const isHovered = hoveredSkill?.name === skill.name;
                const isSynergyActive = synergySkillNames.has(skill.name);

                return (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isHovered={isHovered}
                    isSynergyActive={isSynergyActive}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => {
                      if (hoveredSkill?.name === skill.name) {
                        setHoveredSkill(null);
                      }
                    }}
                    onClick={() => setInspectModalSkill(skill)}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Tech Deep Dive Inspector Modal */}
      <SkillDetailModal
        skill={inspectModalSkill}
        iconComponent={inspectModalSkill ? skillIconsMap[inspectModalSkill.name] : undefined}
        onClose={() => setInspectModalSkill(null)}
      />
    </section>
  );
}


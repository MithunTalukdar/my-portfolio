import { useState, useMemo } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiCheckCircle, FiInfo, FiZap } from "react-icons/fi";
import { skillOrbits } from "../constants/portfolio";
import { AtomicNucleus } from "./AtomicNucleus";

type OrbitSkill = (typeof skillOrbits)[number]["skills"][number] & {
  category: string;
  orbit: string;
};

// Branded color theme for each technology icon & planet
const techBrandColors: Record<string, { color: string; glow: string; border: string; bg: string }> = {
  "React.js": { color: "#00d8ff", glow: "rgba(0, 216, 255, 0.4)", border: "rgba(0, 216, 255, 0.6)", bg: "rgba(0, 216, 255, 0.12)" },
  "JavaScript": { color: "#f7df1e", glow: "rgba(247, 223, 30, 0.4)", border: "rgba(247, 223, 30, 0.6)", bg: "rgba(247, 223, 30, 0.12)" },
  "HTML5": { color: "#e34f26", glow: "rgba(227, 79, 38, 0.4)", border: "rgba(227, 79, 38, 0.6)", bg: "rgba(227, 79, 38, 0.12)" },
  "CSS3": { color: "#264de4", glow: "rgba(38, 77, 228, 0.4)", border: "rgba(38, 77, 228, 0.6)", bg: "rgba(38, 77, 228, 0.12)" },
  "Tailwind CSS": { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", border: "rgba(56, 189, 248, 0.6)", bg: "rgba(56, 189, 248, 0.12)" },
  "Redux": { color: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", border: "rgba(168, 85, 247, 0.6)", bg: "rgba(168, 85, 247, 0.12)" },
  "Node.js": { color: "#22c55e", glow: "rgba(34, 197, 94, 0.4)", border: "rgba(34, 197, 94, 0.6)", bg: "rgba(34, 197, 94, 0.12)" },
  "Express.js": { color: "#f8fafc", glow: "rgba(255, 255, 255, 0.35)", border: "rgba(255, 255, 255, 0.5)", bg: "rgba(255, 255, 255, 0.1)" },
  "REST API": { color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)", border: "rgba(59, 130, 246, 0.6)", bg: "rgba(59, 130, 246, 0.12)" },
  "JWT Authentication": { color: "#ec4899", glow: "rgba(236, 72, 153, 0.4)", border: "rgba(236, 72, 153, 0.6)", bg: "rgba(236, 72, 153, 0.12)" },
  "Bcrypt": { color: "#c084fc", glow: "rgba(192, 132, 252, 0.4)", border: "rgba(192, 132, 252, 0.6)", bg: "rgba(192, 132, 252, 0.12)" },
  "MongoDB": { color: "#10b981", glow: "rgba(16, 185, 129, 0.45)", border: "rgba(16, 185, 129, 0.65)", bg: "rgba(16, 185, 129, 0.14)" },
  "Mongoose": { color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)", border: "rgba(239, 68, 68, 0.6)", bg: "rgba(239, 68, 68, 0.12)" },
  "MongoDB Atlas": { color: "#10b981", glow: "rgba(16, 185, 129, 0.45)", border: "rgba(16, 185, 129, 0.65)", bg: "rgba(16, 185, 129, 0.14)" },
  "Git": { color: "#f97316", glow: "rgba(249, 115, 22, 0.4)", border: "rgba(249, 115, 22, 0.6)", bg: "rgba(249, 115, 22, 0.12)" },
  "GitHub": { color: "#c084fc", glow: "rgba(192, 132, 252, 0.4)", border: "rgba(192, 132, 252, 0.6)", bg: "rgba(192, 132, 252, 0.12)" },
  "VS Code": { color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", border: "rgba(56, 189, 248, 0.6)", bg: "rgba(56, 189, 248, 0.12)" },
  "Postman": { color: "#fb923c", glow: "rgba(251, 146, 60, 0.4)", border: "rgba(251, 146, 60, 0.6)", bg: "rgba(251, 146, 60, 0.12)" },
  "Vercel": { color: "#ffffff", glow: "rgba(255, 255, 255, 0.4)", border: "rgba(255, 255, 255, 0.6)", bg: "rgba(255, 255, 255, 0.12)" },
  "Render": { color: "#46e3b7", glow: "rgba(70, 227, 183, 0.4)", border: "rgba(70, 227, 183, 0.6)", bg: "rgba(70, 227, 183, 0.12)" },
};

export function AtomicSkills() {
  const [coreHovered, setCoreHovered] = useState(false);
  const [selected, setSelected] = useState<OrbitSkill | null>(null);
  const [mobileFilter, setMobileFilter] = useState<string>("All");

  // Flatten all skills for mobile display
  const allSkills = useMemo(() => {
    return skillOrbits.flatMap((orbit) =>
      orbit.skills.map((s) => ({ ...s, category: orbit.category, orbit: orbit.label }))
    );
  }, []);

  const visibleMobileSkills = useMemo(() => {
    if (mobileFilter === "All") return allSkills;
    return allSkills.filter((s) => s.category === mobileFilter);
  }, [allSkills, mobileFilter]);

  return (
    <>
      {/* DESKTOP VIEW: Full 3D Cosmic Planetary Orbit Galaxy (>= 768px) */}
      <div className="hidden md:block atomic-wrap">
        {/* Background drift particles */}
        <div className="atomic-particles">
          {Array.from({ length: 34 }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--i": index,
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 19) % 100}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Ambient 3D field trails */}
        <div className="atomic-field-trails" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} style={{ "--trail": index } as CSSProperties} />
          ))}
        </div>

        {/* Central 3D MT Logo Core */}
        <div className="atomic-core-anchor">
          <motion.div
            animate={{ scale: coreHovered ? 1.05 : 1 }}
            className={`atomic-core ${coreHovered ? "is-active" : ""}`}
            onHoverEnd={() => setCoreHovered(false)}
            onHoverStart={() => setCoreHovered(true)}
            transition={{ damping: 22, stiffness: 220, type: "spring" }}
          >
            <div className="atomic-core-glow" />
            <AtomicNucleus active={coreHovered} onActiveChange={setCoreHovered} />
          </motion.div>
        </div>

        {/* 3D Planetary Orbit Rings with Colorful Brand Badges */}
        {skillOrbits.map((orbit) => (
          <div
            key={orbit.label}
            className={`orbit-ring orbit-${orbit.color}`}
            style={{ width: `${orbit.radius}rem`, height: `${orbit.radius}rem` }}
          >
            <div
              className="orbit-track"
              style={{
                animationDuration: `${orbit.duration}s`,
              }}
            >
              {orbit.skills.map((skill, index) => {
                const Icon = skill.icon;
                const angle = (360 / orbit.skills.length) * index;
                const brand = techBrandColors[skill.name] || {
                  color: "#38bdf8",
                  glow: "rgba(34, 211, 238, 0.4)",
                  border: "rgba(34, 211, 238, 0.5)",
                  bg: "rgba(34, 211, 238, 0.1)",
                };

                return (
                  <button
                    key={skill.name}
                    type="button"
                    className="skill-planet group"
                    style={
                      {
                        "--angle": `${angle}deg`,
                        "--radius": `${orbit.radius / 2}rem`,
                        borderColor: brand.border,
                        boxShadow: `0 0 24px ${brand.glow}`,
                      } as CSSProperties
                    }
                    onClick={() => setSelected({ ...skill, category: orbit.category, orbit: orbit.label })}
                    aria-label={`Open ${skill.name} skill details`}
                  >
                    {/* Colorful Brand Icon */}
                    <span style={{ color: brand.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon />
                    </span>

                    {/* Planet Text Label */}
                    <span>{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Selected Skill Information Card */}
        <AnimatePresence>
          {selected ? (
            <motion.div
              className="skill-info-card"
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.96 }}
            >
              <button
                type="button"
                className="skill-info-close"
                onClick={() => setSelected(null)}
                aria-label="Close skill details"
              >
                <FiX />
              </button>
              <p>{selected.orbit}</p>
              <h3>{selected.name}</h3>
              <span>{selected.category}</span>
              <strong>{selected.detail}</strong>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* MOBILE VIEW: Clean, Spacious, 100% Readable 3D Skills Matrix (< 768px) */}
      <div className="block md:hidden relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#070b18]/95 via-[#0a0f24]/90 to-[#040714]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* Top 3D Centered MT Logo Stage */}
        <div className="relative mx-auto mb-5 size-40 sm:size-48 overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#040714]/85 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
          <AtomicNucleus active={true} onActiveChange={() => {}} />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4">
          {["All", "Frontend", "Backend", "Database", "Tools"].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setMobileFilter(category)}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                mobileFilter === category
                  ? "border border-cyan-400 bg-cyan-500/25 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 2-Column Spacious 3D Skills Grid */}
        <div className="grid grid-cols-2 gap-3">
          {visibleMobileSkills.map((skill) => {
            const Icon = skill.icon;
            const brand = techBrandColors[skill.name] || {
              color: "#38bdf8",
              glow: "rgba(34, 211, 238, 0.4)",
              border: "rgba(34, 211, 238, 0.5)",
              bg: "rgba(34, 211, 238, 0.1)",
            };

            return (
              <motion.button
                key={skill.name}
                type="button"
                onClick={() => setSelected(skill)}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-start justify-between p-3.5 rounded-2xl border bg-slate-900/85 text-left transition-all backdrop-blur-md shadow-md"
                style={{
                  borderColor: brand.border,
                  boxShadow: `0 0 16px ${brand.glow}`,
                }}
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <span style={{ color: brand.color }} className="text-2xl">
                    <Icon />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                    {skill.category}
                  </span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white block leading-tight">{skill.name}</span>
                  <span className="text-[10px] text-cyan-300 font-semibold block mt-1">Tap for details →</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Skill Information Popup */}
        <AnimatePresence>
          {selected ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-5 p-4 rounded-2xl border border-cyan-400/50 bg-cyan-950/95 backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest">{selected.orbit}</span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  <FiX />
                </button>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white mt-1">{selected.name}</h4>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed">{selected.detail}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

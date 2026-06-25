import { useState } from "react";
import { motion } from "framer-motion";
import { FiCloud, FiCpu, FiDatabase, FiGitBranch, FiLayers, FiServer } from "react-icons/fi";
import { AtomicSkills } from "../components/AtomicSkills";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { TechWall } from "../components/TechWall";
import { skills } from "../constants/portfolio";

const spotlightSkills = skills.filter((skill) => ["React.js", "Node.js", "MongoDB Atlas", "JavaScript ES6+", "Tailwind CSS"].includes(skill.name));
const skillReactionModes = [
  { label: "Frontend", icon: FiLayers, detail: "UI systems, React, Tailwind" },
  { label: "Backend", icon: FiServer, detail: "APIs, auth, business logic" },
  { label: "Database", icon: FiDatabase, detail: "MongoDB schemas and data flow" },
  { label: "AI", icon: FiCpu, detail: "AI-ready product interfaces" },
  { label: "Cloud", icon: FiCloud, detail: "Vercel, Render, Atlas" },
  { label: "DevOps", icon: FiGitBranch, detail: "Git, deploys, release flow" },
];

function SkillProgressPanel({ activeSkill }: { activeSkill: string }) {
  return (
    <motion.div className="skill-progress-panel" initial={{ opacity: 0, y: 22 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
      <p className="text-sm font-black uppercase tracking-[0.26em] text-cyan-300">Live Skill Meters</p>
      <div className="mt-5 grid gap-4">
        {spotlightSkills.map((skill, index) => (
          <div key={skill.name} className={activeSkill === skill.name ? "skill-meter is-active" : "skill-meter"}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span>{skill.name}</span>
              <strong>{skill.level}%</strong>
            </div>
            <span className="skill-meter-track">
              <motion.span
                initial={{ scaleX: 0 }}
                style={{ transformOrigin: "left", width: `${skill.level}%` }}
                transition={{ delay: index * 0.08, duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                whileInView={{ scaleX: 1 }}
              />
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeTech, setActiveTech] = useState("React.js");

  return (
    <section id="skills" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills Galaxy"
          title="Atomic MERN Skill System"
          description="A rotating 3D MT nucleus anchors every orbit. Hover the core for extra glow, or click any technology planet to inspect its role."
        />
        <div className="skills-avatar-grid">
          <SectionAvatar focusLabel={activeTech} variant="skills" />
          <div className="grid gap-5">
            <SkillProgressPanel activeSkill={activeTech} />
            <motion.div className="skill-reaction-grid" initial={{ opacity: 0, y: 18 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
              {skillReactionModes.map((mode) => {
                const Icon = mode.icon;

                return (
                  <motion.button
                    key={mode.label}
                    className={activeTech === mode.label ? "skill-reaction-card is-active" : "skill-reaction-card"}
                    onHoverStart={() => setActiveTech(mode.label)}
                    onFocus={() => setActiveTech(mode.label)}
                    type="button"
                    whileHover={{ y: -4, rotateX: 2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon />
                    <span>{mode.label}</span>
                    <small>{mode.detail}</small>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <AtomicSkills />
        </motion.div>
        <TechWall activeTech={activeTech} onTechBlur={() => setActiveTech("React.js")} onTechFocus={setActiveTech} />
      </div>
    </section>
  );
}

import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { skillOrbits } from "../constants/portfolio";
import { AtomicNucleus } from "./AtomicNucleus";

type OrbitSkill = (typeof skillOrbits)[number]["skills"][number] & {
  category: string;
  orbit: string;
};

export function AtomicSkills() {
  const [coreHovered, setCoreHovered] = useState(false);
  const [selected, setSelected] = useState<OrbitSkill | null>(null);

  return (
    <div className="atomic-wrap">
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

      <div className="atomic-field-trails" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} style={{ "--trail": index } as CSSProperties} />
        ))}
      </div>

      <div className="atomic-core-anchor">
        <motion.div
          animate={{ scale: coreHovered ? 1.045 : 1 }}
          className={`atomic-core ${coreHovered ? "is-active" : ""}`}
          onHoverEnd={() => setCoreHovered(false)}
          onHoverStart={() => setCoreHovered(true)}
          transition={{ damping: 22, stiffness: 220, type: "spring" }}
        >
          <div className="atomic-core-glow" />
          <AtomicNucleus active={coreHovered} onActiveChange={setCoreHovered} />
        </motion.div>
      </div>

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
              return (
                <button
                  key={skill.name}
                  type="button"
                  className="skill-planet"
                  style={{
                    "--angle": `${angle}deg`,
                    "--radius": `${orbit.radius / 2}rem`,
                  } as CSSProperties}
                  onClick={() => setSelected({ ...skill, category: orbit.category, orbit: orbit.label })}
                  aria-label={`Open ${skill.name} skill details`}
                >
                  <Icon />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="skill-info-card"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
          >
            <button type="button" className="skill-info-close" onClick={() => setSelected(null)} aria-label="Close skill details">
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
  );
}

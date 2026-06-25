import { motion } from "framer-motion";
import { techWall } from "../constants/portfolio";
import { TiltCard } from "./TiltCard";

interface TechWallProps {
  activeTech?: string;
  onTechBlur?: () => void;
  onTechFocus?: (tech: string) => void;
}

export function TechWall({ activeTech, onTechBlur, onTechFocus }: TechWallProps) {
  return (
    <div className="mt-14">
      <div className="mb-7 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Tech Stack Showcase</p>
        <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">Floating MERN Command Wall</h3>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {techWall.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 26 }}
              onHoverEnd={onTechBlur}
              onHoverStart={() => onTechFocus?.(tech.name)}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <TiltCard className={activeTech === tech.name ? "tech-wall-card is-active" : "tech-wall-card"}>
                <div className={`tech-wall-icon bg-gradient-to-br ${tech.accent}`}>
                  <Icon />
                </div>
                <span>{tech.name}</span>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

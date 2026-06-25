import { useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { experience, expertiseIcons } from "../constants/portfolio";

export function Experience() {
  const [activeCapability, setActiveCapability] = useState(experience[0].title);

  return (
    <section id="experience" className="section-padding premium-section-bg relative overflow-hidden">
      <div className="section-particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ "--particle-index": index } as CSSProperties} />
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Experience"
          title="What I Can Deliver"
          description="Hands-on capabilities across the most important stages of modern web application development."
        />
        <div className="experience-avatar-band">
          <SectionAvatar focusLabel={activeCapability} variant="experience" />
        </div>

        <div className="premium-timeline">
          <motion.div className="timeline-progress" initial={{ scaleY: 0 }} viewport={{ once: true }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} />
          {experience.map((item, index) => {
            const Icon = expertiseIcons[index % expertiseIcons.length];
            const isRight = index % 2 === 1;

            return (
              <motion.article
                key={item.title}
                className={`experience-timeline-item ${isRight ? "is-right" : "is-left"}`}
                initial={{ opacity: 0, x: isRight ? 46 : -46, y: 24 }}
                onHoverEnd={() => setActiveCapability(experience[0].title)}
                onHoverStart={() => setActiveCapability(item.title)}
                transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
              >
                <motion.span
                  animate={{ boxShadow: ["0 0 24px rgba(34,211,238,.38)", "0 0 44px rgba(168,85,247,.44)", "0 0 24px rgba(34,211,238,.38)"] }}
                  className="timeline-node"
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {index + 1}
                </motion.span>
                <motion.div className="experience-card" whileHover={{ y: -8, rotateX: 3, rotateY: isRight ? -4 : 4 }}>
                  <span className="experience-card-glow" />
                  <div className="mb-5 flex items-start gap-4">
                    <motion.span
                      animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
                      className="experience-icon"
                      transition={{ delay: index * 0.15, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon />
                    </motion.span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200">Capability 0{index + 1}</p>
                      <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="leading-8 text-slate-300">{item.detail}</p>
                  <span className="experience-link-cue">
                    Recruiter ready <FiArrowUpRight />
                  </span>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

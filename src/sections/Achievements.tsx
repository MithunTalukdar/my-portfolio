import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { achievements } from "../constants/portfolio";
import { useCountUp } from "../hooks/useCountUp";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, value);
  return (
    <div ref={ref} className="text-4xl font-black text-white md:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState(achievements[0].label);

  return (
    <section id="achievements" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Certifications" title="Certifications & Achievement Unlocks" description="A proof-focused section for certificates, badges, development activity, and measurable progress." />
        <div className="achievements-stage">
          <SectionAvatar focusLabel={activeAchievement} variant="achievements" />
          <div className="grid gap-5 sm:grid-cols-2">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                className="achievement-counter-card glass-panel rounded-lg border border-white/10 p-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                onHoverEnd={() => setActiveAchievement(achievements[0].label)}
                onHoverStart={() => setActiveAchievement(item.label)}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -7, rotateX: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Counter value={item.value} suffix={item.suffix} />
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

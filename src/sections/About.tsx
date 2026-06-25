import { useState } from "react";
import { motion } from "framer-motion";
import { aboutCards } from "../constants/portfolio";
import { GlassCard } from "../components/GlassCard";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";

export function About() {
  const [activeTopic, setActiveTopic] = useState("Developer introduction");

  return (
    <section id="about" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="About" title="Developer With Product Sense" description="Clean interfaces, practical architecture, and a strong bias for reliable user experiences." />
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionAvatar focusLabel={activeTopic} variant="about" />
          <div className="grid gap-5">
          <motion.div
            className="glass-panel rounded-lg border border-white/10 p-8"
            initial={{ opacity: 0, x: -28 }}
            onHoverEnd={() => setActiveTopic("Developer introduction")}
            onHoverStart={() => setActiveTopic("MERN product mindset")}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-9 text-slate-300">
              I am Mithun Talukdar, a passionate Full Stack Web Developer specializing in MongoDB, Express.js,
              React.js, and Node.js. I enjoy building scalable web applications, creating modern user experiences,
              and solving real-world problems through technology.
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {aboutCards.map((card, index) => (
              <GlassCard
                key={card.label}
                initial={{ opacity: 0, y: 26 }}
                onHoverEnd={() => setActiveTopic("Developer introduction")}
                onHoverStart={() => setActiveTopic(card.label)}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">{card.label}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{card.value}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.detail}</p>
              </GlassCard>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

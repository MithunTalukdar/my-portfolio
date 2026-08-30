import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiCode, FiCpu, FiLayers, FiZap, FiCheckCircle, FiFolder, FiGitBranch, FiClock } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { achievements } from "../constants/portfolio";
import { useCountUp } from "../hooks/useCountUp";

const roleCards = [
  {
    icon: FiCode,
    title: "Full Stack Developer",
    subtitle: "MERN & Modern Architecture",
    description: "Architecting end-to-end web apps with React, Node.js, Express, and MongoDB.",
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    textGlow: "text-cyan-300",
  },
  {
    icon: FiCpu,
    title: "AI Enthusiast",
    subtitle: "Smart Integration & APIs",
    description: "Connecting modern AI workflows, prompt interfaces, and dynamic API endpoints.",
    accent: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    textGlow: "text-purple-300",
  },
  {
    icon: FiZap,
    title: "Problem Solver",
    subtitle: "Clean Code & Performance",
    description: "Writing maintainable, type-safe, and modular code with scalable system design.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    textGlow: "text-emerald-300",
  },
  {
    icon: FiLayers,
    title: "Web App Developer",
    subtitle: "Responsive UI/UX Focus",
    description: "Crafting fluid, high-conversion interfaces that look stunning on any screen.",
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    textGlow: "text-amber-300",
  },
];

const statIcons = [FiFolder, FiGitBranch, FiZap, FiClock];

function StatCounterItem({ label, value, suffix, index }: { label: string; value: number; suffix: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, value, 1200);
  const Icon = statIcons[index % statIcons.length];

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between">
        <Icon className="text-2xl text-cyan-400" />
        <span className="text-2xl sm:text-3xl font-black text-white">{count}{suffix}</span>
      </div>
      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </motion.div>
  );
}

export function About() {
  const [activeTopic, setActiveTopic] = useState("Full Stack Developer");

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="Engineering With Product Vision"
          description="Transforming complex technical ideas into elegant, reliable, and high-impact digital experiences."
        />

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] items-start">
          {/* Left: 3D Developer Holographic Visual */}
          <div className="sticky top-28">
            <SectionAvatar focusLabel={activeTopic} variant="about" />
          </div>

          {/* Right: Professional Story & Info Cards */}
          <div className="grid gap-6">
            {/* Story Paragraph Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
                <FiCheckCircle className="text-cyan-400" /> Passionate Developer & Builder
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-black text-white">
                Hi, I'm <span className="gradient-text">Mithun Talukdar</span>
              </h3>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                A dedicated <strong className="text-white font-semibold">Full Stack Web Developer</strong> specializing in the <strong className="text-white font-semibold">MERN Stack (MongoDB, Express.js, React.js, Node.js)</strong>, Next.js, and modern web architectures.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
                I thrive on building scalable web products with clean code, intuitive UI/UX design, and AI-enabled workflows. My goal is to build software that solves real business problems and creates unforgettable user experiences.
              </p>
            </motion.div>

            {/* 4 Pillars Information Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {roleCards.map((card, index) => {
                const Icon = card.icon;
                const isSelected = activeTopic === card.title;

                return (
                  <motion.div
                    key={card.title}
                    className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
                      card.border
                    } bg-gradient-to-br ${card.accent} ${
                      isSelected ? "ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.25)]" : "shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => setActiveTopic(card.title)}
                    onMouseEnter={() => setActiveTopic(card.title)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-white/10 ${card.textGlow}`}>
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white leading-tight">{card.title}</h4>
                        <span className={`text-xs font-semibold ${card.textGlow}`}>{card.subtitle}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Live Real Data Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              {achievements.map((stat, index) => (
                <StatCounterItem
                  key={stat.label}
                  index={index}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { FiAward, FiBookOpen, FiCalendar, FiCheckCircle, FiCompass } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { education } from "../constants/portfolio";

const academicMilestones = [
  {
    icon: FaGraduationCap,
    label: "Degree Program",
    title: education.degree,
    institution: education.institution,
    body: education.summary,
    period: education.period,
    accent: "border-cyan-500/40 from-cyan-500/20 to-blue-600/10",
    badgeGlow: "text-cyan-300",
  },
  {
    icon: FiAward,
    label: "Core Specialization",
    title: "Software Engineering & Web Architecture",
    institution: "Computer Science Discipline",
    body: "Focused on practical full-stack software development, database design, algorithmic thinking, and modern web application security.",
    period: "2022 - 2026",
    accent: "border-purple-500/40 from-purple-500/20 to-pink-600/10",
    badgeGlow: "text-purple-300",
  },
  {
    icon: FiBookOpen,
    label: "Applied Coursework",
    title: "Practical Technical Foundations",
    institution: "Core Competency Tracks",
    body: "Comprehensive coursework in modern web development, relational & document databases, software lifecycle, and networking fundamentals.",
    period: `${education.coursework.length} Core Areas`,
    accent: "border-emerald-500/40 from-emerald-500/20 to-teal-600/10",
    badgeGlow: "text-emerald-300",
  },
];

export function Education() {
  const [activeMilestone, setActiveMilestone] = useState(academicMilestones[0].title);

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-32 top-1/4 size-96 rounded-full bg-amber-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 size-96 rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Academic Journey"
          title="Education & Foundations"
          description="A rigorous computer science foundation empowering high-performance full-stack engineering."
        />

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] items-start">
          {/* Left: 3D Education Hologram / Avatar */}
          <div className="sticky top-28">
            <SectionAvatar focusLabel={activeMilestone} variant="education" />
          </div>

          {/* Right: Futuristic Timeline & Glass Cards */}
          <div className="relative">
            {/* Glowing Vertical Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 opacity-40 hidden sm:block" />

            <div className="grid gap-6">
              {academicMilestones.map((item, index) => {
                const Icon = item.icon;
                const isSelected = activeMilestone === item.title;

                return (
                  <motion.article
                    key={item.label}
                    className={`relative sm:pl-16 transition-all duration-300 ${
                      isSelected ? "scale-[1.01]" : ""
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.6 }}
                    onMouseEnter={() => setActiveMilestone(item.title)}
                  >
                    {/* Glowing Node Dot on Timeline */}
                    <div className="absolute left-3.5 top-6 hidden sm:flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-950 shadow-[0_0_15px_#38bdf8]">
                      <span className="size-2 rounded-full bg-cyan-400" />
                    </div>

                    {/* Glassmorphic Card */}
                    <div
                      className={`overflow-hidden rounded-2xl border p-6 sm:p-7 backdrop-blur-2xl bg-gradient-to-br ${item.accent} shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 rounded-xl bg-white/10 text-cyan-300 text-lg">
                            <Icon />
                          </span>
                          <span className={`text-xs font-black uppercase tracking-widest ${item.badgeGlow}`}>
                            {item.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                          <FiCalendar className="text-cyan-400" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 text-xl sm:text-2xl font-black text-white">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-cyan-300/90">{item.institution}</p>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">{item.body}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Coursework Glass Panel */}
            <motion.div
              className="mt-8 sm:ml-16 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
                <FiCompass className="text-cyan-400" /> Curriculum Highlights
              </div>
              <h4 className="mt-2 text-lg sm:text-xl font-bold text-white">Theory Applied to Production Engineering</h4>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {education.coursework.map((course, idx) => (
                  <motion.div
                    key={course}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.03, x: 2 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <FiCheckCircle className="shrink-0 text-emerald-400 text-base" />
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

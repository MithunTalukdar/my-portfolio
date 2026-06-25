import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { FiAward, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { education } from "../constants/portfolio";

const academicMilestones = [
  {
    icon: FaGraduationCap,
    label: "Degree Path",
    title: education.degree,
    body: education.summary,
    meta: education.period,
  },
  {
    icon: FiAward,
    label: "Institution",
    title: education.institution,
    body: "Academic foundation shaped around software engineering, systems thinking, and project delivery.",
    meta: "Computer Science",
  },
  {
    icon: FiBookOpen,
    label: "Coursework",
    title: "Practical Developer Foundation",
    body: "Coursework aligned with web development, databases, software engineering, and network fundamentals.",
    meta: `${education.coursework.length} focus areas`,
  },
];

export function Education() {
  const [activeMilestone, setActiveMilestone] = useState(academicMilestones[0].title);

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="education-glow education-glow-one" />
      <div className="education-glow education-glow-two" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Education" title="Academic Timeline" description="A practical computer science foundation supporting full-stack product development." />

        <div className="education-stage">
          <SectionAvatar focusLabel={activeMilestone} variant="education" />
          <div className="education-timeline">
            <motion.div className="education-progress-line" initial={{ scaleX: 0 }} viewport={{ once: true }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} />
            {academicMilestones.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.label}
                  className="education-card"
                  initial={{ opacity: 0, y: 28 }}
                  onHoverEnd={() => setActiveMilestone(academicMilestones[0].title)}
                  onHoverStart={() => setActiveMilestone(item.title)}
                  transition={{ delay: index * 0.09, duration: 0.55, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -8, rotateX: 3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    className="education-icon"
                    transition={{ delay: index * 0.2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon />
                  </motion.span>
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200">{item.label}</p>
                  <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
                  <span className="education-meta">{item.meta}</span>
                  <p className="mt-4 leading-8 text-slate-300">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          className="coursework-panel"
          initial={{ opacity: 0, y: 28 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Relevant Coursework</p>
            <h3 className="mt-3 text-2xl font-black text-white">Theory wired into practical execution</h3>
          </div>
          <div className="coursework-grid">
            {education.coursework.map((course, index) => (
              <motion.span key={course} className="course-chip" initial={{ opacity: 0, y: 14 }} viewport={{ once: true }} whileHover={{ x: 4 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
                <FiCheckCircle />
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiMaximize2, FiZap } from "react-icons/fi";
import { MagneticButton } from "../components/MagneticButton";
import { ProjectModal } from "../components/ProjectModal";
import { SectionHeader } from "../components/SectionHeader";
import { TiltCard } from "../components/TiltCard";
import { projects } from "../constants/portfolio";
import type { Project, ProjectCategory } from "../types/portfolio";

const filters: Array<ProjectCategory | "All"> = ["All", "Full Stack", "Frontend", "Business", "E-Commerce"];

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.categories.includes(active))),
    [active],
  );

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 size-96 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 size-96 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Engineered Web Applications"
          description="Production-grade full-stack systems built with modern architecture, robust APIs, authentication, and fluid user experiences."
        />

        {/* Filter Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 18 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                active === filter
                  ? "border border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  : "border border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
              onClick={() => setActive(filter)}
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <TiltCard
                key={project.slug}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-900/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] flex flex-col justify-between"
                exit={{ opacity: 0, scale: 0.96 }}
                initial={{ opacity: 0, y: 24 }}
                layout
                transition={{ delay: index * 0.08 }}
              >
                <article className="flex flex-col h-full">
                  {/* Floating 3D Browser Mockup Header */}
                  <div className={`relative overflow-hidden rounded-2xl m-3 sm:m-4 p-6 sm:p-7 min-h-[13.5rem] flex flex-col justify-between bg-gradient-to-br ${project.gradient} shadow-[0_12px_30px_rgba(0,0,0,0.4)]`}>
                    {/* Darkened subtle overlay for crisp text */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

                    {/* Browser Dots */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-red-400/80" />
                        <span className="size-2.5 rounded-full bg-yellow-400/80" />
                        <span className="size-2.5 rounded-full bg-green-400/80" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/30 px-2.5 py-0.5 rounded-full border border-white/10">
                        {project.categories[0]}
                      </span>
                    </div>

                    {/* 3D Orb Letter Icon */}
                    <motion.div
                      className="relative z-10 my-auto flex size-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-2xl font-black text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] backdrop-blur-md"
                      whileHover={{ scale: 1.15, rotate: 6 }}
                    >
                      {project.title.charAt(0)}
                    </motion.div>

                    {/* Project Title overlay */}
                    <div className="relative z-10">
                      <p className="text-xs font-semibold text-cyan-200 uppercase tracking-widest">{project.categories.join(" • ")}</p>
                      <h4 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-md">{project.title}</h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 pt-2 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Feature Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.features.slice(0, 3).map((feature) => (
                          <span key={feature} className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                            <FiZap className="text-[10px]" /> {feature}
                          </span>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-[11px] font-bold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/10">
                      <MagneticButton
                        className="primary-button flex-1 py-2.5 px-3 text-xs font-bold justify-center"
                        href={project.liveUrl}
                        rel="noreferrer"
                        target="_blank"
                        aria-label={`${project.title} live demo`}
                      >
                        <FiExternalLink /> Live Demo
                      </MagneticButton>

                      <MagneticButton
                        className="secondary-button flex-1 py-2.5 px-3 text-xs font-bold justify-center border-white/20 hover:border-cyan-400/60"
                        href={project.repoUrl}
                        rel="noreferrer"
                        target="_blank"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <FiGithub /> GitHub
                      </MagneticButton>

                      <motion.button
                        className="p-2.5 rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                        onClick={() => setSelectedProject(project)}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Details"
                        aria-label="View Details"
                      >
                        <FiMaximize2 />
                      </motion.button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </AnimatePresence>
    </section>
  );
}

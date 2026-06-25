import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink, FiGithub, FiLayers, FiMaximize2, FiZap } from "react-icons/fi";
import { MagneticButton } from "../components/MagneticButton";
import { ProjectModal } from "../components/ProjectModal";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { TiltCard } from "../components/TiltCard";
import { projects } from "../constants/portfolio";
import type { Project, ProjectCategory } from "../types/portfolio";

const filters: Array<ProjectCategory | "All"> = ["All", "Full Stack", "Frontend", "Business", "E-Commerce"];

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const [hoveredProject, setHoveredProject] = useState("All project systems");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visibleProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.categories.includes(active))),
    [active],
  );

  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="Featured Portfolio Work"
          description="Recruiter-ready project showcases with full-stack architecture, business use cases, and polished interactions."
        />
        <div className="projects-avatar-stage">
          <SectionAvatar focusLabel={hoveredProject} variant="projects" />
          <motion.div
            className="premium-filter-bar flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                className={active === filter ? "filter-button active" : "filter-button"}
                onClick={() => {
                  setActive(filter);
                  setHoveredProject(filter === "All" ? "All project systems" : `${filter} projects`);
                }}
                onHoverStart={() => setHoveredProject(filter === "All" ? "All project systems" : `${filter} projects`)}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="premium-project-grid grid gap-7 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <TiltCard
                key={project.slug}
                animate={{ opacity: 1, y: 0 }}
                className="premium-project-card group"
                exit={{ opacity: 0, scale: 0.96 }}
                initial={{ opacity: 0, y: 24 }}
                layout
                onHoverEnd={() => setHoveredProject(active === "All" ? "All project systems" : `${active} projects`)}
                onHoverStart={() => setHoveredProject(project.title)}
                transition={{ delay: index * 0.05 }}
              >
                <article className="project-card-inner">
                  <span className={`project-card-glow bg-gradient-to-br ${project.gradient}`} />
                  <div className={`project-visual bg-gradient-to-br ${project.gradient}`}>
                    <div className="project-visual-grid" />
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
                      className="project-visual-orb"
                      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
                    >
                      <span>{project.title.charAt(0)}</span>
                    </motion.div>
                    <div className="project-browser-frame">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="project-visual-copy">
                      <p>{project.categories.join(" / ")}</p>
                      <strong>{project.title}</strong>
                    </div>
                  </div>

                  <div className="relative p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      {project.categories.map((category) => (
                        <span key={category} className="project-category-pill">
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-white">{project.title}</h3>
                    <p className="mt-3 line-clamp-4 min-h-28 text-sm leading-7 text-slate-300">{project.description}</p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[
                        { label: "Features", value: project.features.length, icon: FiLayers },
                        { label: "Tech", value: project.tech.length, icon: FiZap },
                        { label: "Type", value: project.categories.length, icon: FiArrowUpRight },
                      ].map((stat) => {
                        const Icon = stat.icon;

                        return (
                          <div key={stat.label} className="project-stat">
                            <Icon />
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <MagneticButton className="primary-button px-4 py-3 text-sm" href={project.liveUrl} rel="noreferrer" target="_blank" aria-label={`${project.title} live demo`}>
                        <FiExternalLink /> Live Demo
                      </MagneticButton>
                      <MagneticButton className="secondary-button px-4 py-3 text-sm" href={project.repoUrl} rel="noreferrer" target="_blank" aria-label={`${project.title} GitHub repository`}>
                        <FiGithub /> GitHub
                      </MagneticButton>
                      <motion.button className="project-details-button" onClick={() => setSelectedProject(project)} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                        <FiMaximize2 /> Details
                      </motion.button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </AnimatePresence>
        </div>

        {visibleProjects.length === 0 ? (
          <motion.div animate={{ opacity: 1 }} className="empty-project-state" initial={{ opacity: 0 }}>
            No projects found in this category yet.
          </motion.div>
        ) : null}
      </div>

      <AnimatePresence>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </AnimatePresence>
    </section>
  );
}

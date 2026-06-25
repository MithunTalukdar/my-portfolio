import { motion } from "framer-motion";
import { FiCheckCircle, FiExternalLink, FiGithub, FiLayers, FiX, FiZap } from "react-icons/fi";
import { MagneticButton } from "./MagneticButton";
import type { Project } from "../types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/80 px-4 py-8 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="premium-modal glass-panel max-h-[88vh] w-full max-w-4xl overflow-auto rounded-lg border border-white/10 p-6 shadow-glow"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Project Details</p>
            <h3 className="mt-2 text-2xl font-black text-white">{project.title}</h3>
          </div>
          <motion.button type="button" className="icon-button" onClick={onClose} aria-label="Close project modal" whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ scale: 0.92 }}>
            <FiX />
          </motion.button>
        </div>
        <div className={`project-modal-hero mb-6 bg-gradient-to-br ${project.gradient}`}>
          <div className="project-modal-grid" />
          <motion.span animate={{ rotate: [0, 10, 0], scale: [1, 1.04, 1] }} className="project-modal-mark" transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            {project.title.charAt(0)}
          </motion.span>
          <div className="project-modal-copy">
            <p>{project.categories.join(" / ")}</p>
            <strong>{project.title}</strong>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Features", value: project.features.length, icon: FiLayers },
            { label: "Stack Items", value: project.tech.length, icon: FiZap },
            { label: "Categories", value: project.categories.length, icon: FiCheckCircle },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="project-modal-stat">
                <Icon />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-6 leading-8 text-slate-300">{project.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <motion.div key={feature} className="project-feature-chip" whileHover={{ x: 4 }}>
              <FiCheckCircle />
              {feature}
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton className="primary-button" href={project.liveUrl} target="_blank" rel="noreferrer">
            <FiExternalLink /> Live Demo
          </MagneticButton>
          <MagneticButton className="secondary-button" href={project.repoUrl} target="_blank" rel="noreferrer">
            <FiGithub /> GitHub Repository
          </MagneticButton>
        </div>
      </motion.article>
    </motion.div>
  );
}

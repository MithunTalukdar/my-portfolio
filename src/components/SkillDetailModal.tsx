import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiLayers, FiExternalLink, FiCpu, FiCode, FiZap } from "react-icons/fi";
import type { Skill } from "../types/portfolio";
import type { IconType } from "react-icons";

interface SkillDetailModalProps {
  skill: Skill | null;
  iconComponent?: IconType | React.ComponentType<{ className?: string }>;
  onClose: () => void;
}

export function SkillDetailModal({ skill, iconComponent: Icon, onClose }: SkillDetailModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (skill) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const brandColor = skill.brandColor || "#38bdf8";
  const glowColor = skill.glowColor || "rgba(56, 189, 248, 0.4)";
  const levelTier = skill.levelTier || (skill.level >= 90 ? "Master" : skill.level >= 80 ? "Advanced" : "Proficient");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/95 via-[#0b1120]/95 to-slate-950/95 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-10 overflow-hidden"
          style={{
            borderColor: `${brandColor}40`,
            boxShadow: `0 0 50px -10px ${glowColor}`,
          }}
        >
          {/* Ambient Corner Flare */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: brandColor }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all cursor-pointer z-20"
            aria-label="Close modal"
          >
            <FiX className="text-lg" />
          </button>

          {/* Header with Tech Icon & Badges */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div
              className="flex size-16 sm:size-20 shrink-0 items-center justify-center rounded-2xl border bg-slate-900/90 text-3xl sm:text-4xl shadow-lg relative overflow-hidden group"
              style={{
                borderColor: `${brandColor}60`,
                boxShadow: `0 0 25px ${glowColor}`,
                color: brandColor,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundColor: brandColor }}
              />
              {Icon ? <Icon className="relative z-10" /> : <FiCode className="relative z-10" />}
            </div>

            <div className="flex-1 min-w-0 pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  {skill.category}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm"
                  style={{
                    backgroundColor: brandColor,
                  }}
                >
                  {levelTier}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                {skill.name}
              </h3>
              {skill.tagline && (
                <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
                  {skill.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Proficiency Metric Bar */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1.5">
                <FiZap style={{ color: brandColor }} />
                <span>Proficiency Level</span>
              </span>
              <span className="font-mono font-bold text-sm" style={{ color: brandColor }}>
                {skill.level}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800/80 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full relative"
                style={{
                  backgroundColor: brandColor,
                  boxShadow: `0 0 12px ${brandColor}`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Core Technical Capabilities & Concepts */}
          {skill.keyConcepts && skill.keyConcepts.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <FiCpu className="text-cyan-400" />
                <span>Key Technical Mastery & Concepts</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.keyConcepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm"
                  >
                    <FiCheckCircle className="text-emerald-400 text-xs shrink-0" />
                    <span>{concept}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Implemented In */}
          {skill.projectsUsed && skill.projectsUsed.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <FiLayers className="text-purple-400" />
                <span>Featured In Projects</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.projectsUsed.map((proj, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200"
                  >
                    <span>{proj}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ecosystem Synergies */}
          {skill.synergyWith && skill.synergyWith.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <FiZap className="text-amber-400" />
                <span>Frequently Paired With</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {skill.synergyWith.map((syn, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300"
                  >
                    +{syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="#projects"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <span>Explore full-stack projects</span>
              <FiExternalLink />
            </a>

            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

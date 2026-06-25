import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FiActivity, FiCode, FiGitBranch, FiGithub, FiTerminal, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";
import { MagneticButton } from "../components/MagneticButton";
import { SectionHeader } from "../components/SectionHeader";
import { profile } from "../constants/portfolio";
import { useCountUp } from "../hooks/useCountUp";
import { useGitHubStats } from "../hooks/useGitHubStats";

interface MetricCardProps {
  delay: number;
  icon: IconType;
  isLoading: boolean;
  label: string;
  suffix?: string;
  value: number;
}

function MetricCard({ delay, icon: Icon, isLoading, label, suffix = "", value }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, value, 1300);

  return (
    <motion.div
      ref={ref}
      className="github-metric-card"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -8, rotateX: 3 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span className="github-metric-glow" />
      <Icon className="text-3xl text-cyan-300" />
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-3 break-words text-3xl font-black text-white">{isLoading ? "..." : `${count}${suffix}`}</p>
    </motion.div>
  );
}

export function GitHubDashboard() {
  const stats = useGitHubStats("MithunTalukdar");
  const heatmapDays = useMemo(
    () =>
      Array.from({ length: 98 }, (_, index) => ({
        id: index,
        level: (index * 7 + Math.floor(index / 5)) % 5,
      })),
    [],
  );

  const metrics = [
    { label: "Contributions", value: 250, suffix: "+", icon: FiActivity },
    { label: "Repositories", value: stats.repos, icon: FiGitBranch },
    { label: "Commits", value: 420, suffix: "+", icon: FiTerminal },
    { label: "Followers", value: stats.followers, icon: FiUsers },
  ];

  return (
    <section id="github" className="section-padding relative overflow-hidden">
      <div className="github-orb github-orb-one" />
      <div className="github-orb github-orb-two" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="GitHub" title="Developer Dashboard" description="Live GitHub API integration with graceful fallbacks for profile activity." />

        <div className="grid gap-5 lg:grid-cols-4">
          {metrics.map((item, index) => (
            <MetricCard key={item.label} delay={index * 0.06} icon={item.icon} isLoading={stats.isLoading} label={item.label} suffix={item.suffix} value={item.value} />
          ))}
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            className="github-dashboard-panel"
            initial={{ opacity: 0, x: -28 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Contribution Heatmap</p>
                <h3 className="mt-2 text-2xl font-black text-white">Consistent build momentum</h3>
              </div>
              <span className="github-activity-pill">
                <FiCode /> {stats.isLoading ? "Syncing..." : stats.activity}
              </span>
            </div>
            <div className="contribution-heatmap" aria-label="GitHub contribution heatmap style activity">
              {heatmapDays.map((day) => (
                <motion.span
                  key={day.id}
                  className={`heatmap-cell level-${day.level}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: day.id * 0.003 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="github-dashboard-panel"
            initial={{ opacity: 0, x: 28 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-300">Languages Used</p>
            <h3 className="mt-2 text-2xl font-black text-white">Stack signal</h3>
            <div className="mt-6 grid gap-4">
              {stats.languages.map((language, index) => (
                <div key={language} className="language-row">
                  <div className="flex items-center justify-between gap-4 text-sm font-bold">
                    <span>{language}</span>
                    <span>{Math.max(32, 86 - index * 10)}%</span>
                  </div>
                  <span className="language-track">
                    <motion.span
                      initial={{ scaleX: 0 }}
                      style={{ width: `${Math.max(32, 86 - index * 10)}%` }}
                      viewport={{ once: true }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.7, ease: "easeOut" }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <MagneticButton href={profile.github} target="_blank" rel="noreferrer" className="primary-button mt-7 w-full justify-center">
              <FiGithub /> Visit GitHub
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

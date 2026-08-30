import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDown, FiCpu, FiDownload, FiLayers, FiSend, FiZap } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiTypescript } from "react-icons/si";
import { profile, socialLinks } from "../constants/portfolio";
import { MagneticButton } from "../components/MagneticButton";
import { ProfileImageShowcase } from "../components/ProfileImageShowcase";

const roles = [
  "Full Stack MERN Developer",
  "AI-Powered Web Engineer",
  "React & Next.js Specialist",
  "REST API & Database Architect",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Smooth dynamic pop-up role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="section-padding relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* Ambient background glows */}
      <div className="hero-gradient-field" data-parallax="42" />
      <div className="hero-light-sweep" />

      {/* Floating 3D Background Tech Badges */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute left-[5%] top-[20%] flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaReact className="text-cyan-400 text-sm animate-spin-slow" />
          <span>React.js</span>
        </motion.div>

        <motion.div
          className="absolute right-[8%] top-[15%] flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.15)]"
          animate={{ y: [0, 16, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <FaNodeJs className="text-emerald-400 text-sm" />
          <span>Node.js</span>
        </motion.div>

        <motion.div
          className="absolute left-[8%] bottom-[22%] flex items-center gap-2 rounded-xl border border-purple-500/20 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-purple-300 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <FiCpu className="text-purple-400 text-sm" />
          <span>AI Integration</span>
        </motion.div>

        <motion.div
          className="absolute right-[6%] bottom-[25%] flex items-center gap-2 rounded-xl border border-blue-500/20 bg-slate-900/60 px-3 py-1.5 text-xs font-bold text-blue-300 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          animate={{ y: [0, 14, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <SiNextdotjs className="text-white text-sm" />
          <span>Next.js</span>
        </motion.div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top Status & Brand Badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-xl">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              Available for Full Stack & AI Projects
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-950/30 px-3 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md">
              <HiSparkles className="text-purple-400" />
              MERN • Next.js • REST APIs
            </div>
          </div>

          {/* Greeting */}
          <p className="text-base sm:text-lg font-bold tracking-wide text-cyan-300">
            Hi, I'm
          </p>

          {/* Main Name Heading */}
          <h1 className="mt-1 text-[clamp(2.75rem,8vw,4.6rem)] font-black leading-[1.08] tracking-tight text-white">
            Mithun <span className="gradient-text drop-shadow-[0_0_35px_rgba(103,232,249,0.35)]">Talukdar</span>
          </h1>

          {/* Dynamic Animated Pop-up Role Subtitle */}
          <div className="mt-4 flex items-center gap-3 text-[clamp(1.2rem,3.5vw,1.95rem)] font-extrabold text-slate-100 min-h-[2.5rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="gradient-text inline-block drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Professional Introduction */}
          <p className="mt-5 max-w-2xl text-[clamp(1rem,2.2vw,1.125rem)] leading-relaxed text-slate-300">
            Specializing in building modern, scalable web applications with <strong className="text-white font-semibold">MERN Stack</strong>, <strong className="text-white font-semibold">Next.js</strong>, and <strong className="text-white font-semibold">AI Integration</strong>. Crafting robust REST APIs and high-performance, user-centric interfaces.
          </p>

          {/* Value Tech Stack Pills */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <FaReact className="text-cyan-400" /> React.js
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <FaNodeJs className="text-emerald-400" /> Node.js & Express
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <SiMongodb className="text-green-400" /> MongoDB Atlas
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <SiTypescript className="text-blue-400" /> TypeScript
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <FiZap className="text-amber-400" /> REST APIs
            </span>
          </div>

          {/* Two Primary CTAs + Working Direct Resume Button */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              className="primary-button shadow-[0_12px_32px_rgba(34,211,238,0.3)] hover:shadow-[0_16px_40px_rgba(34,211,238,0.45)] px-6 py-3.5 text-base"
            >
              <FiLayers className="text-lg" /> View My Work
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="secondary-button px-6 py-3.5 text-base border-white/20 hover:border-cyan-400/60"
            >
              <FiSend className="text-lg" /> Let's Connect
            </MagneticButton>

            <a
              href={profile.resume}
              download="Mithun-Talukdar-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-black rounded-xl border border-cyan-400/50 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] cursor-pointer"
              aria-label="Download Resume PDF"
              title="Download Resume PDF"
            >
              <FiDownload className="text-base text-cyan-400" /> Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Connect:</span>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-button hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Right 3D Hologram Avatar Showcase */}
        <div className="relative z-10 mx-auto w-full max-w-xl">
          <ProfileImageShowcase />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-cyan-300 md:flex"
        aria-label="Scroll to about"
      >
        <span className="text-xs font-bold uppercase tracking-[0.26em]">Scroll</span>
        <FiArrowDown className="animate-bounce text-cyan-300" />
      </a>
    </section>
  );
}

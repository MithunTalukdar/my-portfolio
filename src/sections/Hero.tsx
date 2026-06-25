import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiSend } from "react-icons/fi";
import { profile, socialLinks } from "../constants/portfolio";
import { FloatingTechLogos } from "../components/FloatingTechLogos";
import { MagneticButton } from "../components/MagneticButton";
import { BrandLogo } from "../components/BrandLogo";
import { ProfileImageShowcase } from "../components/ProfileImageShowcase";

export function Hero() {
  return (
    <section id="home" className="section-padding relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="hero-gradient-field" data-parallax="42" />
      <div className="hero-light-sweep" />
      <FloatingTechLogos />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-5 flex items-center gap-4">
            <BrandLogo className="size-16 sm:size-18" imageClassName="p-0.5" />
            <div className="hidden sm:block">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">Mithun Talukdar</p>
              <p className="mt-1 text-sm font-semibold text-slate-400">MERN Stack Command Center</p>
            </div>
          </div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-200 backdrop-blur-xl">
            <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.95)]" />
            Available for MERN Stack opportunities
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Mithun <span className="gradient-text">Talukdar</span>
          </h1>
          <div className="mt-5 min-h-16 text-2xl font-bold text-slate-200 sm:text-3xl">
            <span className="typing-gradient">Full Stack Web Developer</span>
            <span className="mx-2 text-cyan-300">|</span>
            <span>MERN Stack Developer</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton
              href={profile.resume}
              className="primary-button resume-download-button"
              download="Mithun-Talukdar-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Download Mithun Talukdar resume PDF"
            >
              <FiDownload /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" className="secondary-button">
              <FiSend /> Contact Me
            </MagneticButton>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="icon-button" aria-label={link.label} title={link.label}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-xl">
          <ProfileImageShowcase />
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 md:flex" aria-label="Scroll to about">
        <span className="text-xs font-bold uppercase tracking-[0.26em]">Scroll</span>
        <FiArrowDown className="animate-bounce text-cyan-300" />
      </a>
    </section>
  );
}

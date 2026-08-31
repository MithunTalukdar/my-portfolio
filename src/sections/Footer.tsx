import { motion } from "framer-motion";
import { FiArrowUp, FiMail, FiPhone } from "react-icons/fi";
import { profile, socialLinks } from "../constants/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060a16] px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/10 blur-[90px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
          {/* Left: Brand & Title */}
          <div className="text-center lg:text-left">
            <h4 className="text-xl font-black text-white tracking-tight">
              Mithun <span className="gradient-text">Talukdar</span>
            </h4>
            <p className="mt-1 text-xs font-semibold text-cyan-300">
              AI-Powered Full Stack Developer
            </p>
            <p className="mt-2 text-xs text-slate-400 max-w-sm">
              Designing scalable MERN architectures, robust APIs, and modern web products.
            </p>
          </div>

          {/* Center: Quick Contacts & Direct Links */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                href={`mailto:${profile.email}`}
              >
                <FiMail className="text-cyan-400" /> {profile.email}
              </a>
              <span className="hidden sm:inline text-slate-700">•</span>
              <a
                className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
              >
                <FiPhone className="text-emerald-400" /> {profile.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 mt-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-white/10 transition-colors"
                    aria-label={link.label}
                    title={link.label}
                    whileHover={{ scale: 1.15 }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right: Copyright & Scroll to Top */}
          <div className="flex flex-col items-center lg:items-end justify-center gap-3">
            <motion.a
              href="#home"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-white/10 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
              aria-label="Back to top"
              whileHover={{ y: -3 }}
            >
              <span>Back to Top</span>
              <FiArrowUp className="text-cyan-400" />
            </motion.a>
            <p className="text-[11px] font-medium text-slate-400">
              © {new Date().getFullYear()} Mithun Talukdar — Full Stack Developer. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

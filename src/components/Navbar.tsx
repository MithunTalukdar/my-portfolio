import { useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { navItems } from "../constants/portfolio";
import { BrandLogo } from "./BrandLogo";

interface NavbarProps {
  theme: "dark" | "light";
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl light:bg-white/70">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Mithun Talukdar home">
          <BrandLogo className="size-12" imageClassName="p-0.5" />
          <span className="hidden text-sm font-bold text-white light:text-slate-950 sm:block">Mithun Talukdar</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white light:text-slate-700 light:hover:bg-slate-950/5"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onThemeToggle}
            className="icon-button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            className="icon-button menu-button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <motion.div
          className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-2xl light:bg-white/95 lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 light:text-slate-800"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}

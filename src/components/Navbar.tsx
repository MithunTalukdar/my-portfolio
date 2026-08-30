import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import mtMonogram from "../assets/mt-monogram.svg";
import {
  Home3DIcon,
  About3DIcon,
  Education3DIcon,
  Skills3DIcon,
  Projects3DIcon,
  Experience3DIcon,
  Services3DIcon,
  GitHub3DIcon,
  Contact3DIcon,
} from "./Nav3DIcons";

interface NavbarProps {
  theme?: "dark" | "light";
  onThemeToggle?: () => void;
}

interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const navConfig: NavItemConfig[] = [
  { id: "home", label: "Home", href: "#home", Icon: Home3DIcon },
  { id: "about", label: "About", href: "#about", Icon: About3DIcon },
  { id: "education", label: "Education", href: "#education", Icon: Education3DIcon },
  { id: "skills", label: "Skills", href: "#skills", Icon: Skills3DIcon },
  { id: "projects", label: "Projects", href: "#projects", Icon: Projects3DIcon },
  { id: "experience", label: "Experience", href: "#experience", Icon: Experience3DIcon },
  { id: "services", label: "Services", href: "#services", Icon: Services3DIcon },
  { id: "github", label: "GitHub", href: "#github", Icon: GitHub3DIcon },
  { id: "contact", label: "Contact", href: "#contact", Icon: Contact3DIcon },
];

export function Navbar(_props: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // High-performance IntersectionObserver for Active Section Detection
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.2, 0.5],
    };

    const sectionElements = navConfig
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    // Passive scroll listener for navbar shadow depth effect
    const handleScroll = () => {
      const scrolled = window.scrollY > 35;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-2.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1100px] pointer-events-none">
      {/* 3D Floating Capsule Container with Dynamic Scroll Depth */}
      <nav
        className={`pointer-events-auto relative flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[1.5rem] sm:rounded-[1.75rem] backdrop-blur-2xl transition-all duration-400 ease-out ${
          isScrolled
            ? "border border-cyan-400/35 bg-[#070b1c]/96 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(34,211,238,0.3)] scale-[0.99]"
            : "border border-white/15 bg-[#0b0f1d]/90 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(99,102,241,0.18)]"
        }`}
        aria-label="Main Navigation"
      >
        {/* Subtle Ambient Color Glow Beneath Dock */}
        <div className="nav-dock-ambient-glow" aria-hidden="true" />

        {/* Left Profile Pill Card with Official MT Monogram Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1 sm:py-1.5 pl-1 sm:pl-1.5 pr-3 sm:pr-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          aria-label="Mithun Talukdar Home"
        >
          {/* MT Monogram Logo with Neon Halo */}
          <div className="relative size-9 sm:size-11 shrink-0 rounded-full p-[1.5px] sm:p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-fuchsia-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform duration-300 group-hover:scale-105">
            <img
              src={mtMonogram}
              alt="Mithun Talukdar MT Logo"
              className="size-full rounded-full object-contain bg-[#060a18] p-0.5"
            />
            <span className="absolute inset-0 rounded-full ring-1 ring-white/40 pointer-events-none" />
          </div>

          {/* Name & Glowing Cyan Dot */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
              Mithun Talukdar
            </span>
            <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
              <span className="h-[1.5px] w-6 sm:w-8 rounded-full bg-gradient-to-r from-cyan-400/80 to-transparent" />
            </div>
          </div>
        </a>

        {/* Desktop 3D Dock Navigation Items (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {navConfig.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.Icon;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex flex-col items-center justify-center min-w-[4.1rem] h-[4.4rem] px-2 rounded-2xl transition-all duration-200 select-none group ${
                  isActive
                    ? "nav-item-active"
                    : "hover:bg-white/[0.06] opacity-80 hover:opacity-100"
                }`}
                aria-label={item.label}
              >
                {/* Active Glowing Box Border */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockBox"
                    className="absolute inset-0 rounded-2xl border border-cyan-400/90 bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.35),inset_0_0_10px_rgba(34,211,238,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}

                {/* 3D Nav Icon */}
                <div
                  className={`relative z-10 transition-transform duration-200 group-hover:scale-115 group-hover:-translate-y-0.5 ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  <Icon className="size-7" />
                </div>

                {/* Nav Item Text Label */}
                <span
                  className={`relative z-10 mt-1 text-[10.5px] font-semibold tracking-tight transition-colors duration-200 ${
                    isActive ? "text-white font-bold" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Cyan Glowing Bottom Dot */}
                {isActive && (
                  <motion.span
                    layoutId="activeDockDot"
                    className="relative z-10 size-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] mt-0.5"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Menu Toggle Button (Visible on Mobile & Tablet) */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/15 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile 3D Navigation Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto mt-2 w-full overflow-hidden rounded-3xl border border-white/20 bg-[#080d22]/98 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(34,211,238,0.25)] backdrop-blur-3xl lg:hidden"
          >
            <div className="grid grid-cols-3 gap-2.5">
              {navConfig.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.Icon;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
                      isActive
                        ? "border-cyan-400 bg-gradient-to-b from-cyan-500/25 to-blue-600/15 shadow-[0_0_20px_rgba(34,211,238,0.3)] text-white font-bold"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="size-7 mb-1.5" />
                    <span className="text-[11px] font-semibold tracking-tight">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

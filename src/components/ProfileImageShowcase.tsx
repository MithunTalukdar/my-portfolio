import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { SiMongodb, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbActivity, TbCpu, TbTerminal2 } from "react-icons/tb";
import profileImage from "../assets/profile-image.jpg";
import { useMouseParallax } from "../hooks/useMouseParallax";

const particles = Array.from({ length: 24 }, (_, index) => index);

export function ProfileImageShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const parallax = useMouseParallax(0.85);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  // Smooth 3D tilt springs
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [14, -14]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), { stiffness: 220, damping: 20 });
  const glareX = useTransform(pointerX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
    setActiveBadge(null);
  }

  return (
    <motion.div
      className="profile-showcase"
      initial={{ opacity: 0, scale: 0.92, y: 34 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="profile-parallax-layer"
        style={
          {
            "--profile-parallax-x": `${parallax.x * 22}px`,
            "--profile-parallax-y": `${parallax.y * 22}px`,
          } as CSSProperties
        }
      >
        {/* Cyber Grid Background Plate */}
        <div className="profile-code-grid" aria-hidden="true">
          <div className="cyber-grid-corner top-l">
            <span>+</span> <code>SYS.01 // LOC: 23.8°N</code>
          </div>
          <div className="cyber-grid-corner top-r">
            <code>HUD.v2.4</code> <span>+</span>
          </div>
          <div className="cyber-grid-corner bot-l">
            <code>PWR: 99.9%</code>
          </div>
          <div className="cyber-grid-corner bot-r">
            <code>144 FPS [SYNC]</code>
          </div>
        </div>

        {/* Futuristic SVG Cyber HUD Concentric Rings */}
        <div className="profile-hud-svg-wrap" aria-hidden="true">
          <svg viewBox="0 0 500 500" className="profile-hud-svg">
            <defs>
              <linearGradient id="hudCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="hudMagentaGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Outermost Dashed Orbit */}
            <circle cx="250" cy="250" r="230" className="hud-circle hud-outer-dashed" />

            {/* Degree Ticks Ring */}
            <circle cx="250" cy="250" r="215" className="hud-circle hud-ticks" />

            {/* Inner Precision Segmented Rings */}
            <circle cx="250" cy="250" r="195" className="hud-circle hud-segmented" />
            <circle cx="250" cy="250" r="175" className="hud-circle hud-counter-segmented" />
            <circle cx="250" cy="250" r="155" className="hud-circle hud-dotted-inner" />

            {/* Crosshair Target Marks */}
            <line x1="250" y1="12" x2="250" y2="35" className="hud-crosshair" />
            <line x1="250" y1="465" x2="250" y2="488" className="hud-crosshair" />
            <line x1="12" y1="250" x2="35" y2="250" className="hud-crosshair" />
            <line x1="465" y1="250" x2="488" y2="250" className="hud-crosshair" />

            {/* Circular Coordinates Markers */}
            <text x="250" y="48" className="hud-text">000°</text>
            <text x="450" y="254" className="hud-text">090°</text>
            <text x="250" y="460" className="hud-text">180°</text>
            <text x="50" y="254" className="hud-text">270°</text>
          </svg>
        </div>

        {/* Dynamic 3D Holographic Radar Cone Sweep */}
        <div className="hologram-radar-system" aria-hidden="true">
          <div className="hologram-radar-cone" />
          <div className="hologram-radar-ring ring-1" />
          <div className="hologram-radar-ring ring-2" />
          <div className="hologram-radar-beam" />
        </div>

        {/* Ambient Floating Cyber Sparks / Particles */}
        <div className="profile-particles" aria-hidden="true">
          {particles.map((particle) => (
            <span
              key={particle}
              style={
                {
                  "--particle": particle,
                  "--particle-x": `${8 + ((particle * 37) % 84)}%`,
                  "--particle-y": `${6 + ((particle * 41) % 86)}%`,
                  "--particle-size": `${2 + (particle % 4)}px`,
                  "--particle-duration": `${4 + (particle % 5)}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Orbital Tech Badge Nodes */}
        {/* React Badge */}
        <motion.div
          className={`profile-orbit-badge badge-react ${activeBadge === "react" ? "active-glow" : ""}`}
          onMouseEnter={() => setActiveBadge("react")}
          animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          title="React.js Ecosystem"
        >
          <div className="badge-glow-back" />
          <FaReact />
          <span className="badge-pulse-ring" />
          <span className="badge-label">React</span>
        </motion.div>

        {/* Node.js Badge */}
        <motion.div
          className={`profile-orbit-badge badge-node ${activeBadge === "node" ? "active-glow" : ""}`}
          onMouseEnter={() => setActiveBadge("node")}
          animate={shouldReduceMotion ? undefined : { x: [0, 10, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          title="Node.js Runtime"
        >
          <div className="badge-glow-back" />
          <FaNodeJs />
          <span className="badge-pulse-ring" />
          <span className="badge-label">Node.js</span>
        </motion.div>

        {/* TypeScript Badge */}
        <motion.div
          className={`profile-orbit-badge badge-ts ${activeBadge === "ts" ? "active-glow" : ""}`}
          onMouseEnter={() => setActiveBadge("ts")}
          animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          title="TypeScript"
        >
          <div className="badge-glow-back" />
          <SiTypescript />
          <span className="badge-pulse-ring" />
          <span className="badge-label">TypeScript</span>
        </motion.div>

        {/* JavaScript Badge */}
        <motion.div
          className={`profile-orbit-badge badge-js ${activeBadge === "js" ? "active-glow" : ""}`}
          onMouseEnter={() => setActiveBadge("js")}
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -7, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          title="JavaScript (ES6+)"
        >
          <div className="badge-glow-back" />
          <RiJavascriptFill />
          <span className="badge-pulse-ring" />
          <span className="badge-label">JavaScript</span>
        </motion.div>

        {/* MongoDB Badge */}
        <motion.div
          className={`profile-orbit-badge badge-mongo ${activeBadge === "mongo" ? "active-glow" : ""}`}
          onMouseEnter={() => setActiveBadge("mongo")}
          animate={shouldReduceMotion ? undefined : { x: [0, -8, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          title="MongoDB Database"
        >
          <div className="badge-glow-back" />
          <SiMongodb />
          <span className="badge-pulse-ring" />
          <span className="badge-label">MongoDB</span>
        </motion.div>

        {/* Express / Tailwind Mini Node */}
        <motion.div
          className="profile-orbit-badge badge-tailwind"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], y: [0, -6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          title="Tailwind CSS & Express.js"
        >
          <div className="badge-glow-back" />
          <SiTailwindcss />
          <span className="badge-pulse-ring" />
          <span className="badge-label">Tailwind</span>
        </motion.div>

        {/* Main 3D Avatar Tilt Card */}
        <motion.div
          className="profile-frame-tilt"
          style={
            shouldReduceMotion
              ? { x: "-50%", y: "-50%" }
              : {
                  x: "-50%",
                  y: "-50%",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
          whileHover={shouldReduceMotion ? undefined : { scale: 1.045 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Multi-layered Neon Ambient Halos */}
          <div className="profile-frame-glow primary-glow" aria-hidden="true" />
          <div className="profile-frame-glow secondary-glow" aria-hidden="true" />
          <div className="profile-frame-neon-ring" aria-hidden="true" />

          {/* Avatar Picture Vessel */}
          <div className="profile-frame">
            <img
              src={profileImage}
              alt="Mithun Talukdar - Full Stack Developer & AI Developer"
              loading="lazy"
              decoding="async"
              width={480}
              height={480}
              className="profile-avatar-img"
            />
            {/* Dynamic Glass Glare Overlay */}
            <motion.div
              className="profile-glass-glare"
              style={
                {
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.4) 0%, rgba(103, 232, 249, 0.15) 35%, transparent 70%)`
                  ),
                } as unknown as CSSProperties
              }
              aria-hidden="true"
            />
          </div>

          {/* Laser Scanline Beam Passing Over Avatar */}
          <div className="profile-scanline" aria-hidden="true" />
          <div className="profile-hologram-overlay" aria-hidden="true" />

          {/* 3D Target Reticle Overlay on Hover */}
          <div className="profile-hud-reticle" aria-hidden="true">
            <span className="reticle-corner r-tl" />
            <span className="reticle-corner r-tr" />
            <span className="reticle-corner r-bl" />
            <span className="reticle-corner r-br" />
            <div className="reticle-center-dot" />
          </div>
        </motion.div>

        {/* Futuristic Floating HUD Code & Status Badges */}
        {/* Terminal Badge 1: Developer Statement */}
        <motion.div
          className="profile-code-chip chip-one"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="chip-led-dot cyan" />
          <TbTerminal2 className="chip-icon text-cyan-400" />
          <div className="chip-text">
            <span className="chip-code-kw">const</span> <span className="chip-code-var">developer</span> = <span className="chip-code-str">"MERN"</span>;
          </div>
        </motion.div>

        {/* Terminal Badge 2: Deployment Status & Live Radar Ping */}
        <motion.div
          className="profile-code-chip chip-two"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="chip-ping-indicator">
            <span className="ping-wave" />
            <span className="ping-core" />
          </div>
          <TbActivity className="chip-icon text-emerald-400" />
          <div className="chip-text">
            <span className="text-slate-300">deploy.status:</span> <span className="text-emerald-400 font-bold">ready</span>
          </div>
        </motion.div>

        {/* Terminal Badge 3: System Core / Tech Stack Visualizer */}
        <motion.div
          className="profile-code-chip chip-three"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <TbCpu className="chip-icon text-purple-400" />
          <div className="chip-text">
            <span className="text-purple-300 font-bold">Full-Stack Core</span>
            <div className="chip-audio-visualizer" aria-hidden="true">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
              <span className="bar bar-4" />
              <span className="bar bar-5" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

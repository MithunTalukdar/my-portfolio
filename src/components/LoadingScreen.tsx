import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap } from "react-icons/fi";
import mtMonogram from "../assets/mt-monogram.svg";

interface LoadingScreenProps {
  isComplete: boolean;
}

const bootLogs = [
  "INITIALIZING QUANTUM CORE...",
  "COMPILING 3D SHADERS & MESHES...",
  "SYNCING GITHUB TELEMETRY...",
  "OPTIMIZING FULL STACK MATRIX...",
  "SYSTEM READY • ACCESS GRANTED",
];

export function LoadingScreen({ isComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Silky smooth 60fps lightweight progress ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const inc = Math.floor(Math.random() * 8) + 5;
        return Math.min(100, prev + inc);
      });
    }, 75);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % bootLogs.length);
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040714] select-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isComplete ? 0 : 1,
        scale: isComplete ? 1.05 : 1,
        filter: isComplete ? "blur(10px)" : "blur(0px)",
        pointerEvents: isComplete ? "none" : "auto",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background Ambient Multi-Layered Cyber Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-[32rem] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 size-[32rem] rounded-full bg-purple-500/20 blur-[150px] animate-pulse" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[26rem] rounded-full bg-blue-600/15 blur-[120px]" />

      {/* Cyber Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#38bdf80d_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80d_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Seamless Glass Container (Frameless, Pure Holographic Glass) */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-sm w-full">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-bold text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)] backdrop-blur-xl"
        >
          <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="tracking-widest uppercase text-[10px]">AI Developer Matrix</span>
        </motion.div>

        {/* 3D Glassmorphic Hologram Orb with Orbiting Laser Rings (Zero Lag, Pure 60fps CSS 3D) */}
        <div className="relative flex size-44 sm:size-48 items-center justify-center">
          {/* Outer Multi-Color Laser Ring 1 */}
          <div
            className="absolute inset-0 rounded-full border-[1.5px] border-cyan-400/70 shadow-[0_0_30px_rgba(34,211,238,0.4),inset_0_0_15px_rgba(34,211,238,0.3)] animate-spin-slow pointer-events-none"
            style={{
              animationDuration: "6s",
              transform: "rotateX(65deg) rotateY(15deg)",
            }}
          />

          {/* Counter-Rotating Laser Ring 2 */}
          <div
            className="absolute inset-2 rounded-full border-[1.5px] border-purple-400/70 shadow-[0_0_30px_rgba(168,85,247,0.4),inset_0_0_15px_rgba(168,85,247,0.3)] animate-spin-reverse pointer-events-none"
            style={{
              animationDuration: "7.5s",
              transform: "rotateX(-60deg) rotateY(25deg)",
            }}
          />

          {/* Central 3D Glass Lens Disc with MT Monogram */}
          <motion.div
            className="relative flex size-28 sm:size-32 items-center justify-center rounded-full border border-white/25 bg-gradient-to-tr from-[#080d22]/90 via-[#0e1638]/85 to-[#080d22]/90 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.45)] backdrop-blur-2xl"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glowing Radial Light Sweep */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 via-transparent to-purple-500/20 animate-spin-slow" style={{ animationDuration: "5s" }} />

            {/* MT Monogram Logo Image */}
            <img
              src={mtMonogram}
              alt="Mithun Talukdar MT Logo"
              className="relative z-10 size-full object-contain filter drop-shadow-[0_0_16px_rgba(34,211,238,0.8)]"
            />
          </motion.div>
        </div>

        {/* Brand Name */}
        <h2 className="mt-6 text-xl sm:text-2xl font-black text-white tracking-tight">
          Mithun <span className="gradient-text drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]">Talukdar</span>
        </h2>

        {/* Animated Terminal Boot Log Ticker */}
        <div className="mt-2 min-h-[1.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={logIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="text-[11px] font-mono font-bold tracking-wider text-cyan-300 flex items-center gap-1.5"
            >
              <FiZap className="text-cyan-400 text-xs animate-pulse" />
              {bootLogs[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* High-Tech Glowing Progress Bar & Percentage */}
        <div className="mt-5 w-full">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-900/90 border border-white/15 shadow-inner backdrop-blur-md">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_16px_#38bdf8]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span className="uppercase tracking-widest text-slate-400">Loading Experience</span>
            <span className="font-mono text-cyan-300 font-black text-xs">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

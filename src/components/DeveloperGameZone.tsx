import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity,
  FiAward,
  FiClock,
  FiCpu,
  FiPlay,
  FiRefreshCw,
  FiTarget,
  FiVolume2,
  FiVolumeX,
  FiZap,
  FiCheckCircle,
  FiShield,
  FiHeart,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaBug, FaJs } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { SectionHeader } from "./SectionHeader";

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

type RankTitle = "Junior Debugger" | "Bug Hunter" | "Frontend Wizard" | "MERN Architect" | "AI Full Stack Master";

interface GameEntity {
  id: number;
  type: "tech" | "bug" | "boss" | "bonus";
  name: string;
  iconText: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  points: number;
  isBug: boolean;
  hp?: number;
  maxHp?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
}

const techItems = [
  { name: "React", iconText: "⚛️", color: "#00d8ff", glow: "rgba(0,216,255,0.6)", points: 100 },
  { name: "Node.js", iconText: "🟢", color: "#22c55e", glow: "rgba(34,197,94,0.6)", points: 120 },
  { name: "MongoDB", iconText: "🍃", color: "#10b981", glow: "rgba(16,185,129,0.6)", points: 110 },
  { name: "TypeScript", iconText: "🔷", color: "#3178c6", glow: "rgba(49,120,198,0.6)", points: 130 },
  { name: "Next.js", iconText: "⚡", color: "#ffffff", glow: "rgba(255,255,255,0.6)", points: 140 },
  { name: "Tailwind", iconText: "🌊", color: "#38bdf8", glow: "rgba(56,189,248,0.6)", points: 90 },
];

const bugItems = [
  { name: "Syntax Error", iconText: "🐛", color: "#ef4444", glow: "rgba(239,68,68,0.7)", points: 200 },
  { name: "Memory Leak", iconText: "👾", color: "#f97316", glow: "rgba(249,115,22,0.7)", points: 250 },
  { name: "Null Pointer", iconText: "⚠️", color: "#eab308", glow: "rgba(234,179,8,0.7)", points: 180 },
  { name: "404 Glitch", iconText: "💥", color: "#ec4899", glow: "rgba(236,72,153,0.7)", points: 300 },
];

const GAME_DURATION = 45; // 45 intense seconds
const STORAGE_KEY = "mithun-dev-arcade-high-score";

export function DeveloperGameZone() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      return 0;
    }
  });
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [bugsSquashed, setBugsSquashed] = useState(0);
  const [techCollected, setTechCollected] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Entities & particle state stored in mutable refs for smooth 60fps canvas loop
  const entitiesRef = useRef<GameEntity[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const nextIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const comboExpiresAtRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bugsRef = useRef(0);
  const techRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Web Audio Synth Sound FX
  const playSound = useCallback(
    (type: "pop" | "zap" | "combo" | "gameover" | "start") => {
      if (!soundEnabled) return;
      try {
        const AudioCtor = window.AudioContext || (window as AudioWindow).webkitAudioContext;
        if (!AudioCtor) return;
        if (!audioContextRef.current) audioContextRef.current = new AudioCtor();

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === "pop") {
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.type = "sine";
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        } else if (type === "zap") {
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.type = "sawtooth";
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.12);
        } else if (type === "combo") {
          osc.frequency.setValueAtTime(520 + comboRef.current * 40, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.07, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.type = "triangle";
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } else if (type === "start") {
          osc.frequency.setValueAtTime(330, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }
      } catch {
        // Audio playback fallback
      }
    },
    [soundEnabled]
  );

  // Spawn Particle Explosions
  const spawnExplosion = (x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        color,
        life: 1,
        maxLife: 25 + Math.random() * 20,
      });
    }
  };

  // Floating text feedback (+100, COMBO x3!)
  const addFloatingText = (text: string, x: number, y: number, color: string) => {
    floatingTextsRef.current.push({
      id: nextIdRef.current++,
      text,
      x,
      y,
      color,
      opacity: 1,
    });
  };

  // Start Game Handler
  const startGame = () => {
    scoreRef.current = 0;
    comboRef.current = 0;
    bugsRef.current = 0;
    techRef.current = 0;
    entitiesRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];

    setScore(0);
    setCombo(0);
    setBugsSquashed(0);
    setTechCollected(0);
    setTimeLeft(GAME_DURATION);
    setGameState("playing");
    isPlayingRef.current = true;

    playSound("start");
  };

  // Calculate Rank Title
  const getRank = (finalScore: number): RankTitle => {
    if (finalScore >= 3500) return "AI Full Stack Master";
    if (finalScore >= 2200) return "MERN Architect";
    if (finalScore >= 1200) return "Frontend Wizard";
    if (finalScore >= 500) return "Bug Hunter";
    return "Junior Debugger";
  };

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear & Draw Cyber Grid Background
      ctx.fillStyle = "#060a18";
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Lines
      ctx.strokeStyle = "rgba(56, 189, 248, 0.07)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isPlayingRef.current) {
        // Spawn New Targets
        if (currentTime - lastSpawnTimeRef.current > 650) {
          lastSpawnTimeRef.current = currentTime;
          const isBug = Math.random() < 0.38; // 38% chance bug, 62% tech stack
          const item = isBug
            ? bugItems[Math.floor(Math.random() * bugItems.length)]
            : techItems[Math.floor(Math.random() * techItems.length)];

          const spawnEdge = Math.random();
          let x = 0;
          let y = 0;
          let vx = 0;
          let vy = 0;

          if (spawnEdge < 0.4) {
            // From Top
            x = 40 + Math.random() * (width - 80);
            y = -30;
            vx = (Math.random() - 0.5) * 120;
            vy = 120 + Math.random() * 140;
          } else if (spawnEdge < 0.7) {
            // From Left
            x = -30;
            y = 40 + Math.random() * (height - 100);
            vx = 140 + Math.random() * 120;
            vy = (Math.random() - 0.5) * 100;
          } else {
            // From Right
            x = width + 30;
            y = 40 + Math.random() * (height - 100);
            vx = -(140 + Math.random() * 120);
            vy = (Math.random() - 0.5) * 100;
          }

          entitiesRef.current.push({
            id: nextIdRef.current++,
            type: isBug ? "bug" : "tech",
            name: item.name,
            iconText: item.iconText,
            x,
            y,
            vx,
            vy,
            radius: 28,
            color: item.color,
            glowColor: item.glow,
            points: item.points,
            isBug,
          });
        }

        // Combo Expiry Check
        if (currentTime > comboExpiresAtRef.current && comboRef.current > 0) {
          comboRef.current = 0;
          setCombo(0);
        }
      }

      // Update & Draw Entities
      entitiesRef.current = entitiesRef.current.filter((ent) => {
        ent.x += ent.vx * dt;
        ent.y += ent.vy * dt;

        // Draw Entity Badge
        ctx.save();
        ctx.translate(ent.x, ent.y);

        // Neon Glow Halo
        ctx.shadowColor = ent.glowColor;
        ctx.shadowBlur = 18;

        // Circular Frosted Base
        ctx.beginPath();
        ctx.arc(0, 0, ent.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 16, 36, 0.88)";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = ent.color;
        ctx.stroke();

        // Icon Emoji / Text
        ctx.shadowBlur = 0;
        ctx.font = "20px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ent.iconText, 0, -2);

        // Tech Name Badge
        ctx.font = "bold 9px Inter, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(ent.name, 0, 16);

        ctx.restore();

        // Remove if off screen
        return ent.x > -60 && ent.x < width + 60 && ent.y > -60 && ent.y < height + 60;
      });

      // Update & Draw Particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      // Update & Draw Floating Texts
      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => {
        ft.y -= 45 * dt;
        ft.opacity -= 0.025;

        if (ft.opacity <= 0) return false;

        ctx.save();
        ctx.globalAlpha = ft.opacity;
        ctx.font = "900 16px Inter, sans-serif";
        ctx.fillStyle = ft.color;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 12;
        ctx.textAlign = "center";
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
        return true;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isPlayingRef.current = false;
          setGameState("gameover");

          // Save High Score
          const currentScore = scoreRef.current;
          if (currentScore > highScore) {
            setHighScore(currentScore);
            try {
              localStorage.setItem(STORAGE_KEY, String(currentScore));
            } catch {
              // Ignore storage errors
            }
          }
          playSound("gameover");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, highScore, playSound]);

  // Click & Hit Detection Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let hit = false;

    entitiesRef.current = entitiesRef.current.filter((ent) => {
      const dist = Math.hypot(ent.x - clickX, ent.y - clickY);
      if (dist <= ent.radius + 14 && !hit) {
        hit = true;

        // Hit Success!
        comboRef.current += 1;
        comboExpiresAtRef.current = performance.now() + 1800; // 1.8s combo window
        setCombo(comboRef.current);

        const comboMultiplier = 1 + Math.min(comboRef.current - 1, 8) * 0.2;
        const awardedPoints = Math.round(ent.points * comboMultiplier);
        scoreRef.current += awardedPoints;
        setScore(scoreRef.current);

        if (ent.isBug) {
          bugsRef.current += 1;
          setBugsSquashed(bugsRef.current);
          playSound("zap");
          addFloatingText(`+${awardedPoints} BUG FIXED! 🐛`, ent.x, ent.y - 15, "#ef4444");
        } else {
          techRef.current += 1;
          setTechCollected(techRef.current);
          playSound(comboRef.current > 3 ? "combo" : "pop");
          addFloatingText(`+${awardedPoints} ${ent.name}!`, ent.x, ent.y - 15, ent.color);
        }

        spawnExplosion(ent.x, ent.y, ent.color, 22);
        return false; // Remove entity
      }
      return true;
    });
  };

  return (
    <section id="game-zone" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Interactive Developer Arcade"
          title="Bug Hunter & Tech Stack Smasher"
          description="A fast-paced developer reflex game built directly into the portfolio. Squash bugs, collect MERN tech stacks, build combos, and climb the developer ranks!"
        />

        {/* Main Arcade Cabinet Container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#060a1a]/95 via-[#080d24]/90 to-[#040714]/95 p-5 sm:p-8 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          {/* Top Arcade HUD Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
            <div className="flex flex-wrap items-center gap-4">
              {/* Score Display */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-cyan-400/40 bg-cyan-950/60 px-4 py-2 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                <FiTarget className="text-cyan-400 text-lg" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 block">Score</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{score}</span>
                </div>
              </div>

              {/* Combo Multiplier */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-purple-400/40 bg-purple-950/60 px-4 py-2 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                <FiZap className="text-purple-400 text-lg" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 block">Combo</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{combo > 0 ? `${combo}x` : "1x"}</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-400/40 bg-emerald-950/60 px-4 py-2 shadow-[0_0_20px_rgba(52,211,153,0.25)]">
                <FiClock className="text-emerald-400 text-lg" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 block">Time Left</span>
                  <span className="text-xl sm:text-2xl font-black text-white">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer"
                title={soundEnabled ? "Mute Sound" : "Enable Sound"}
              >
                {soundEnabled ? <FiVolume2 className="text-lg" /> : <FiVolumeX className="text-lg" />}
              </button>

              {gameState === "playing" ? (
                <button
                  type="button"
                  onClick={startGame}
                  className="flex items-center gap-2 rounded-xl border border-amber-400/50 bg-amber-500/20 px-4 py-2.5 text-xs font-black text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                >
                  <FiRefreshCw /> Restart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startGame}
                  className="primary-button py-2.5 px-6 text-sm font-black shadow-[0_8px_25px_rgba(34,211,238,0.4)]"
                >
                  <FiPlay /> {gameState === "gameover" ? "Play Again" : "Start Game"}
                </button>
              )}
            </div>
          </div>

          {/* Interactive Game Canvas Arena */}
          <div className="relative h-[24rem] sm:h-[28rem] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#030612] cursor-crosshair">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="size-full"
              aria-label="Developer Arcade Arena"
            />

            {/* Start Screen Overlay */}
            <AnimatePresence>
              {gameState === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 text-center"
                >
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-cyan-400/50 bg-cyan-500/10 text-cyan-300 text-3xl mb-4 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                    <FiZap />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">Developer Bug Hunter Arcade</h3>
                  <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-300">
                    Click & smash flying 🐛 Bugs (+200 pts) and collect ⚛️ MERN Tech Stacks (+100 pts). Chain hits together for massive combo streaks before time runs out!
                  </p>
                  <motion.button
                    type="button"
                    onClick={startGame}
                    className="primary-button mt-6 px-8 py-3.5 text-base font-black shadow-[0_12px_32px_rgba(34,211,238,0.4)] cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPlay className="text-lg" /> Launch Game (45s)
                  </motion.button>
                </motion.div>
              )}

              {/* Game Over Modal Overlay */}
              {gameState === "gameover" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-lg p-6 text-center"
                >
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/10 text-emerald-300 text-3xl mb-3 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                    <FiAward />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Game Over!</span>
                  <h3 className="mt-1 text-3xl sm:text-4xl font-black text-white">{score} Points</h3>
                  <span className="mt-2 inline-block rounded-xl border border-cyan-400/40 bg-cyan-950/80 px-4 py-1.5 text-sm font-black text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    🎖️ Rank: {getRank(score)}
                  </span>

                  <div className="mt-5 grid grid-cols-3 gap-3 w-full max-w-sm text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Bugs Fixed</span>
                      <strong className="text-base text-red-400">{bugsSquashed} 🐛</strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Tech Stack</span>
                      <strong className="text-base text-cyan-300">{techCollected} ⚛️</strong>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">High Score</span>
                      <strong className="text-base text-amber-300">{highScore}</strong>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={startGame}
                    className="primary-button mt-6 px-8 py-3 text-sm font-black shadow-[0_10px_30px_rgba(34,211,238,0.4)] cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiRefreshCw className="text-base" /> Play Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Telemetry & Achievements Matrix */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3 border-t border-white/10 pt-5">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400 text-lg">
                <FaBug />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Bug Smasher</span>
                <p className="text-xs font-semibold text-slate-200">Destroy 🐛 bugs to gain +200 pts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 text-lg">
                <FaReact />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tech Collector</span>
                <p className="text-xs font-semibold text-slate-200">Catch ⚛️ MERN stacks for combos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 text-lg">
                <FiAward />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Personal Best</span>
                <p className="text-xs font-semibold text-slate-200">High Score: <strong className="text-amber-300">{highScore} pts</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiActivity, FiAward, FiClock, FiCpu, FiPlay, FiRefreshCw, FiTarget, FiVolume2, FiVolumeX, FiZap } from "react-icons/fi";
import { SectionHeader } from "./SectionHeader";

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

type SkillLevel = "Curious Coder" | "Bug Hunter" | "Frontend Wizard" | "React Master" | "Full Stack Hero";

interface OrbitParticle {
  id: number;
  orbit: number;
  angle: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  size: number;
  value: number;
  color: string;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface BackgroundParticle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
  alpha: number;
}

interface GameRuntime {
  active: boolean;
  finished: boolean;
  width: number;
  height: number;
  dpr: number;
  score: number;
  highScore: number;
  combo: number;
  comboExpiresAt: number;
  timeLeft: number;
  difficulty: number;
  startedAt: number;
  lastTimestamp: number;
  particles: OrbitParticle[];
  bursts: BurstParticle[];
  background: BackgroundParticle[];
  pointer: { x: number; y: number; parallaxX: number; parallaxY: number; active: boolean };
  nextId: number;
}

interface HudState {
  active: boolean;
  finished: boolean;
  score: number;
  highScore: number;
  combo: number;
  timeLeft: number;
  difficulty: number;
  skillLevel: SkillLevel;
  achievements: string[];
}

const gameDuration = 60;
const storageKey = "mithun-code-orbit-high-score";
const colors = ["#67e8f9", "#c084fc", "#34d399", "#60a5fa", "#f0abfc", "#facc15"];

const achievementCatalog = [
  { id: "bug-hunter", label: "Bug Hunter", description: "Score 300+", icon: FiTarget },
  { id: "frontend-wizard", label: "Frontend Wizard", description: "Reach a 6x combo", icon: FiZap },
  { id: "react-master", label: "React Master", description: "Score 1200+", icon: FiCpu },
  { id: "full-stack-hero", label: "Full Stack Hero", description: "Score 2200+", icon: FiAward },
] as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getSkillLevel(score: number): SkillLevel {
  if (score >= 2200) return "Full Stack Hero";
  if (score >= 1200) return "React Master";
  if (score >= 700) return "Frontend Wizard";
  if (score >= 300) return "Bug Hunter";
  return "Curious Coder";
}

function loadHighScore() {
  try {
    return Number(localStorage.getItem(storageKey) ?? 0);
  } catch {
    return 0;
  }
}

function createBackground(width: number, height: number) {
  const count = Math.max(28, Math.min(72, Math.floor((width * height) / 9000)));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(0.8, 2.2),
    speed: randomBetween(0.08, 0.38),
    phase: Math.random() * Math.PI * 2,
    alpha: randomBetween(0.24, 0.82),
  }));
}

function createOrbitParticle(id: number, width: number, height: number, difficulty: number, orbit = Math.floor(Math.random() * 3)): OrbitParticle {
  const base = Math.min(width, height);
  const orbitScale = 0.36 + orbit * 0.12;
  return {
    id,
    orbit,
    angle: Math.random() * Math.PI * 2,
    speed: randomBetween(0.65, 1.22) * (1 + difficulty * 0.12) * (Math.random() > 0.5 ? 1 : -1),
    radiusX: base * orbitScale * randomBetween(0.92, 1.1),
    radiusY: base * (0.16 + orbit * 0.045) * randomBetween(0.92, 1.08),
    size: Math.max(9, 15 - difficulty * 1.4 + randomBetween(-1, 2.5)),
    value: 80 + orbit * 24 + Math.round(difficulty * 16),
    color: colors[(id + orbit) % colors.length],
  };
}

function createRuntime(highScore = 0): GameRuntime {
  const width = 900;
  const height = 520;
  return {
    active: false,
    finished: false,
    width,
    height,
    dpr: 1,
    score: 0,
    highScore,
    combo: 0,
    comboExpiresAt: 0,
    timeLeft: gameDuration,
    difficulty: 1,
    startedAt: 0,
    lastTimestamp: 0,
    particles: [],
    bursts: [],
    background: createBackground(width, height),
    pointer: { x: width / 2, y: height / 2, parallaxX: 0, parallaxY: 0, active: false },
    nextId: 1,
  };
}

function getParticlePosition(runtime: GameRuntime, particle: OrbitParticle) {
  const centerX = runtime.width / 2 + runtime.pointer.parallaxX * 15;
  const centerY = runtime.height / 2 + runtime.pointer.parallaxY * 12;
  const phase = particle.angle;
  const tiltOffset = particle.orbit * Math.PI * 0.38;
  return {
    x: centerX + Math.cos(phase + tiltOffset) * particle.radiusX,
    y: centerY + Math.sin(phase) * particle.radiusY + Math.sin(phase + tiltOffset) * particle.orbit * 4,
  };
}

function serializeHud(runtime: GameRuntime): HudState {
  const achievements = achievementCatalog
    .filter((achievement) => {
      if (achievement.id === "bug-hunter") return runtime.score >= 300;
      if (achievement.id === "frontend-wizard") return runtime.combo >= 6;
      if (achievement.id === "react-master") return runtime.score >= 1200;
      return runtime.score >= 2200;
    })
    .map((achievement) => achievement.id);

  return {
    active: runtime.active,
    finished: runtime.finished,
    score: runtime.score,
    highScore: runtime.highScore,
    combo: runtime.combo,
    timeLeft: Math.ceil(runtime.timeLeft),
    difficulty: runtime.difficulty,
    skillLevel: getSkillLevel(runtime.score),
    achievements,
  };
}

export function DeveloperGameZone() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<GameRuntime>(createRuntime());
  const audioRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hud, setHud] = useState<HudState>(() => serializeHud(runtimeRef.current));

  const unlockedAchievements = useMemo(
    () => achievementCatalog.filter((achievement) => hud.achievements.includes(achievement.id)),
    [hud.achievements],
  );

  const playTone = useCallback((frequency: number, duration = 0.06, gain = 0.04) => {
    if (!soundEnabledRef.current) return;
    const AudioCtor = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioCtor) return;
    if (!audioRef.current) audioRef.current = new AudioCtor();

    const context = audioRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "triangle";
    gainNode.gain.setValueAtTime(gain, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  }, []);

  const syncHud = useCallback(() => {
    const runtime = runtimeRef.current;
    runtime.highScore = Math.max(runtime.highScore, runtime.score);
    try {
      localStorage.setItem(storageKey, String(runtime.highScore));
    } catch {
      // High score persistence is a small bonus; gameplay should continue without it.
    }
    setHud(serializeHud(runtime));
  }, []);

  const spawnBurst = useCallback((x: number, y: number, color: string, count = 18) => {
    const runtime = runtimeRef.current;
    for (let index = 0; index < count; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomBetween(1.4, 6.2);
      runtime.bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: randomBetween(24, 44),
        maxLife: randomBetween(42, 58),
        size: randomBetween(1.5, 4.2),
        color,
      });
    }
  }, []);

  const resetParticles = useCallback((runtime: GameRuntime) => {
    const count = Math.min(10, 5 + Math.floor(runtime.score / 450));
    runtime.particles = Array.from({ length: count }, () => createOrbitParticle(runtime.nextId++, runtime.width, runtime.height, runtime.difficulty));
  }, []);

  const startGame = useCallback(() => {
    const highScore = runtimeRef.current.highScore || loadHighScore();
    const runtime = createRuntime(highScore);
    runtime.active = true;
    runtime.finished = false;
    runtime.startedAt = performance.now();
    runtime.lastTimestamp = runtime.startedAt;
    resetParticles(runtime);
    runtimeRef.current = runtime;
    syncHud();
    playTone(520, 0.08, 0.035);
  }, [playTone, resetParticles, syncHud]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      const next = !current;
      soundEnabledRef.current = next;
      if (next) playTone(740, 0.08, 0.035);
      return next;
    });
  }, [playTone]);

  const handleHitTest = useCallback(
    (event: PointerEvent) => {
      const canvas = canvasRef.current;
      const runtime = runtimeRef.current;
      if (!canvas || !runtime.active) return;

      const rect = canvas.getBoundingClientRect();
      const hitPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      runtime.pointer.x = hitPoint.x;
      runtime.pointer.y = hitPoint.y;

      const target = runtime.particles.find((particle) => {
        const position = getParticlePosition(runtime, particle);
        return Math.hypot(position.x - hitPoint.x, position.y - hitPoint.y) < particle.size + 14;
      });

      if (!target) {
        runtime.combo = 0;
        syncHud();
        playTone(180, 0.055, 0.018);
        return;
      }

      const position = getParticlePosition(runtime, target);
      runtime.combo = performance.now() < runtime.comboExpiresAt ? runtime.combo + 1 : 1;
      runtime.comboExpiresAt = performance.now() + 1750;
      runtime.score += Math.round(target.value * (1 + Math.min(runtime.combo - 1, 12) * 0.18));
      runtime.difficulty = Math.min(4.2, 1 + runtime.score / 900 + (gameDuration - runtime.timeLeft) / 90);
      runtime.particles = runtime.particles.filter((particle) => particle.id !== target.id);
      runtime.particles.push(createOrbitParticle(runtime.nextId++, runtime.width, runtime.height, runtime.difficulty, target.orbit));
      if (runtime.particles.length < Math.min(10, 5 + Math.floor(runtime.score / 450))) {
        runtime.particles.push(createOrbitParticle(runtime.nextId++, runtime.width, runtime.height, runtime.difficulty));
      }
      spawnBurst(position.x, position.y, target.color, 18 + Math.min(12, runtime.combo));
      syncHud();
      playTone(620 + runtime.combo * 36, 0.055, 0.035);
    },
    [playTone, spawnBurst, syncHud],
  );

  useEffect(() => {
    const highScore = loadHighScore();
    runtimeRef.current.highScore = highScore;
    setHud(serializeHud(runtimeRef.current));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;

    const resize = () => {
      const runtime = runtimeRef.current;
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(320, rect.width);
      const nextHeight = Math.max(360, rect.height);
      const changed = Math.abs(runtime.width - nextWidth) > 2 || Math.abs(runtime.height - nextHeight) > 2;
      runtime.width = nextWidth;
      runtime.height = nextHeight;
      runtime.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(runtime.width * runtime.dpr);
      canvas.height = Math.floor(runtime.height * runtime.dpr);
      context.setTransform(runtime.dpr, 0, 0, runtime.dpr, 0, 0);
      if (changed) {
        runtime.background = createBackground(runtime.width, runtime.height);
        runtime.particles = runtime.particles.map((particle) => ({
          ...particle,
          radiusX: createOrbitParticle(particle.id, runtime.width, runtime.height, runtime.difficulty, particle.orbit).radiusX,
          radiusY: createOrbitParticle(particle.id + 1, runtime.width, runtime.height, runtime.difficulty, particle.orbit).radiusY,
        }));
      }
    };

    const drawBackground = (runtime: GameRuntime, time: number) => {
      const gradient = context.createLinearGradient(0, 0, runtime.width, runtime.height);
      gradient.addColorStop(0, "#050711");
      gradient.addColorStop(0.48, "#08111f");
      gradient.addColorStop(1, "#111827");
      context.fillStyle = gradient;
      context.fillRect(0, 0, runtime.width, runtime.height);

      const glow = context.createRadialGradient(
        runtime.width / 2 + runtime.pointer.parallaxX * 34,
        runtime.height / 2 + runtime.pointer.parallaxY * 26,
        20,
        runtime.width / 2,
        runtime.height / 2,
        runtime.width * 0.72,
      );
      glow.addColorStop(0, "rgba(34, 211, 238, 0.22)");
      glow.addColorStop(0.46, "rgba(168, 85, 247, 0.16)");
      glow.addColorStop(1, "rgba(2, 6, 23, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, runtime.width, runtime.height);

      context.save();
      context.globalAlpha = 0.18;
      context.strokeStyle = "#67e8f9";
      context.lineWidth = 1;
      for (let x = ((time * 0.018) % 48) - 48; x < runtime.width + 48; x += 48) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x - runtime.height * 0.18, runtime.height);
        context.stroke();
      }
      for (let y = ((time * 0.012) % 48) - 48; y < runtime.height + 48; y += 48) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(runtime.width, y + runtime.width * 0.08);
        context.stroke();
      }
      context.restore();

      runtime.background.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(time * 0.001 + particle.phase) * 0.18;
        if (particle.y < -8) {
          particle.y = runtime.height + 8;
          particle.x = Math.random() * runtime.width;
        }
        context.save();
        context.globalAlpha = particle.alpha * (0.55 + Math.sin(time * 0.002 + particle.phase) * 0.25);
        context.fillStyle = "#bae6fd";
        context.shadowColor = "#67e8f9";
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(particle.x + runtime.pointer.parallaxX * 8, particle.y + runtime.pointer.parallaxY * 6, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const drawAtom = (runtime: GameRuntime) => {
      const centerX = runtime.width / 2 + runtime.pointer.parallaxX * 15;
      const centerY = runtime.height / 2 + runtime.pointer.parallaxY * 12;

      context.save();
      context.translate(centerX, centerY);
      [0, 1, 2].forEach((orbit) => {
        const particle = createOrbitParticle(orbit + 1, runtime.width, runtime.height, runtime.difficulty, orbit);
        context.save();
        context.rotate((orbit - 1) * 0.62);
        context.strokeStyle = orbit === 1 ? "rgba(192, 132, 252, 0.36)" : "rgba(103, 232, 249, 0.3)";
        context.lineWidth = 1.4;
        context.shadowColor = orbit === 1 ? "#c084fc" : "#67e8f9";
        context.shadowBlur = 12;
        context.beginPath();
        context.ellipse(0, 0, particle.radiusX, particle.radiusY, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });

      const nucleus = context.createRadialGradient(-10, -14, 4, 0, 0, 52);
      nucleus.addColorStop(0, "#ffffff");
      nucleus.addColorStop(0.28, "#67e8f9");
      nucleus.addColorStop(0.62, "#8b5cf6");
      nucleus.addColorStop(1, "rgba(139, 92, 246, 0.1)");
      context.fillStyle = nucleus;
      context.shadowColor = "#67e8f9";
      context.shadowBlur = 32;
      context.beginPath();
      context.arc(0, 0, Math.max(33, Math.min(runtime.width, runtime.height) * 0.07), 0, Math.PI * 2);
      context.fill();

      context.shadowBlur = 0;
      context.fillStyle = "#020617";
      context.font = "950 13px Inter, sans-serif";
      context.textAlign = "center";
      context.fillText("</>", 0, 5);
      context.restore();
    };

    const drawOrbitParticle = (runtime: GameRuntime, particle: OrbitParticle) => {
      const position = getParticlePosition(runtime, particle);
      context.save();
      context.translate(position.x, position.y);
      context.shadowColor = particle.color;
      context.shadowBlur = 22;
      const gradient = context.createRadialGradient(-particle.size * 0.25, -particle.size * 0.35, 2, 0, 0, particle.size * 1.4);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.22, particle.color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(0, 0, particle.size * 1.45, 0, Math.PI * 2);
      context.fill();

      context.shadowBlur = 8;
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(0, 0, particle.size, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "rgba(2, 6, 23, 0.84)";
      context.font = "950 10px Inter, sans-serif";
      context.textAlign = "center";
      context.fillText("{ }", 0, 3);
      context.restore();
    };

    const drawBursts = (runtime: GameRuntime) => {
      runtime.bursts.forEach((particle) => {
        const alpha = Math.max(0, particle.life / particle.maxLife);
        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 14;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const drawOverlay = (runtime: GameRuntime) => {
      if (runtime.active) return;
      context.save();
      context.fillStyle = "rgba(2, 6, 23, 0.56)";
      context.fillRect(0, 0, runtime.width, runtime.height);
      context.textAlign = "center";
      context.fillStyle = "#ffffff";
      context.font = "950 28px Inter, sans-serif";
      context.fillText(runtime.finished ? "FINAL SCORE" : "CODE ORBIT CHALLENGE", runtime.width / 2, runtime.height / 2 - 18);
      context.fillStyle = "#bae6fd";
      context.font = "900 42px Inter, sans-serif";
      context.fillText(runtime.finished ? String(runtime.score) : "</>", runtime.width / 2, runtime.height / 2 + 36);
      context.fillStyle = "#cbd5e1";
      context.font = "800 13px Inter, sans-serif";
      context.fillText(runtime.finished ? getSkillLevel(runtime.score) : "60 second neon reflex simulation", runtime.width / 2, runtime.height / 2 + 68);
      context.restore();
    };

    const update = (runtime: GameRuntime, time: number) => {
      const delta = Math.min(32, time - runtime.lastTimestamp || 16);
      runtime.lastTimestamp = time;

      if (runtime.active) {
        const elapsed = (time - runtime.startedAt) / 1000;
        runtime.timeLeft = Math.max(0, gameDuration - elapsed);
        runtime.difficulty = Math.min(4.2, 1 + runtime.score / 900 + elapsed / 90);
        if (time > runtime.comboExpiresAt) runtime.combo = 0;

        runtime.particles.forEach((particle) => {
          particle.angle += (particle.speed * delta) / 1000;
          particle.size = Math.max(8.5, particle.size - runtime.difficulty * 0.0008);
        });

        const desiredCount = Math.min(10, 5 + Math.floor(runtime.score / 450));
        while (runtime.particles.length < desiredCount) {
          runtime.particles.push(createOrbitParticle(runtime.nextId++, runtime.width, runtime.height, runtime.difficulty));
        }

        if (runtime.timeLeft <= 0) {
          runtime.active = false;
          runtime.finished = true;
          spawnBurst(runtime.width / 2, runtime.height / 2, "#67e8f9", 48);
          playTone(360, 0.12, 0.035);
          syncHud();
        }
      }

      runtime.bursts = runtime.bursts
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.97,
          vy: particle.vy * 0.97,
          life: particle.life - 1,
        }))
        .filter((particle) => particle.life > 0);
    };

    const render = (time: number) => {
      const runtime = runtimeRef.current;
      resize();
      update(runtime, time);
      drawBackground(runtime, time);
      drawAtom(runtime);
      runtime.particles.forEach((particle) => drawOrbitParticle(runtime, particle));
      drawBursts(runtime);
      drawOverlay(runtime);
      if (Math.floor(time / 200) !== Math.floor((time - 16) / 200)) syncHud();
      animationFrame = requestAnimationFrame(render);
    };

    const pointerToCanvas = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const runtime = runtimeRef.current;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      runtime.pointer = {
        x,
        y,
        parallaxX: (x / Math.max(1, runtime.width) - 0.5) * 2,
        parallaxY: (y / Math.max(1, runtime.height) - 0.5) * 2,
        active: true,
      };
    };

    const handlePointerMove = (event: PointerEvent) => pointerToCanvas(event);
    const handlePointerDown = (event: PointerEvent) => {
      pointerToCanvas(event);
      handleHitTest(event);
    };
    const handlePointerLeave = () => {
      runtimeRef.current.pointer.active = false;
      runtimeRef.current.pointer.parallaxX = 0;
      runtimeRef.current.pointer.parallaxY = 0;
    };

    resize();
    animationFrame = requestAnimationFrame(render);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, [handleHitTest, playTone, spawnBurst, syncHud]);

  return (
    <section id="game-zone" className="code-orbit-section section-padding relative overflow-hidden">
      <div className="code-orbit-ambient code-orbit-ambient-one" />
      <div className="code-orbit-ambient code-orbit-ambient-two" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Interactive Lab" title="Code Orbit Challenge" description="A compact neon reflex game built into the portfolio experience." />

        <div className="code-orbit-shell">
          <motion.div className="code-orbit-stage" initial={{ opacity: 0, y: 26 }} viewport={{ once: true, margin: "-80px" }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="code-orbit-hud">
              <div>
                <FiTarget />
                <span>Score</span>
                <strong>{hud.score}</strong>
              </div>
              <div>
                <FiZap />
                <span>Combo</span>
                <strong>{hud.combo}x</strong>
              </div>
              <div>
                <FiClock />
                <span>Time</span>
                <strong>{hud.timeLeft}s</strong>
              </div>
              <div>
                <FiActivity />
                <span>Level</span>
                <strong>{hud.difficulty.toFixed(1)}x</strong>
              </div>
            </div>

            <canvas ref={canvasRef} className="code-orbit-canvas" aria-label="Code Orbit Challenge canvas game" />

            <div className="code-orbit-controls">
              <motion.button type="button" onClick={startGame} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                {hud.active ? <FiRefreshCw /> : <FiPlay />}
                {hud.active ? "Restart" : hud.finished ? "Replay" : "Launch"}
              </motion.button>
              <motion.button type="button" onClick={toggleSound} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                {soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
                Sound
              </motion.button>
            </div>
          </motion.div>

          <motion.aside className="code-orbit-panel" initial={{ opacity: 0, y: 26 }} viewport={{ once: true, margin: "-80px" }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="code-orbit-level-card">
              <span>Developer Skill Level</span>
              <strong>{hud.skillLevel}</strong>
              <small>High score {hud.highScore}</small>
            </div>

            <div className="code-orbit-achievement-card">
              <div className="code-orbit-panel-title">
                <FiAward />
                <div>
                  <span>Achievements</span>
                  <strong>{unlockedAchievements.length} / {achievementCatalog.length}</strong>
                </div>
              </div>
              <div className="code-orbit-badges">
                {achievementCatalog.map((achievement) => {
                  const Icon = achievement.icon;
                  const unlocked = hud.achievements.includes(achievement.id);
                  return (
                    <motion.div
                      key={achievement.id}
                      animate={unlocked ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.52, y: 0, scale: 1 }}
                      className={unlocked ? "is-unlocked" : ""}
                      title={achievement.description}
                    >
                      <Icon />
                      <span>{achievement.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {hud.finished ? (
                <motion.div
                  key="result"
                  animate={{ opacity: 1, y: 0 }}
                  className="code-orbit-result-card"
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 14 }}
                >
                  <span>Final Score</span>
                  <strong>{hud.score}</strong>
                  <small>{hud.skillLevel}</small>
                  <button type="button" onClick={startGame}>
                    <FiRefreshCw /> Replay
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

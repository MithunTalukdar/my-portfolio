import { useRef } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import clsx from "clsx";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiFileText,
  FiLayers,
  FiMail,
  FiMonitor,
  FiMousePointer,
  FiSend,
  FiServer,
  FiUser,
} from "react-icons/fi";
import { FaGraduationCap, FaMedal, FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiVercel } from "react-icons/si";
import type { Group } from "three";
import { useMouseParallax } from "../hooks/useMouseParallax";

export type SectionAvatarVariant =
  | "about"
  | "education"
  | "skills"
  | "projects"
  | "achievements"
  | "experience"
  | "contact";

type SectionAvatarMood = "idle" | "active" | "sending" | "success" | "error";

interface SectionAvatarProps {
  variant: SectionAvatarVariant;
  focusLabel?: string;
  mood?: SectionAvatarMood;
  className?: string;
}

interface AvatarConfig {
  eyebrow: string;
  title: string;
  role: string;
  accent: string;
  secondary: string;
  outfit: string;
  icon: IconType;
  orbitIcons: IconType[];
  consoleLabels: string[];
}

const avatarConfig: Record<SectionAvatarVariant, AvatarConfig> = {
  about: {
    eyebrow: "Introduction",
    title: "Personal briefing",
    role: "Developer host",
    accent: "#38bdf8",
    secondary: "#a78bfa",
    outfit: "presenter",
    icon: FiUser,
    orbitIcons: [FiUser, FiCheckCircle, FiCode],
    consoleLabels: ["Profile", "Values", "MERN"],
  },
  education: {
    eyebrow: "Academic lab",
    title: "Study desk",
    role: "Student engineer",
    accent: "#facc15",
    secondary: "#38bdf8",
    outfit: "student",
    icon: FiBookOpen,
    orbitIcons: [FaGraduationCap, FiBookOpen, FiAward],
    consoleLabels: ["Degree", "Coursework", "Timeline"],
  },
  skills: {
    eyebrow: "Engineering bay",
    title: "Multi-screen coding",
    role: "Elite software engineer",
    accent: "#34d399",
    secondary: "#22d3ee",
    outfit: "engineer",
    icon: FiCpu,
    orbitIcons: [FaReact, FaNodeJs, SiMongodb, SiTypescript],
    consoleLabels: ["Frontend", "Backend", "Cloud"],
  },
  projects: {
    eyebrow: "Product studio",
    title: "Hologram builder",
    role: "Product developer",
    accent: "#60a5fa",
    secondary: "#f472b6",
    outfit: "builder",
    icon: FiLayers,
    orbitIcons: [FiMonitor, FiLayers, FiMousePointer],
    consoleLabels: ["Prototype", "Launch", "Scale"],
  },
  achievements: {
    eyebrow: "Proof vault",
    title: "Certificate unlocks",
    role: "Achievement lead",
    accent: "#f59e0b",
    secondary: "#fb7185",
    outfit: "formal",
    icon: FaMedal,
    orbitIcons: [FaMedal, FiAward, FiFileText],
    consoleLabels: ["Badges", "Certificates", "Stats"],
  },
  experience: {
    eyebrow: "Delivery room",
    title: "Work dashboard",
    role: "Professional engineer",
    accent: "#2dd4bf",
    secondary: "#818cf8",
    outfit: "work",
    icon: FiBriefcase,
    orbitIcons: [FiBriefcase, FiBarChart2, FiServer],
    consoleLabels: ["API", "Dashboards", "Deploy"],
  },
  contact: {
    eyebrow: "Communication desk",
    title: "Message console",
    role: "Friendly contact host",
    accent: "#38bdf8",
    secondary: "#34d399",
    outfit: "contact",
    icon: FiMail,
    orbitIcons: [FiMail, FiSend, SiVercel],
    consoleLabels: ["Email", "Social", "Reply"],
  },
};

function AvatarEnvironment({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <Canvas className="character-r3f" camera={{ position: [0, 0, 5.5], fov: 48 }} dpr={[1, 1.25]}>
      <ambientLight intensity={0.7} />
      <pointLight color={accent} intensity={2.4} position={[2.6, 2.2, 3]} />
      <pointLight color={secondary} intensity={1.6} position={[-2.5, -1.7, 2.5]} />
      <HologramRig accent={accent} secondary={secondary} />
    </Canvas>
  );
}

function HologramRig({ accent, secondary }: { accent: string; secondary: string }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.32;
    group.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -1.2]} rotation={[1.15, 0, 0]}>
        <torusGeometry args={[1.95, 0.018, 12, 120]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.15} transparent opacity={0.56} />
      </mesh>
      <mesh position={[0, 0, -1.05]} rotation={[1.25, 0.35, 0.2]}>
        <torusGeometry args={[1.28, 0.014, 12, 100]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={1} transparent opacity={0.5} />
      </mesh>
      {[-1.35, -0.45, 0.55, 1.38].map((x, index) => (
        <mesh key={x} position={[x, Math.sin(index) * 0.42, -0.65]}>
          <sphereGeometry args={[0.055 + index * 0.008, 14, 14]} />
          <meshStandardMaterial color={index % 2 ? secondary : accent} emissive={index % 2 ? secondary : accent} emissiveIntensity={1.9} />
        </mesh>
      ))}
    </group>
  );
}

function CharacterHead({ variant, focusLabel }: { variant: SectionAvatarVariant; focusLabel: string }) {
  return (
    <div className="character-head">
      <div className="character-hair" />
      <div className="character-face">
        <span className="character-brow left" />
        <span className="character-brow right" />
        <span className="character-eye left">
          <i />
        </span>
        <span className="character-eye right">
          <i />
        </span>
        <span className={clsx("character-mouth", variant === "contact" && "is-friendly", focusLabel !== "Idle" && "is-reacting")} />
        {variant === "contact" || variant === "about" ? <span className="character-cheek" /> : null}
      </div>
    </div>
  );
}

function Workstation({ variant, focusLabel, labels }: { variant: SectionAvatarVariant; focusLabel: string; labels: string[] }) {
  if (variant === "about") {
    return (
      <div className="character-workstation about-console">
        <motion.div className="speech-panel primary" animate={{ y: [0, -5, 0] }} transition={{ duration: 3.2, repeat: Infinity }}>
          <strong>Hello.</strong>
          <span>Full-stack developer briefing</span>
        </motion.div>
        <motion.div className="speech-panel secondary" animate={{ x: [0, 7, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>
          {focusLabel}
        </motion.div>
      </div>
    );
  }

  if (variant === "education") {
    return (
      <div className="character-workstation study-console">
        <div className="study-desk">
          <div className="open-book">
            <span />
            <span />
            <motion.i animate={{ rotateY: [0, -122, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <motion.div className="graduation-cap" animate={{ y: [0, -14, 0], rotate: [-5, 6, -5] }} transition={{ duration: 4, repeat: Infinity }} />
          <motion.div className="pointing-beam" animate={{ scaleX: [0.55, 1, 0.55], opacity: [0.35, 0.85, 0.35] }} transition={{ duration: 2.1, repeat: Infinity }} />
        </div>
      </div>
    );
  }

  if (variant === "skills") {
    return (
      <div className="character-workstation coding-console">
        <div className="monitor-array">
          {["api.ts", "ui.tsx", "db.js"].map((screen, index) => (
            <div key={screen} className={`code-monitor monitor-${index + 1}`}>
              <strong>{screen}</strong>
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
        <div className="work-keyboard">
          {Array.from({ length: 18 }).map((_, index) => (
            <i key={index} style={{ "--key": index } as CSSProperties} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "projects") {
    return (
      <div className="character-workstation project-console">
        {labels.map((label, index) => (
          <motion.div
            key={label}
            className={`holo-project-card card-${index + 1}`}
            animate={{ y: [0, index === 1 ? -12 : -7, 0], rotateY: [0, index % 2 ? -7 : 7, 0] }}
            transition={{ delay: index * 0.2, duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>{label}</span>
            <strong>{index + 1}</strong>
          </motion.div>
        ))}
        <motion.div className="builder-pointer" animate={{ rotate: [-8, -24, -8] }} transition={{ duration: 2.2, repeat: Infinity }} />
      </div>
    );
  }

  if (variant === "experience") {
    return (
      <div className="character-workstation analytics-console">
        <div className="analytics-screen">
          <span className="chart-line" />
          {[62, 82, 48, 74].map((height, index) => (
            <motion.i
              key={height}
              animate={{ scaleY: [0.55, height / 100, 0.55] }}
              style={{ "--bar": height } as CSSProperties}
              transition={{ delay: index * 0.18, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <motion.div className="review-document" animate={{ x: [0, 10, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }} />
      </div>
    );
  }

  if (variant === "achievements") {
    return (
      <div className="character-workstation certificate-console">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`floating-certificate cert-${index + 1}`}
            animate={{ y: [0, -8 - index * 2, 0], rotate: [0, index % 2 ? -5 : 5, 0] }}
            transition={{ delay: index * 0.22, duration: 3.4, repeat: Infinity }}
          >
            <span />
            <strong>{index === 0 ? "MT" : "OK"}</strong>
          </motion.div>
        ))}
        <motion.div className="unlock-medal" animate={{ scale: [1, 1.12, 1], rotate: [-8, 8, -8] }} transition={{ duration: 2.6, repeat: Infinity }} />
      </div>
    );
  }

  return (
    <div className="character-workstation contact-console">
      <motion.div className="mail-terminal" animate={{ boxShadow: ["0 0 24px rgba(56,189,248,.18)", "0 0 42px rgba(52,211,153,.32)", "0 0 24px rgba(56,189,248,.18)"] }} transition={{ duration: 2.4, repeat: Infinity }}>
        <FiMail />
        <span>message.send()</span>
      </motion.div>
      <motion.div className="send-trail" animate={{ x: [0, 38, 0], opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.1, repeat: Infinity }} />
      <div className="social-nodes">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function SectionAvatar({ variant, focusLabel = "Idle", mood = "idle", className }: SectionAvatarProps) {
  const config = avatarConfig[variant];
  const parallax = useMouseParallax(0.8);
  const Icon = config.icon;
  const style = {
    "--character-accent": config.accent,
    "--character-secondary": config.secondary,
    "--eye-x": `${parallax.x * 0.16}rem`,
    "--eye-y": `${parallax.y * 0.12}rem`,
  } as CSSProperties;

  return (
    <motion.aside
      aria-label={`${config.role} animated character`}
      className={clsx("character-scene", `character-scene-${variant}`, className)}
      data-mood={mood}
      data-parallax="28"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      style={style}
      viewport={{ once: true, margin: "-90px" }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <AvatarEnvironment accent={config.accent} secondary={config.secondary} />
      <div className="character-volumetric-glow" />
      <div className="character-depth-grid" />
      <div className="character-particle-system" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} style={{ "--dot": index } as CSSProperties} />
        ))}
      </div>

      <div className="character-orbit" aria-hidden="true">
        {config.orbitIcons.map((OrbitIcon, index) => (
          <motion.span
            key={index}
            animate={{ rotate: [0, 360], y: [0, index % 2 === 0 ? -8 : 8, 0] }}
            style={{ "--orbit": index } as CSSProperties}
            transition={{ delay: index * 0.28, duration: 8 + index * 1.4, ease: "linear", repeat: Infinity }}
          >
            <OrbitIcon />
          </motion.span>
        ))}
      </div>

      <motion.div className={clsx("character-actor", `outfit-${config.outfit}`)} animate={{ y: [0, -5, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
        <CharacterHead focusLabel={focusLabel} variant={variant} />
        <div className="character-neck" />
        <div className="character-torso">
          <motion.span
            className="character-arm left"
            animate={{ rotate: variant === "about" ? [-12, -38, -12] : variant === "education" ? [-4, -24, -4] : [-8, 5, -8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="character-arm right"
            animate={{ rotate: variant === "projects" ? [12, -20, 12] : variant === "contact" ? [-16, -52, -16] : [8, -5, 8] }}
            transition={{ duration: variant === "contact" ? 1.9 : 2.7, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="character-core-icon">
            <Icon />
          </span>
        </div>
      </motion.div>

      <Workstation focusLabel={focusLabel} labels={config.consoleLabels} variant={variant} />

      <div className="character-status-panel">
        <span>{config.eyebrow}</span>
        <strong>{focusLabel}</strong>
        <small>{config.title}</small>
      </div>
    </motion.aside>
  );
}

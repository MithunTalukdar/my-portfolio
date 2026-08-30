import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import clsx from "clsx";
import {
  FiBriefcase,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { FaGraduationCap, FaMedal } from "react-icons/fa";
import mtMonogramUrl from "../assets/mt-monogram.svg";

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
  accent: string;
  secondary: string;
  icon: IconType;
  chips: string[];
}

const avatarConfig: Record<SectionAvatarVariant, AvatarConfig> = {
  about: {
    eyebrow: "DEVELOPER TELEMETRY",
    title: "Full Stack Engineer",
    accent: "#38bdf8",
    secondary: "#a855f7",
    icon: FiUser,
    chips: ["MERN Architecture", "Next.js Core", "AI Integration"],
  },
  education: {
    eyebrow: "ACADEMIC MATRIX",
    title: "Computer Science Hub",
    accent: "#facc15",
    secondary: "#38bdf8",
    icon: FaGraduationCap,
    chips: ["B.Sc Computer Science", "Graduation 2026", "Software Engineering"],
  },
  skills: {
    eyebrow: "ENGINEERING STACK",
    title: "Core Technology Core",
    accent: "#34d399",
    secondary: "#22d3ee",
    icon: FiCpu,
    chips: ["Frontend Mastery", "Backend APIs", "Database Design"],
  },
  projects: {
    eyebrow: "PRODUCTION LAB",
    title: "Full Stack Systems",
    accent: "#60a5fa",
    secondary: "#f472b6",
    icon: FiLayers,
    chips: ["LMS Platform", "Lumina E-Commerce", "Swastik Portal"],
  },
  achievements: {
    eyebrow: "VERIFIED PROOF",
    title: "Capabilities Vault",
    accent: "#f59e0b",
    secondary: "#fb7185",
    icon: FaMedal,
    chips: ["12+ Live Projects", "Production Ready", "1200+ Coding Hrs"],
  },
  experience: {
    eyebrow: "DELIVERY PIPELINE",
    title: "Full Stack Lifecycle",
    accent: "#2dd4bf",
    secondary: "#818cf8",
    icon: FiBriefcase,
    chips: ["MERN Stack", "REST APIs", "Cloud CI/CD"],
  },
  contact: {
    eyebrow: "COMMUNICATION NODE",
    title: "Transmitter Console",
    accent: "#38bdf8",
    secondary: "#34d399",
    icon: FiMail,
    chips: ["Direct Email", "Quick Response", "Open to Hire"],
  },
};

const LOGO_SCALE = 0.0075;

// 3D Extruded MT Logo Component inside the Holographic Stage
function Stage3DMTLogo({ accent, secondary }: { accent: string; secondary: string }) {
  const svg = useLoader(SVGLoader, mtMonogramUrl);
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(
    () => [
      // 0: Deep space disc
      new THREE.MeshPhysicalMaterial({
        color: "#080d1e",
        emissive: "#0f172a",
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1,
      }),
      // 1: Inner ring border
      new THREE.MeshPhysicalMaterial({
        color: "#0f172a",
        emissive: accent,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
      }),
      // 2: Outer neon accent arc
      new THREE.MeshPhysicalMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 2.0,
        metalness: 0.6,
        roughness: 0.05,
        clearcoat: 1,
      }),
      // 3: Outer neon secondary arc
      new THREE.MeshPhysicalMaterial({
        color: secondary,
        emissive: secondary,
        emissiveIntensity: 1.8,
        metalness: 0.6,
        roughness: 0.05,
        clearcoat: 1,
      }),
      // 4: "M" Letter Face
      new THREE.MeshPhysicalMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 1.4,
        metalness: 0.88,
        roughness: 0.08,
        clearcoat: 1,
      }),
      // 5: "M" Letter Shade
      new THREE.MeshPhysicalMaterial({
        color: "#1e293b",
        emissive: "#0f172a",
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
      }),
      // 6: "T" Letter Face (Brilliant Silver-White)
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        emissive: "#f0f9ff",
        emissiveIntensity: 1.1,
        metalness: 0.95,
        roughness: 0.04,
        clearcoat: 1,
      }),
      // 7: Highlight Accent
      new THREE.MeshPhysicalMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 1.0,
        metalness: 0.5,
        roughness: 0.06,
        transparent: true,
        opacity: 0.85,
      }),
      // 8: Top White Highlight
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 0.9,
        metalness: 0.5,
        roughness: 0.05,
        transparent: true,
        opacity: 0.95,
      }),
    ],
    [accent, secondary],
  );

  const pieces = useMemo(() => {
    const extrude = {
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 2.2,
      bevelThickness: 2.4,
      curveSegments: 48,
      depth: 14,
    };

    const totalPaths = svg.paths.length;
    const midOffset = (totalPaths * 0.9) / 2;

    return svg.paths.flatMap((path, pathIndex) =>
      SVGLoader.createShapes(path).map((shape, shapeIndex) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrude);
        geometry.translate(-256, -256, 0);
        geometry.computeVertexNormals();

        return {
          geometry,
          materialIndex: Math.min(pathIndex, materials.length - 1),
          offset: pathIndex * 0.9 - midOffset,
          key: `${pathIndex}-${shapeIndex}`,
        };
      }),
    );
  }, [materials.length, svg.paths]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth 3D rotation of the MT Logo
    groupRef.current.rotation.y += delta * 0.55;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group scale={[LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE]}>
        {pieces.map((piece) => (
          <mesh
            key={piece.key}
            castShadow
            receiveShadow
            geometry={piece.geometry}
            material={materials[piece.materialIndex]}
            position={[0, 0, piece.offset]}
          />
        ))}
      </group>
    </group>
  );
}

// Surrounding 3D Hologram Rings and Aura
function Stage3DHologram({ accent, secondary }: { accent: string; secondary: string }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.75;
      ring1.current.rotation.x = Math.sin(t * 0.6) * 0.25 + 1.1;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.6;
      ring2.current.rotation.y = Math.cos(t * 0.5) * 0.25 - 0.9;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.3;
      wireframeRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Outer 3D Geometric Cyber Shell */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={secondary}
          emissive={secondary}
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbiting Laser Torus Rings */}
      <mesh ref={ring1} rotation={[1.1, 0.2, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.5} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2} rotation={[-0.9, 0.4, 0]}>
        <torusGeometry args={[2.1, 0.016, 16, 100]} />
        <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={2.2} transparent opacity={0.75} />
      </mesh>

      {/* 3D MT Logo in Dead Center */}
      <Stage3DMTLogo accent={accent} secondary={secondary} />

      {/* Ambient Stardust */}
      <Sparkles count={40} scale={[4.0, 4.0, 4.0]} size={1.8} speed={0.8} color={accent} />
      <Sparkles count={25} scale={[3.6, 3.6, 3.6]} size={1.4} speed={0.6} color={secondary} />
    </group>
  );
}

function Section3DScene({ accent, secondary }: { accent: string; secondary: string }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight color="#ffffff" intensity={3.5} position={[4, 5, 6]} />
      <pointLight color={accent} intensity={30} position={[3, 3, 3]} />
      <pointLight color={secondary} intensity={25} position={[-3, -2, 2]} />
      <pointLight color="#ffffff" intensity={20} position={[0, 0, 5]} />
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <Stage3DHologram accent={accent} secondary={secondary} />
      </Float>
    </>
  );
}

export function SectionAvatar({ variant, focusLabel = "Active", mood = "idle", className }: SectionAvatarProps) {
  const config = avatarConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      aria-label={`${config.title} 3D Visual Stage`}
      className={clsx(
        "relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#070b18]/90 via-[#0a0f24]/85 to-[#050814]/90 p-6 sm:p-7 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] select-none",
        className
      )}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.45)" }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl opacity-30"
        style={{ backgroundColor: config.accent }}
      />
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 size-64 rounded-full blur-3xl opacity-25"
        style={{ backgroundColor: config.secondary }}
      />

      {/* Top Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-9 items-center justify-center rounded-xl border text-base shadow-lg"
            style={{
              borderColor: `${config.accent}66`,
              backgroundColor: `${config.accent}18`,
              color: config.accent,
            }}
          >
            <Icon />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
              {config.eyebrow}
            </span>
            <h4 className="text-sm sm:text-base font-black text-white leading-tight">
              {config.title}
            </h4>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300 backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{mood === "success" ? "TRANSMITTED" : mood === "sending" ? "SYNCING..." : "LIVE 3D"}</span>
        </div>
      </div>

      {/* 3D Holographic Canvas Stage with Centered 3D MT Logo */}
      <div className="relative my-4 h-60 sm:h-68 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#040714]/80">
        <Canvas
          camera={{ fov: 40, position: [0, 0, 6.2] }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <Section3DScene accent={config.accent} secondary={config.secondary} />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Telemetry Chips & Focus Label */}
      <div className="relative z-20 mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {config.chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-slate-300 backdrop-blur-md"
            >
              <FiCheckCircle className="text-cyan-400 text-[10px]" />
              {chip}
            </span>
          ))}
        </div>

        {/* Selected Topic Pill */}
        <div className="w-full mt-2 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Focus:</span>
          <span className="font-extrabold text-cyan-300 truncate max-w-[200px]">{focusLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}

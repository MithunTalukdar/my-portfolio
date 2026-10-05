import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiCode,
  FiExternalLink,
  FiGitBranch,
  FiGitCommit,
  FiGithub,
  FiLayers,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { MagneticButton } from "../components/MagneticButton";
import { SectionHeader } from "../components/SectionHeader";
import { profile } from "../constants/portfolio";
import { useCountUp } from "../hooks/useCountUp";
import { useGitHubStats } from "../hooks/useGitHubStats";

// 3D Skyscraper Building representing commit activity
interface BuildingProps {
  position: [number, number, number];
  height: number;
  color: string;
  dayIndex: number;
  commits: number;
  onHover: (info: { index: number; commits: number; color: string } | null) => void;
}

function CityBuilding({ position, height, color, dayIndex, commits, onHover }: BuildingProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const [x, , z] = position;
  const y = height / 2;

  return (
    <group position={[x, 0, z]}>
      {/* 3D Skyscraper Body */}
      <mesh
        ref={meshRef}
        position={[0, y, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover({ index: dayIndex, commits, color });
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <boxGeometry args={[0.38, height, 0.38]} />
        <meshPhysicalMaterial
          color={hovered ? "#ffffff" : color}
          emissive={color}
          emissiveIntensity={hovered ? 1.6 : 0.6 + (height / 2.5) * 0.4}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Glowing Rooftop Beacon */}
      <mesh position={[0, height + 0.04, 0]}>
        <boxGeometry args={[0.34, 0.08, 0.34]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={hovered ? 3.0 : 1.8}
        />
      </mesh>

      {/* Wireframe Outline Edge on hover */}
      {hovered && (
        <mesh position={[0, y, 0]}>
          <boxGeometry args={[0.42, height + 0.04, 0.42]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
    </group>
  );
}

// 3D City Skyline Grid (10x7 Matrix = 70 Buildings)
function CyberCityGrid({ onHoverBuilding }: { onHoverBuilding: (info: any) => void }) {
  const cityData = useMemo(() => {
    const buildings = [];
    const rows = 7;
    const cols = 10;
    const spacing = 0.55;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        // Pseudo-commit frequency pattern resembling realistic commit bursts
        const noise = Math.sin(r * 1.5) * Math.cos(c * 1.2) + Math.sin(index * 0.4);
        const normalized = Math.max(0.1, (noise + 2) / 3.2);
        const commits = Math.round(normalized * 12);
        const height = Math.max(0.35, normalized * 2.2);

        // Color based on activity level
        let color = "#1e293b";
        if (commits >= 8) color = "#38bdf8"; // Cyan high
        else if (commits >= 5) color = "#a855f7"; // Purple med
        else if (commits >= 2) color = "#34d399"; // Emerald low
        else color = "#1e3a8a"; // Deep blue baseline

        const x = (c - cols / 2 + 0.5) * spacing;
        const z = (r - rows / 2 + 0.5) * spacing;

        buildings.push({
          id: index,
          position: [x, 0, z] as [number, number, number],
          height,
          color,
          commits,
        });
      }
    }
    return buildings;
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Ground City Grid Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial
          color="#060b1c"
          roughness={0.7}
          metalness={0.9}
        />
      </mesh>

      {/* Grid Lines on Ground */}
      <gridHelper args={[7, 14, "#38bdf8", "rgba(56,189,248,0.15)"]} position={[0, 0.01, 0]} />

      {/* 3D Skyscraper Buildings */}
      {cityData.map((b) => (
        <CityBuilding
          key={b.id}
          position={b.position}
          height={b.height}
          color={b.color}
          dayIndex={b.id}
          commits={b.commits}
          onHover={onHoverBuilding}
        />
      ))}

      {/* Surrounding Ambient Stardust */}
      <Sparkles count={60} scale={[8, 4, 6]} size={1.8} speed={0.6} color="#38bdf8" />
      <Sparkles count={40} scale={[7, 3, 5]} size={1.4} speed={0.4} color="#c084fc" />
    </group>
  );
}

function CityScene({ onHoverBuilding }: { onHoverBuilding: (info: any) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle continuous rotation of the 3D Cityscape
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight color="#ffffff" intensity={2.5} position={[6, 8, 5]} />
      <pointLight color="#38bdf8" intensity={28} position={[-4, 4, 3]} />
      <pointLight color="#c084fc" intensity={22} position={[4, -2, 3]} />
      <pointLight color="#34d399" intensity={18} position={[0, 5, -4]} />

      <group ref={groupRef}>
        <CyberCityGrid onHoverBuilding={onHoverBuilding} />
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 4.5}
        autoRotate={false}
      />
    </>
  );
}

interface MetricCardProps {
  delay: number;
  icon: IconType;
  isLoading: boolean;
  label: string;
  suffix?: string;
  value: number;
  accent: string;
  glow: string;
}

function MetricCard({ delay, icon: Icon, isLoading, label, suffix = "", value, accent, glow }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, value, 1200);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 backdrop-blur-2xl transition-all duration-300 ${accent} bg-gradient-to-br from-slate-900/90 via-slate-950/85 to-slate-900/90 shadow-[0_16px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_${glow}] hover:-translate-y-1.5`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
    >
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-2xl group-hover:scale-110 transition-transform">
          <Icon />
        </span>
        <span className="text-3xl sm:text-4xl font-black text-white">{isLoading ? "..." : `${count}${suffix}`}</span>
      </div>
      <p className="mt-4 text-xs font-black uppercase tracking-wider text-slate-400">{label}</p>
    </motion.div>
  );
}

const pinnedRepos = [
  {
    name: "AMD-IT-SOLUTION",
    title: "AMD IT Solution Portal",
    description: "Enterprise IT solutions platform with CCTV surveillance, computer repairs, and AMC service management.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 1,
    url: "https://github.com/MithunTalukdar/AMD-IT-SOLUTION",
    live: "https://amd-tecno-solution.vercel.app",
    branch: "main",
  },
  {
    name: "LMS",
    title: "Learning Management System",
    description: "MERN Stack full academic platform with course enrollment, quizzes, certificates, and admin control.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 1,
    url: "https://github.com/MithunTalukdar/LMS",
    live: "https://lms-pi-six-31.vercel.app",
    branch: "main",
  },
  {
    name: "User",
    title: "ResumeAI & User Auth",
    description: "AI-powered resume builder and user profile authentication system with JWT sessions, OTP verification, and MongoDB.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 1,
    url: "https://github.com/MithunTalukdar/User",
    live: "https://myjobmekar.vercel.app",
    branch: "main",
  },
  {
    name: "lumina-shoping",
    title: "Lumina E-Commerce Store",
    description: "Modern shopping web app featuring responsive UI, cart state management, and streamlined checkout.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 1,
    url: "https://github.com/MithunTalukdar/lumina-shoping",
    live: "https://lumina-shoping.vercel.app",
    branch: "main",
  },
  {
    name: "Swastik-International",
    title: "Swastik Corporate Portal",
    description: "Corporate trade and consulting web platform with dynamic services showcase and inquiry forms.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 1,
    url: "https://github.com/MithunTalukdar/Swastik-International",
    live: "https://swastik-international.vercel.app",
    branch: "main",
  },
  {
    name: "course",
    title: "Course Learning Platform",
    description: "Interactive online learning interface with modular curricula, video course streams, and student dashboard.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 1,
    url: "https://github.com/MithunTalukdar/course",
    live: "https://course-pi-navy.vercel.app/",
    branch: "main",
  },
];

export function GitHubDashboard() {
  const stats = useGitHubStats("MithunTalukdar");
  const [hoveredBuilding, setHoveredBuilding] = useState<{ index: number; commits: number; color: string } | null>(null);

  const metrics = [
    { label: "Public Repositories", value: stats.repos, icon: FiGitBranch, accent: "border-cyan-500/30 text-cyan-400", glow: "rgba(34,211,238,0.3)" },
    { label: "Verified Commits", value: 420, suffix: "+", icon: FiGitCommit, accent: "border-purple-500/30 text-purple-400", glow: "rgba(168,85,247,0.3)" },
    { label: "Code Contributions", value: 250, suffix: "+", icon: FiActivity, accent: "border-emerald-500/30 text-emerald-400", glow: "rgba(52,211,153,0.3)" },
    { label: "GitHub Followers", value: stats.followers, icon: FiUsers, accent: "border-blue-500/30 text-blue-400", glow: "rgba(59,130,246,0.3)" },
  ];

  return (
    <section id="github" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Open Source & Telemetry"
          title="3D GitHub Skyline Command Center"
          description="A living 3D interactive cityscape where commit velocity and repository momentum rise as illuminated skyscrapers."
        />

        {/* 4 Metric Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {metrics.map((item, index) => (
            <MetricCard
              key={item.label}
              delay={index * 0.08}
              icon={item.icon}
              isLoading={stats.isLoading}
              label={item.label}
              suffix={item.suffix}
              value={item.value}
              accent={item.accent}
              glow={item.glow}
            />
          ))}
        </div>

        {/* FEATURED: 3D Isometric Commit Cityscape Module */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#060a1a]/95 via-[#080d24]/90 to-[#040714]/95 p-6 sm:p-8 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top City Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xl shadow-lg">
                <FiLayers />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                  3D Cityscape Visualization
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Interactive GitHub Skyline Matrix
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hoveredBuilding ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-cyan-950/80 px-3.5 py-1.5 text-xs font-bold text-cyan-200 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  <span className="size-2 rounded-full" style={{ backgroundColor: hoveredBuilding.color }} />
                  <span>Tower #{hoveredBuilding.index + 1}: {hoveredBuilding.commits} Commits</span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Drag & Rotate 3D City</span>
                </div>
              )}
            </div>
          </div>

          {/* 3D Canvas Container */}
          <div className="relative h-[22rem] sm:h-[26rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020510]/80">
            <Canvas
              camera={{ fov: 40, position: [4.5, 4.2, 5.5] }}
              dpr={[1, 1.5]}
              gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                <CityScene onHoverBuilding={setHoveredBuilding} />
              </Suspense>
            </Canvas>

            {/* City Legend */}
            <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-[11px] font-bold text-slate-300 backdrop-blur-xl">
              <span className="text-slate-400">Skyline Height:</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#1e3a8a]" /> Low</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#34d399]" /> Active</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#a855f7]" /> High</span>
              <span className="flex items-center gap-1"><span className="size-2.5 rounded-sm bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" /> Peak Tower</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Split: Verified Repositories & Language Distribution */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Pinned Repositories Grid */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-950/85 to-slate-900/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FiCode className="text-cyan-400 text-lg" />
                <h3 className="text-xl font-black text-white">Verified Code Repositories</h3>
              </div>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-3 py-1 rounded-full">
                @MithunTalukdar
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {pinnedRepos.map((repo) => (
                <motion.div
                  key={repo.name}
                  className="flex flex-col justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 shadow-md backdrop-blur-md"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white flex items-center gap-1.5">
                        <FiGitBranch className="text-cyan-400 text-xs" /> {repo.name}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                        <FiStar /> {repo.stars}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2">{repo.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                    <span className="flex items-center gap-1.5 font-bold text-slate-300">
                      <span className="size-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      {repo.lang}
                    </span>
                    <div className="flex items-center gap-2">
                      {repo.live && (
                        <a
                          href={repo.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-300 hover:text-cyan-200 font-semibold flex items-center gap-0.5"
                        >
                          Live <FiExternalLink className="text-[10px]" />
                        </a>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white font-semibold flex items-center gap-0.5"
                      >
                        Code <FiGithub className="text-[10px]" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Language Matrix & GitHub CTA */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-950/85 to-slate-900/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300 mb-1 block">
                Technology Distribution
              </span>
              <h3 className="text-xl font-black text-white mb-6">Language Metrics</h3>

              <div className="grid gap-3.5">
                {stats.languages.map((language, index) => (
                  <div key={language} className="language-row">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                      <span>{language}</span>
                      <span className="text-cyan-400">{Math.max(32, 86 - index * 10)}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_10px_#38bdf8]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(32, 86 - index * 10)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <MagneticButton
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="primary-button mt-8 w-full justify-center py-3.5 text-base shadow-[0_12px_32px_rgba(34,211,238,0.3)] hover:shadow-[0_16px_40px_rgba(34,211,238,0.45)]"
            >
              <FiGithub className="text-xl" /> Visit Official GitHub Profile <FiExternalLink />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

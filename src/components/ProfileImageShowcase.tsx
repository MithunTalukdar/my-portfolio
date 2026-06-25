import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { CSSProperties, MouseEvent } from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb, SiTypescript } from "react-icons/si";
import profileImage from "../assets/profile-image.jpg";
import { useMouseParallax } from "../hooks/useMouseParallax";

const particles = Array.from({ length: 18 }, (_, index) => index);

export function ProfileImageShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const parallax = useMouseParallax(0.85);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), { stiffness: 170, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-13, 13]), { stiffness: 170, damping: 22 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="profile-showcase"
      initial={{ opacity: 0, scale: 0.92, y: 34 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
    >
      <div
        className="profile-parallax-layer"
        style={
          {
            "--profile-parallax-x": `${parallax.x * 18}px`,
            "--profile-parallax-y": `${parallax.y * 18}px`,
          } as CSSProperties
        }
      >
        <div className="profile-code-grid" aria-hidden="true" />
        <div className="profile-gradient-ring ring-one" aria-hidden="true" />
        <div className="profile-gradient-ring ring-two" aria-hidden="true" />
        <div className="profile-gradient-ring ring-three" aria-hidden="true" />

        <div className="profile-particles" aria-hidden="true">
          {particles.map((particle) => (
            <span
              key={particle}
              style={
                {
                  "--particle": particle,
                  "--particle-x": `${12 + ((particle * 43) % 74)}%`,
                  "--particle-y": `${8 + ((particle * 29) % 78)}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <motion.div className="profile-orbit-badge badge-react" animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 8, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
          <FaReact />
        </motion.div>
        <motion.div className="profile-orbit-badge badge-node" animate={shouldReduceMotion ? undefined : { x: [0, 10, 0], rotate: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <FaNodeJs />
        </motion.div>
        <motion.div className="profile-orbit-badge badge-ts" animate={shouldReduceMotion ? undefined : { y: [0, 9, 0], rotate: [0, 10, 0] }} transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut" }}>
          <SiTypescript />
        </motion.div>
        <motion.div className="profile-orbit-badge badge-mongo" animate={shouldReduceMotion ? undefined : { x: [0, -9, 0], rotate: [0, -10, 0] }} transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}>
          <SiMongodb />
        </motion.div>

        <motion.div
          className="profile-frame-tilt"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={shouldReduceMotion ? { x: "-50%", y: "-50%" } : { x: "-50%", y: "-50%", rotateX, rotateY }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.035, rotateZ: 1.2 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <div className="profile-frame-glow" aria-hidden="true" />
          <div className="profile-frame">
            <img src={profileImage} alt="Mithun Talukdar, full stack web developer" loading="lazy" decoding="async" />
          </div>
          <div className="profile-scanline" aria-hidden="true" />
        </motion.div>

        <div className="profile-code-chip chip-one" aria-hidden="true">
          const developer = "MERN";
        </div>
        <div className="profile-code-chip chip-two" aria-hidden="true">
          deploy.status: ready
        </div>
      </div>
    </motion.div>
  );
}

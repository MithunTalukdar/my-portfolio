import { FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { motion } from "framer-motion";
import { useMouseParallax } from "../hooks/useMouseParallax";

const logos = [
  { label: "React", icon: FaReact, className: "left-[6%] top-[18%] text-cyan-300", depth: 26 },
  { label: "Node", icon: FaNodeJs, className: "right-[10%] top-[19%] text-emerald-300", depth: -20 },
  { label: "MongoDB", icon: SiMongodb, className: "left-[12%] bottom-[18%] text-green-300", depth: -16 },
  { label: "JavaScript", icon: FaJs, className: "right-[17%] bottom-[15%] text-yellow-300", depth: 18 },
];

export function FloatingTechLogos() {
  const parallax = useMouseParallax(1);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {logos.map((logo, index) => {
        const Icon = logo.icon;
        return (
          <motion.div
            key={logo.label}
            className={`floating-tech-logo absolute ${logo.className}`}
            animate={{
              x: parallax.x * logo.depth,
              y: parallax.y * logo.depth,
              rotateY: [0, 18, -18, 0],
              rotateX: [0, -10, 10, 0],
            }}
            transition={{ rotateY: { repeat: Infinity, duration: 8 + index, ease: "easeInOut" }, rotateX: { repeat: Infinity, duration: 9 + index, ease: "easeInOut" } }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
}

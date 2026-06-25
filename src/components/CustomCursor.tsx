import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, input, textarea, [role='button']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-8 rounded-full border border-cyan-300/70 mix-blend-difference md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: active ? 1.9 : 1,
        opacity: active ? 0.85 : 0.55,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.4 }}
    />
  );
}

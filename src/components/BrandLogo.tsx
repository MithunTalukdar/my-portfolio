import { motion } from "framer-motion";
import clsx from "clsx";
import mtMonogram from "../assets/mt-monogram.svg";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  animated?: boolean;
}

export function BrandLogo({ className, imageClassName, animated = true }: BrandLogoProps) {
  const Wrapper = animated ? motion.div : "div";

  return (
    <Wrapper
      className={clsx("brand-logo", className)}
      {...(animated
        ? {
            animate: { y: [0, -3, 0], filter: ["drop-shadow(0 0 12px rgba(34,211,238,.35))", "drop-shadow(0 0 22px rgba(168,85,247,.35))", "drop-shadow(0 0 12px rgba(34,211,238,.35))"] },
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }
        : {})}
    >
      <span className="brand-logo-glow" />
      <img src={mtMonogram} alt="Mithun Talukdar MT Monogram Logo" className={clsx("brand-logo-image", imageClassName)} />
    </Wrapper>
  );
}

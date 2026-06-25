import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps extends ComponentPropsWithoutRef<typeof motion.div> {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        "glass-panel relative overflow-hidden rounded-lg border border-white/10 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

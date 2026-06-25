import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

interface LoadingScreenProps {
  isComplete: boolean;
}

export function LoadingScreen({ isComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#050711]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1, pointerEvents: isComplete ? "none" : "auto" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="text-center">
        <BrandLogo className="mx-auto size-28" imageClassName="p-1" />
        <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.32em] text-slate-400">Loading Portfolio</p>
      </div>
    </motion.div>
  );
}

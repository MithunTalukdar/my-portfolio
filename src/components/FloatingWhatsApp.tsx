import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "../constants/portfolio";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hi Mithun, I came across your portfolio and would like to connect with you!"
  );
  const whatsappUrl = `https://wa.me/${profile.whatsappNumber || "918777673839"}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md"
          >
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat with Mithun on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Mithun on WhatsApp"
        title="Chat on WhatsApp (+91 87776 73839)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, rotate: 6 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.45)] transition-shadow duration-300 hover:shadow-[0_15px_35px_rgba(16,185,129,0.65)]"
      >
        {/* Pulsing radar ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 opacity-75 animate-ping pointer-events-none group-hover:opacity-0" />
        <FaWhatsapp className="text-2xl drop-shadow" />
      </motion.a>
    </div>
  );
}

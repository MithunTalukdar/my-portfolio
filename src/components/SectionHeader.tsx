import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  // Split title into individual words while preserving natural spaces
  const words = useMemo(() => title.split(" "), [title]);

  const isCenter = align === "center";

  return (
    <motion.div
      className={`relative mx-auto mb-12 max-w-3xl ${isCenter ? "text-center" : "text-left"} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* 1. Small Eyebrow Label with cinematic letter-spacing reveal & subtle ambient beacon */}
      <motion.div
        variants={
          shouldReduceMotion
            ? {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } },
              }
            : {
                hidden: {
                  opacity: 0,
                  y: 12,
                  letterSpacing: "0.15em",
                  filter: "blur(6px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  letterSpacing: "0.28em",
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }
        }
        className={`inline-flex items-center gap-2 font-semibold uppercase text-xs sm:text-sm text-cyan-300 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </span>
        <span className="tracking-[0.28em] drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
          {eyebrow}
        </span>
      </motion.div>

      {/* 2. Main Cinematic Headline with Word-by-Word Reveal & Light Sweep */}
      <div className="relative mt-3 inline-block max-w-full">
        {/* Subtle Light-Sweep / Shimmer passing across headline on reveal */}
        {!shouldReduceMotion && (
          <motion.div
            variants={{
              hidden: { x: "-120%", opacity: 0 },
              visible: {
                x: "220%",
                opacity: [0, 0.8, 0],
                transition: {
                  duration: 1.1,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="pointer-events-none absolute inset-y-0 w-2/5 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/35 via-white/50 to-transparent blur-md mix-blend-screen z-10"
            aria-hidden="true"
          />
        )}

        <h2 className="text-[clamp(2rem,7vw,3.15rem)] font-black leading-[1.12] tracking-tight text-slate-50 md:text-5xl">
          {words.map((word, index) => {
            // Determine if the word is an accent word (e.g. '&', 'AI', 'Full-Stack', or specific highlights)
            const isAccent =
              word === "&" ||
              word.toLowerCase() === "ai" ||
              word.toLowerCase() === "mern" ||
              word.toLowerCase() === "developer" ||
              word.toLowerCase() === "physics";

            return (
              <span
                key={`${word}-${index}`}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                <motion.span
                  custom={index}
                  variants={
                    shouldReduceMotion
                      ? {
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { duration: 0.35, delay: index * 0.03 },
                          },
                        }
                      : {
                          hidden: {
                            opacity: 0,
                            y: 22,
                            scale: 0.94,
                            filter: "blur(10px)",
                            textShadow: "0 0 0px rgba(34,211,238,0)",
                          },
                          visible: (i: number) => ({
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            textShadow: [
                              "0 0 0px rgba(34,211,238,0)",
                              "0 0 24px rgba(34,211,238,0.55), 0 0 45px rgba(168,85,247,0.3)",
                              "0 0 0px rgba(34,211,238,0)",
                            ],
                            transition: {
                              duration: 0.75,
                              delay: 0.08 + i * 0.065,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          }),
                        }
                  }
                  className={`inline-block transition-colors duration-300 ${
                    isAccent
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                      : "text-slate-50"
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h2>
      </div>

      {/* 3. Supporting Subtitle / Description with Delayed Soft Fade-Up */}
      {description ? (
        <motion.p
          variants={
            shouldReduceMotion
              ? {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
                }
              : {
                  hidden: {
                    opacity: 0,
                    y: 16,
                    filter: "blur(6px)",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.7,
                      delay: 0.25 + words.length * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }
          }
          className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}


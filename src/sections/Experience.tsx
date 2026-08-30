import { useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCode, FiDatabase, FiLayers, FiServer, FiShield } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { experience } from "../constants/portfolio";

const capabilityIcons = [FiCode, FiLayers, FiServer, FiDatabase, FiShield];

export function Experience() {
  const [activeCapability, setActiveCapability] = useState(experience[0].title);

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/3 size-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/3 size-96 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Proven Capabilities"
          title="Full-Stack Experience Timeline"
          description="Demonstrated delivery capabilities across all critical stages of modern web development and production architecture."
        />

        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] items-start">
          {/* Left: 3D Experience Holographic Stage */}
          <div className="sticky top-28">
            <SectionAvatar focusLabel={activeCapability} variant="experience" />
          </div>

          {/* Right: Vertical Timeline & Futuristic Cards */}
          <div className="relative">
            {/* Glowing vertical connector line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-purple-500 opacity-40 hidden sm:block" />

            <div className="grid gap-6">
              {experience.map((item, index) => {
                const Icon = capabilityIcons[index % capabilityIcons.length];
                const isSelected = activeCapability === item.title;

                return (
                  <motion.article
                    key={item.title}
                    className={`relative sm:pl-16 transition-all duration-300 ${
                      isSelected ? "scale-[1.01]" : ""
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setActiveCapability(item.title)}
                  >
                    {/* Glowing Sequence Node */}
                    <div className="absolute left-3.5 top-6 hidden sm:flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-950 shadow-[0_0_16px_#34d399]">
                      <span className="text-[10px] font-black text-emerald-400">{index + 1}</span>
                    </div>

                    {/* Card Container */}
                    <div
                      className={`overflow-hidden rounded-2xl border p-6 sm:p-7 backdrop-blur-2xl bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 ${
                        isSelected
                          ? "border-emerald-400/80 shadow-[0_0_30px_rgba(52,211,153,0.25)]"
                          : "border-white/10 hover:border-emerald-400/40"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xl">
                            <Icon />
                          </span>
                          <div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
                              Capability 0{index + 1}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white">{item.title}</h3>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
                          <FiCheckCircle className="text-emerald-400" /> Production Verified
                        </span>
                      </div>

                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">{item.detail}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

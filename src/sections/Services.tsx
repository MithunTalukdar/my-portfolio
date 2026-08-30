import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { TiltCard } from "../components/TiltCard";
import { services } from "../constants/portfolio";

const serviceGradients = [
  { border: "border-cyan-500/30", bg: "from-cyan-500/15 via-slate-900/90 to-blue-600/10", glow: "text-cyan-300", tag: "Full Stack" },
  { border: "border-purple-500/30", bg: "from-purple-500/15 via-slate-900/90 to-pink-600/10", glow: "text-purple-300", tag: "UI / UX" },
  { border: "border-emerald-500/30", bg: "from-emerald-500/15 via-slate-900/90 to-teal-600/10", glow: "text-emerald-300", tag: "MERN Stack" },
  { border: "border-blue-500/30", bg: "from-blue-500/15 via-slate-900/90 to-indigo-600/10", glow: "text-blue-300", tag: "Backend APIs" },
  { border: "border-amber-500/30", bg: "from-amber-500/15 via-slate-900/90 to-orange-600/10", glow: "text-amber-300", tag: "Databases" },
  { border: "border-fuchsia-500/30", bg: "from-fuchsia-500/15 via-slate-900/90 to-rose-600/10", glow: "text-fuchsia-300", tag: "DevOps & Cloud" },
];

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -right-48 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-48 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Specialized Services"
          title="What I Can Build For You"
          description="High-quality, end-to-end technical solutions tailored for startups, clients, and modern businesses."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const style = serviceGradients[index % serviceGradients.length];

            return (
              <TiltCard
                key={service.title}
                className={`group relative overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br ${style.bg} p-7 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] flex flex-col justify-between`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
              >
                {/* Ambient Top Flare */}
                <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-white/5 blur-2xl group-hover:bg-cyan-400/20 transition-all" />

                <div>
                  {/* Top Bar: Icon + Service Index */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className={`flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 ${style.glow} text-2xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md`}
                      whileHover={{ scale: 1.15, rotate: 6 }}
                    >
                      <Icon />
                    </motion.div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className={`inline-block mt-5 text-[11px] font-black uppercase tracking-widest ${style.glow}`}>
                    {style.tag}
                  </span>

                  {/* Title & Description */}
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Proof Pill & Arrow */}
                <div className="mt-7 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <FiCheckCircle /> Production Ready
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all">
                    <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

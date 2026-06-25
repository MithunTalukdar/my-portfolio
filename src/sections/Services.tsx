import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { SectionHeader } from "../components/SectionHeader";
import { TiltCard } from "../components/TiltCard";
import { services } from "../constants/portfolio";

export function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="services-aurora" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Services" title="Development Services" description="Focused offerings for clients, startups, and teams that need clean execution." />
        <div className="service-grid grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <TiltCard
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.div className="service-float-shell" animate={{ y: [0, -8, 0] }} transition={{ delay: index * 0.14, duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="service-card-shine" />
                  <motion.div className="service-icon" whileHover={{ rotate: 8, scale: 1.08 }}>
                    <Icon />
                  </motion.div>
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200">Service 0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-black text-white">{service.title}</h3>
                  <p className="mt-3 min-h-24 leading-8 text-slate-300">{service.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="service-proof">
                      <FiCheckCircle /> Delivery ready
                    </span>
                    <span className="service-arrow">
                      <FiArrowUpRight />
                    </span>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

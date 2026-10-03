import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { profile } from "../constants/portfolio";
import {
  createMailtoUrl,
  createWhatsAppUrl,
  sendContactInquiry,
  type ContactFormData,
} from "../utils/email";

type Status = "idle" | "sending" | "success" | "error";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [lastSentData, setLastSentData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const currentData = { ...formData };
    setLastSentData(currentData);

    // 1. Immediately open WhatsApp to Mithun's number (+91 87776 73839) with the full formatted project requirements
    const whatsappUrl = createWhatsAppUrl(currentData);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // 2. Directly send the inquiry to Mithun's Gmail (mithuntalukdar2003@gmail.com)
    try {
      const result = await sendContactInquiry(currentData);
      if (result.success) {
        setStatus("success");
        setFormData(initialFormData);
        // Revert status to idle after 8 seconds
        setTimeout(() => setStatus("idle"), 8000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const contactCards = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp Direct",
      value: profile.whatsappFormatted || "+91 87776 73839",
      href: `https://wa.me/${profile.whatsappNumber || "918777673839"}?text=${encodeURIComponent("Hi Mithun, I saw your portfolio and would like to connect!")}`,
      badge: "Instant Chat",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400/60",
    },
    {
      icon: FiMail,
      label: "Email Address",
      value: profile.email,
      href: `mailto:${profile.email}`,
      badge: "Direct Inbox",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-400/60",
    },
    {
      icon: FiPhone,
      label: "Direct Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/30 hover:border-blue-400/60",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Canning, South 24 Parganas, WB",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/30 hover:border-purple-400/60",
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -right-40 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 size-96 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something Great"
          description="Have a new project, hiring opportunity, or technical challenge in mind? Send a message directly to my Email & WhatsApp."
        />

        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] items-start">
          {/* Left Column: 3D Communication Visual & Info Cards */}
          <div className="grid gap-6">
            {/* 3D Communication Stage */}
            <SectionAvatar
              focusLabel={
                status === "success"
                  ? "Message Delivered to Email & WhatsApp!"
                  : status === "sending"
                  ? "Transmitting Message..."
                  : status === "error"
                  ? "Direct Channels Ready"
                  : "Communication Desk"
              }
              mood={status}
              variant="contact"
            />

            {/* Direct Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              {contactCards.map((item, index) => {
                const Icon = item.icon;
                const cardContent = (
                  <motion.div
                    className="relative flex items-center gap-3.5 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl border text-lg ${item.accent}`}>
                      <Icon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                        {item.badge && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{item.value}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div key={item.label}>{cardContent}</div>
                );
              })}
            </div>

            {/* Social Connectivity Bar */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-4 px-6 backdrop-blur-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <HiSparkles className="text-cyan-400" /> Active on Direct Channels
              </span>
              <div className="flex items-center gap-2.5">
                <motion.a
                  href={`https://wa.me/${profile.whatsappNumber || "918777673839"}?text=${encodeURIComponent("Hi Mithun, I saw your portfolio and would like to chat!")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:text-white hover:border-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  whileHover={{ scale: 1.15 }}
                  title="Chat on WhatsApp"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="text-base" />
                </motion.a>
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.15 }}
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </motion.a>
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.15 }}
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </motion.a>
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.15 }}
                  title="Email"
                  aria-label="Email"
                >
                  <FiMail />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Seamless Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-slate-900/95 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Message Channel</span>
              <h3 className="mt-1 text-2xl font-black text-white">Send Direct Inquiry</h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="floating-field">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  placeholder=" "
                />
                <span>Your Name</span>
              </label>
              <label className="floating-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <span>Your Email Address</span>
              </label>
            </div>

            <label className="floating-field mt-5 block">
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                minLength={3}
                placeholder=" "
              />
              <span>Project Subject</span>
            </label>

            <label className="floating-field mt-5 block">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                placeholder=" "
                rows={5}
              />
              <span>Tell me about your project, timeline, or requirements...</span>
            </label>

            <motion.button
              className="primary-button mt-7 w-full justify-center py-3.5 text-base shadow-[0_12px_30px_rgba(34,211,238,0.3)] hover:shadow-[0_16px_40px_rgba(34,211,238,0.45)]"
              disabled={status === "sending"}
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "sending" ? (
                <>
                  <FiLoader className="animate-spin text-lg" /> Sending Message...
                </>
              ) : (
                <>
                  <FiSend className="text-lg" /> Send Message
                </>
              )}
            </motion.button>

            {/* Seamless Inline Status Feedback */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success-alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-sm font-semibold text-emerald-300 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiCheckCircle className="text-xl text-emerald-400 shrink-0" />
                    <span className="truncate">Message sent successfully to Email & WhatsApp!</span>
                  </div>
                  <a
                    href={createWhatsAppUrl(lastSentData)}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-200 hover:bg-emerald-500/30 hover:text-white transition-colors"
                  >
                    <FaWhatsapp className="text-emerald-400 text-sm" /> WhatsApp
                  </a>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error-alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4 text-sm font-semibold text-amber-300 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FiAlertCircle className="text-xl text-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm truncate">Delivery issue. Send directly via:</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={createWhatsAppUrl(lastSentData)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-500/30"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a
                      href={createMailtoUrl(lastSentData)}
                      className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-white hover:bg-cyan-500/30"
                    >
                      <FiMail /> Mail
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

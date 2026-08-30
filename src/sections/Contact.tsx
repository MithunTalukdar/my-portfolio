import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { MagneticButton } from "../components/MagneticButton";
import { SectionHeader } from "../components/SectionHeader";
import { SectionAvatar } from "../components/SectionAvatar";
import { profile } from "../constants/portfolio";
import { emailConfig, isEmailConfigured } from "../utils/email";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;

    try {
      if (isEmailConfigured) {
        await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form, { publicKey: emailConfig.publicKey });
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 800));
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const contactCards = [
    { icon: FiMail, label: "Email Address", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FiPhone, label: "Direct Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: FiGithub, label: "GitHub Profile", value: "github.com/MithunTalukdar", href: profile.github },
    { icon: FiMapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute -right-40 top-1/4 size-96 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-40 bottom-1/4 size-96 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something Great"
          description="Have a new project, hiring opportunity, or technical challenge in mind? Send a message and let's bring it to life."
        />

        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] items-start">
          {/* Left Column: 3D Communication Visual & Info Cards */}
          <div className="grid gap-6">
            {/* 3D Communication Stage */}
            <SectionAvatar
              focusLabel={status === "success" ? "Message Delivered!" : status === "sending" ? "Transmitting..." : status === "error" ? "Direct Email Ready" : "Communication Desk"}
              mood={status}
              variant="contact"
            />

            {/* Direct Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              {contactCards.map((item, index) => {
                const Icon = item.icon;
                const cardContent = (
                  <motion.div
                    className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-lg">
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{item.value}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
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
                <HiSparkles className="text-cyan-400" /> Active on Social
              </span>
              <div className="flex items-center gap-2.5">
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

          {/* Right Column: Modern Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-slate-900/90 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <input type="hidden" name="to_email" value={emailConfig.toEmail} />

            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">Message Channel</span>
              <h3 className="mt-1 text-2xl font-black text-white">Send A Direct Inquiry</h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="floating-field">
                <input name="from_name" required minLength={2} placeholder=" " />
                <span>Your Name</span>
              </label>
              <label className="floating-field">
                <input type="email" name="reply_to" required placeholder=" " />
                <span>Your Email Address</span>
              </label>
            </div>

            <label className="floating-field mt-5 block">
              <input name="subject" required minLength={3} placeholder=" " />
              <span>Project Subject</span>
            </label>

            <label className="floating-field mt-5 block">
              <textarea name="message" required minLength={10} placeholder=" " rows={5} />
              <span>Tell me about your project or role...</span>
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
                  <FiLoader className="animate-spin text-lg" /> Transmitting Message...
                </>
              ) : (
                <>
                  <FiSend className="text-lg" /> Send Message
                </>
              )}
            </motion.button>

            {/* Status Feedback Alert */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-sm font-semibold text-emerald-300 backdrop-blur-md"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 8 }}
                >
                  <FiCheckCircle className="text-xl shrink-0" />
                  <span>Message sent successfully! I will respond to your inquiry shortly.</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-sm font-semibold text-red-300 backdrop-blur-md"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 8 }}
                >
                  <FiAlertCircle className="text-xl shrink-0" />
                  <span>Message could not be sent. Please email directly at {profile.email}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

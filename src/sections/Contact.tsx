import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend, FiUser } from "react-icons/fi";
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
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const contactCards = [
    { icon: FiUser, label: "Name", value: profile.name },
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FiPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: FiGithub, label: "GitHub", value: profile.github, href: profile.github },
    { icon: FiMapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="section-padding contact-section relative overflow-hidden">
      <div className="contact-floating contact-floating-one" />
      <div className="contact-floating contact-floating-two" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="Let's Build Something Useful" description="Use the form for project discussions, hiring opportunities, or collaboration requests." />
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="grid content-start gap-5">
            <SectionAvatar
              focusLabel={status === "success" ? "Message sent" : status === "sending" ? "Sending message" : status === "error" ? "Try direct email" : "Contact form"}
              mood={status}
              variant="contact"
            />
            <motion.div className="contact-intro-card" initial={{ opacity: 0, y: 24 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
              <span className="contact-intro-icon">
                <FiMessageCircle />
              </span>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-cyan-200">Open for collaboration</p>
              <h3 className="mt-3 text-3xl font-black text-white">Have an idea, role, or product to build?</h3>
              <p className="mt-4 leading-8 text-slate-300">Send a concise brief and I will help turn it into a practical next step.</p>
              <MagneticButton href={`mailto:${profile.email}`} className="primary-button mt-6 w-full justify-center">
                <FiMail /> Email Directly
              </MagneticButton>
            </motion.div>

            <div className="contact-direct-card">
              <a href={`mailto:${profile.email}`}>
                <FiMail /> {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <FiPhone /> {profile.phone}
              </a>
            </div>

            <div className="grid gap-4">
              {contactCards.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    className="contact-card"
                    initial={{ opacity: 0, x: -24 }}
                    transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ x: 6, y: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <span className="contact-card-icon">
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
                      <p className="mt-1 break-words font-semibold text-white">{item.value}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="contact-social-row">
              {[
                { icon: FiGithub, label: "GitHub", href: profile.github },
                { icon: FiLinkedin, label: "LinkedIn", href: profile.linkedin },
                { icon: FiMail, label: "Email", href: `mailto:${profile.email}` },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a key={item.label} className="contact-social-icon" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} aria-label={item.label} whileHover={{ y: -5, rotate: 6 }} whileTap={{ scale: 0.92 }}>
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-form-panel"
            initial={{ opacity: 0, y: 24 }}
            viewport={{ once: true, margin: "-80px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <input type="hidden" name="to_email" value={emailConfig.toEmail} />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="floating-field">
                <input name="from_name" required minLength={2} placeholder=" " />
                <span>Full Name</span>
              </label>
              <label className="floating-field">
                <input type="email" name="reply_to" required placeholder=" " />
                <span>Email Address</span>
              </label>
            </div>
            <label className="floating-field mt-5">
              <input name="subject" required minLength={3} placeholder=" " />
              <span>Subject</span>
            </label>
            <label className="floating-field mt-5">
              <textarea name="message" required minLength={10} placeholder=" " />
              <span>Message</span>
            </label>
            <motion.button className="primary-button mt-6 w-full justify-center" disabled={status === "sending"} type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              {status === "sending" ? <FiLoader className="animate-spin" /> : <FiSend />} {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.p
                  key="success"
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-alert success"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 8 }}
                >
                  <FiCheckCircle /> Message sent successfully. I will get back to you soon.
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  key="error"
                  animate={{ opacity: 1, y: 0 }}
                  className="contact-alert error"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 8 }}
                >
                  <FiAlertCircle /> Message could not be sent. Please try again or email directly.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

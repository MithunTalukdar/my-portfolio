import { FiArrowUp, FiMail, FiPhone } from "react-icons/fi";
import { profile, socialLinks } from "../constants/portfolio";

export function Footer() {
  return (
    <footer className="footer-panel relative border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold text-slate-300">© 2026 Mithun Talukdar. All Rights Reserved.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-400 lg:justify-start">
            <a className="footer-contact-link" href={`mailto:${profile.email}`}>
              <FiMail /> Contact: {profile.email}
            </a>
            <a className="footer-contact-link" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              <FiPhone /> Phone: {profile.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="icon-button" aria-label={link.label}>
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="flex justify-center lg:justify-end">
          <a href="#home" className="icon-button" aria-label="Scroll to top">
            <FiArrowUp />
          </a>
        </div>
      </div>
      <span className="sr-only">{profile.name}</span>
    </footer>
  );
}

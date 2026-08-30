import type { SVGProps } from "react";

// 1. 3D House (Home)
export function Home3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_12px_rgba(59,130,246,0.5)]" {...props}>
      <defs>
        <linearGradient id="homeRoofGrad" x1="10" y1="12" x2="54" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="homeRoofTrim" x1="6" y1="30" x2="58" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="homeWallGrad" x1="16" y1="30" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="homeDoorGrad" x1="26" y1="38" x2="38" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="homeChimneyGrad" x1="42" y1="14" x2="48" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
      </defs>
      {/* Chimney */}
      <rect x="41" y="14" width="7" height="12" rx="1.5" fill="url(#homeChimneyGrad)" />
      <rect x="40" y="13" width="9" height="3" rx="1" fill="#fb7185" />
      {/* Main Walls */}
      <path d="M16 28L48 28V54C48 55.6569 46.6569 57 45 57H19C17.3431 57 16 55.6569 16 54V28Z" fill="url(#homeWallGrad)" />
      {/* House Shadow */}
      <path d="M16 28L32 15L48 28H16Z" fill="#94a3b8" opacity="0.4" />
      {/* Roof */}
      <path d="M32 9L7 30H57L32 9Z" fill="url(#homeRoofGrad)" />
      <path d="M5 29L32 8L59 29C59.6 29.5 59.2 30.5 58.4 30.5H5.6C4.8 30.5 4.4 29.5 5 29Z" fill="url(#homeRoofTrim)" />
      {/* Roof Light Bevel */}
      <path d="M32 11L9 29H13L32 14L51 29H55L32 11Z" fill="#dbeafe" opacity="0.6" />
      {/* Door */}
      <rect x="26" y="38" width="12" height="19" rx="2.5" fill="url(#homeDoorGrad)" />
      {/* Window */}
      <rect x="20" y="34" width="7" height="7" rx="1.5" fill="#38bdf8" />
      <rect x="37" y="34" width="7" height="7" rx="1.5" fill="#38bdf8" />
      {/* Door Handle */}
      <circle cx="35.5" cy="48" r="1" fill="#facc15" />
    </svg>
  );
}

// 2. 3D Person Avatar (About)
export function About3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_14px_rgba(56,189,248,0.55)]" {...props}>
      <defs>
        <linearGradient id="aboutHeadGrad" x1="20" y1="10" x2="44" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="aboutBodyGrad" x1="12" y1="36" x2="52" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <radialGradient id="aboutLightGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28 17) scale(12)">
          <stop stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Head Sphere */}
      <circle cx="32" cy="22" r="12" fill="url(#aboutHeadGrad)" />
      <circle cx="28" cy="18" r="6" fill="url(#aboutLightGlow)" />
      {/* Body Torso */}
      <path
        d="M14 53C14 43.0589 22.0589 35 32 35C41.9411 35 50 43.0589 50 53C50 55.2091 48.2091 57 46 57H18C15.7909 57 14 55.2091 14 53Z"
        fill="url(#aboutBodyGrad)"
      />
      {/* Body Light Arch */}
      <path
        d="M17 52C18.5 44 24.5 37 32 37C39.5 37 45.5 44 47 52"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

// 3. 3D Graduation Cap on Stacked Books (Education)
export function Education3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_12px_rgba(234,179,8,0.45)]" {...props}>
      <defs>
        <linearGradient id="bookYellow" x1="14" y1="46" x2="50" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="bookPurple" x1="14" y1="36" x2="50" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="60%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#6b21a8" />
        </linearGradient>
        <linearGradient id="gradCapGrad" x1="10" y1="18" x2="54" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>
      {/* Bottom Yellow Book */}
      <rect x="14" y="47" width="36" height="9" rx="3" fill="url(#bookYellow)" />
      <rect x="17" y="49" width="30" height="5" rx="1.5" fill="#fef08a" opacity="0.8" />
      {/* Middle Purple Book */}
      <rect x="16" y="38" width="32" height="9" rx="3" fill="url(#bookPurple)" />
      <rect x="19" y="40" width="26" height="5" rx="1.5" fill="#e9d5ff" opacity="0.8" />
      {/* Cap Skull Base */}
      <path d="M22 25C22 25 24 33 32 33C40 33 42 25 42 25" fill="#1e293b" />
      {/* Cap Diamond Top */}
      <polygon points="32,12 54,23 32,30 10,23" fill="url(#gradCapGrad)" />
      <polygon points="32,13 52,23 32,29 12,23" stroke="#475569" strokeWidth="1" />
      {/* Button & Golden Tassel */}
      <circle cx="32" cy="21" r="2" fill="#facc15" />
      <path d="M32 21Q46 22 47 34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      <circle cx="47" cy="35" r="1.5" fill="#facc15" />
    </svg>
  );
}

// 4. 3D Code Bracket Card (Skills)
export function Skills3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_14px_rgba(168,85,247,0.55)]" {...props}>
      <defs>
        <linearGradient id="codeCardGrad" x1="10" y1="12" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2e1065" />
          <stop offset="50%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="codeBracketGrad" x1="18" y1="20" x2="46" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      {/* Card Vessel */}
      <rect x="10" y="12" width="44" height="42" rx="10" fill="url(#codeCardGrad)" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="1.5" />
      <rect x="12" y="14" width="40" height="38" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Brackets < / > */}
      {/* Left < */}
      <path d="M23 23L16 33L23 43" stroke="url(#codeBracketGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Slash / */}
      <path d="M35 21L29 45" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Right > */}
      <path d="M41 23L48 33L41 43" stroke="url(#codeBracketGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 5. 3D Rocket Blasting (Projects)
export function Projects3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_14px_rgba(239,68,68,0.5)]" {...props}>
      <defs>
        <linearGradient id="rocketBodyGrad" x1="24" y1="10" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="rocketConeGrad" x1="36" y1="8" x2="52" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="rocketFlame" x1="16" y1="44" x2="26" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      {/* Smoke Clouds */}
      <circle cx="16" cy="50" r="5" fill="#e2e8f0" opacity="0.85" />
      <circle cx="22" cy="54" r="6" fill="#cbd5e1" opacity="0.9" />
      <circle cx="12" cy="44" r="4" fill="#94a3b8" opacity="0.75" />
      {/* Thruster Flame */}
      <path d="M19 41L12 55L27 48L19 41Z" fill="url(#rocketFlame)" />
      {/* Rocket Fins */}
      <path d="M22 30L14 36L20 44L28 38L22 30Z" fill="#3b82f6" />
      <path d="M38 18L44 26L36 34L30 28L38 18Z" fill="#3b82f6" />
      {/* Rocket Main Body */}
      <path
        d="M48 12C38 14 26 24 22 38L32 46C44 40 50 26 52 16C52 14 50 12 48 12Z"
        fill="url(#rocketBodyGrad)"
      />
      {/* Nose Cone */}
      <path d="M48 12C44 13 41 15 39 18L46 25C49 23 51 20 52 16L48 12Z" fill="url(#rocketConeGrad)" />
      {/* Porthole Window */}
      <circle cx="38" cy="27" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  );
}

// 6. 3D Briefcase (Experience)
export function Experience3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_12px_rgba(217,119,6,0.45)]" {...props}>
      <defs>
        <linearGradient id="briefcaseBody" x1="10" y1="22" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="40%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="briefcaseTopFlap" x1="10" y1="22" x2="54" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <path d="M26 22V16C26 14.8954 26.8954 14 28 14H36C37.1046 14 38 14.8954 38 16V22" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
      {/* Main Box */}
      <rect x="10" y="22" width="44" height="32" rx="5" fill="url(#briefcaseBody)" />
      {/* Top Flap */}
      <path d="M10 26C10 23.7909 11.7909 22 14 22H50C52.2091 22 54 23.7909 54 26V36L35 40C33.5 40.3 30.5 40.3 29 40L10 36V26Z" fill="url(#briefcaseTopFlap)" />
      {/* Straps */}
      <rect x="18" y="22" width="4" height="32" fill="#78350f" opacity="0.6" />
      <rect x="42" y="22" width="4" height="32" fill="#78350f" opacity="0.6" />
      {/* Gold Buckle */}
      <rect x="29" y="36" width="6" height="7" rx="1.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <rect x="31" y="39" width="2" height="2" fill="#78350f" />
    </svg>
  );
}

// 7. 3D Gear / Cog (Services)
export function Services3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_14px_rgba(14,165,233,0.55)]" {...props}>
      <defs>
        <linearGradient id="gearGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <radialGradient id="gearCoreGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) scale(14)">
          <stop stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      {/* Gear Teeth & Body */}
      <path
        d="M32 10L35.5 15.5L42 14.5L43.5 21L49.5 22.5L48.5 29L54 32L48.5 35L49.5 41.5L43.5 43L42 49.5L35.5 48.5L32 54L28.5 48.5L22 49.5L20.5 43L14.5 41.5L15.5 35L10 32L15.5 29L14.5 22.5L20.5 21L22 14.5L28.5 15.5L32 10Z"
        fill="url(#gearGrad)"
        stroke="#7dd3fc"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner Metallic Bevel */}
      <circle cx="32" cy="32" r="14" fill="url(#gearCoreGlow)" stroke="#bae6fd" strokeWidth="1.5" />
      {/* Center Hole */}
      <circle cx="32" cy="32" r="6" fill="#031525" stroke="#38bdf8" strokeWidth="1.5" />
    </svg>
  );
}

// 8. 3D GitHub Orb (GitHub)
export function GitHub3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_14px_rgba(168,85,247,0.6)]" {...props}>
      <defs>
        <radialGradient id="githubOrb" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) scale(24)">
          <stop offset="0%" stopColor="#3b0764" />
          <stop offset="70%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#09090b" />
        </radialGradient>
      </defs>
      {/* Glowing Outer Ring */}
      <circle cx="32" cy="32" r="23" stroke="#a855f7" strokeWidth="2.5" strokeOpacity="0.8" />
      <circle cx="32" cy="32" r="22" fill="url(#githubOrb)" />
      {/* White Octocat */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 18C24.268 18 18 24.268 18 32C18 38.188 22.012 43.436 27.588 45.288C28.288 45.416 28.544 44.984 28.544 44.616C28.544 44.288 28.532 43.216 28.528 42.064C24.632 42.912 23.812 40.384 23.812 40.384C23.176 38.764 22.256 38.336 22.256 38.336C20.984 37.468 22.352 37.484 22.352 37.484C23.756 37.584 24.496 38.928 24.496 38.928C25.748 41.072 27.78 40.452 28.58 40.088C28.708 39.18 29.072 38.56 29.472 38.208C26.364 37.856 23.092 36.656 23.092 31.296C23.092 29.768 23.636 28.52 24.532 27.544C24.388 27.188 23.908 25.764 24.668 23.844C24.668 23.844 25.844 23.468 28.516 25.276C29.632 24.964 30.82 24.812 32 24.808C33.18 24.812 34.368 24.964 35.488 25.276C38.156 23.468 39.328 23.844 39.328 23.844C40.092 25.764 39.612 27.188 39.468 27.544C40.368 28.52 40.904 29.768 40.904 31.296C40.904 36.672 37.624 37.848 34.504 38.196C35.008 38.632 35.456 39.492 35.456 40.812C35.456 42.712 35.44 44.248 35.44 44.616C35.44 44.988 35.692 45.424 36.404 45.284C41.984 43.432 46 38.184 46 32C46 24.268 39.732 18 32 18Z"
        fill="#ffffff"
      />
    </svg>
  );
}

// 9. 3D Envelope with Green + Badge (Contact)
export function Contact3DIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]" {...props}>
      <defs>
        <linearGradient id="envelopeBody" x1="10" y1="24" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="envelopeFlap" x1="10" y1="24" x2="54" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* White Letter Sheet Inside */}
      <rect x="16" y="16" width="32" height="22" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="22" x2="36" y2="22" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="26" x2="32" y2="26" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Envelope Pocket */}
      <path d="M10 26C10 24.8954 10.8954 24 12 24H52C53.1046 24 54 24.8954 54 26V50C54 52.2091 52.2091 54 50 54H14C11.7909 54 10 52.2091 10 50V26Z" fill="url(#envelopeBody)" />
      {/* Flap Triangles */}
      <path d="M10 26L32 42L54 26" stroke="#b45309" strokeWidth="1.5" opacity="0.6" />
      <path d="M10 52L26 38" stroke="#b45309" strokeWidth="1.5" opacity="0.4" />
      <path d="M54 52L38 38" stroke="#b45309" strokeWidth="1.5" opacity="0.4" />
      {/* Green + Notification Badge */}
      <circle cx="48" cy="18" r="6.5" fill="#22c55e" stroke="#052e16" strokeWidth="1.5" />
      <path d="M48 15V21M45 18H51" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

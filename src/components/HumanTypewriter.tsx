import { useEffect, useState } from "react";

interface HumanTypewriterProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const defaultPhrases = [
  "Full Stack Web Developer",
  "MERN Stack Specialist",
  "React & Node.js Engineer",
  "Scalable Systems Builder",
  "High-Performance UI Craftsman",
];

export function HumanTypewriter({
  phrases = defaultPhrases,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseTime = 1800,
  className = "",
}: HumanTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = phrases[phraseIndex % phrases.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentText === targetPhrase) {
      // Pause at the end of typing
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === "") {
      // Switch to next phrase after deleting
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Natural human typing cadence (slight random variance)
      const variance = Math.random() * 30 - 15;
      const speed = isDeleting ? deletingSpeed : typingSpeed + variance;

      timer = setTimeout(() => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return targetPhrase.substring(0, prev.length - 1);
          } else {
            return targetPhrase.substring(0, prev.length + 1);
          }
        });
      }, Math.max(20, speed));
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center flex-wrap ${className}`}>
      <span className="typewriter-text gradient-text font-extrabold tracking-tight">
        {currentText}
      </span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}

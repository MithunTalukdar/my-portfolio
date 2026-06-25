import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import type { RefObject } from "react";

export function useCountUp(ref: RefObject<Element | null>, end: number, duration = 1200) {
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));

    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(end * progress));
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 16);

    return () => window.clearInterval(timer);
  }, [duration, end, inView]);

  return count;
}

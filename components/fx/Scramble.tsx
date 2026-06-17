"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\<>=+*#";

/**
 * Decode/scramble text — characters resolve from random glyphs to the final
 * string. Triggers once on enter-view (or on mount). Static under reduced-motion.
 */
export function Scramble({
  text,
  className = "",
  speed = 1,
  trigger = "view",
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "view" | "mount";
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(text);
      return;
    }

    let raf = 0;
    let timer = 0;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const total = text.length;
      let frame = 0;
      const settle = Math.max(8, Math.round((total + 8) / speed));
      const tick = () => {
        const revealed = (frame / settle) * total;
        let s = "";
        for (let i = 0; i < total; i++) {
          if (text[i] === " ") {
            s += " ";
          } else if (i < revealed) {
            s += text[i];
          } else {
            s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
        setOut(s);
        frame++;
        if (frame <= settle) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };

    if (trigger === "mount") {
      if (delay > 0) {
        timer = window.setTimeout(run, delay);
      } else {
        run();
      }
    } else {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [text, speed, trigger, delay]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

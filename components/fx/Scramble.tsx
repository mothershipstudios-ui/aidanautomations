"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\<>=+*#";

/**
 * Decode/scramble text — characters resolve from random glyphs to the final
 * string. Triggers once on enter-view (or on mount). Static under reduced-motion.
 *
 * Pass `active` to retrigger the animation each time it flips true,
 * without unmounting/remounting the element (avoids mid-transition flash).
 */
export function Scramble({
  text,
  className = "",
  speed = 1,
  trigger = "view",
  active,
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "view" | "mount";
  /** When provided, animation retriggers every time this flips to true. */
  active?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  const rafRef = useRef(0);
  const hasRunOnce = useRef(false);

  const animate = () => {
    cancelAnimationFrame(rafRef.current);
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
      if (frame <= settle) rafRef.current = requestAnimationFrame(tick);
      else setOut(text);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Retrigger when active flips to true
  useEffect(() => {
    if (active === undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (active) animate();
    else {
      cancelAnimationFrame(rafRef.current);
      setOut(text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // One-shot trigger for view / mount modes (when active prop not used)
  useEffect(() => {
    if (active !== undefined) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setOut(text); return; }

    const run = () => {
      if (hasRunOnce.current) return;
      hasRunOnce.current = true;
      animate();
    };

    if (trigger === "mount") {
      run();
    } else {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

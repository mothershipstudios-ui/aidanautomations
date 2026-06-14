"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tactical cursor: a notched reticle that lerps toward the pointer and expands
 * over interactive targets, with a precise center dot. Pointer-fine only; never
 * renders on touch, and respects reduced-motion (instant follow).
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const t = e.target as HTMLElement;
      hovering = !!t.closest('a, button, [data-cursor="target"]');
    };
    window.addEventListener("pointermove", onMove);

    const loop = () => {
      const k = reduce ? 1 : 0.18;
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      if (ring.current) {
        const s = hovering ? 2.4 : 1;
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%) scale(${s})`;
        ring.current.style.opacity = hovering ? "1" : "0.7";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 border border-cyan/70 clip-notch-sm mix-blend-screen transition-[opacity] duration-200"
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-px -mt-px h-1 w-1 rounded-full bg-cyan"
      />
    </>
  );
}

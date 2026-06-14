"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STEPS = [
  "INITIALIZING CORE",
  "CALIBRATING TELEMETRY",
  "LINKING MOTHERSHIP OS",
  "MOUNTING MYCELIUM LEDGER",
  "SYSTEMS ONLINE",
];

/**
 * Boot sequence overlay: counts 0 -> 100 with status lines, then masks away to
 * reveal the site. Skips fast under reduced-motion. Locks scroll while active.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const total = reduce ? 200 : 1700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), reduce ? 0 : 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  const stepIndex = Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-void p-6 sm:p-10"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
          <div className="flex items-center justify-between">
            <span className="label-mono">AIDAN // AUTOMATIONS</span>
            <span className="label-mono">BOOT SEQUENCE</span>
          </div>

          <div className="flex items-end justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              {STEPS[stepIndex]}
            </div>
            <div className="font-display text-[18vw] font-medium leading-none tracking-tight text-ink tabular-nums sm:text-[12vw]">
              {String(pct).padStart(3, "0")}
            </div>
          </div>

          <div className="relative h-px w-full bg-line/20">
            <div
              className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_12px_var(--color-cyan)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

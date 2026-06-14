"use client";

import { motion } from "framer-motion";
import { Scramble } from "@/components/fx/Scramble";
import { Magnetic } from "@/components/fx/Magnetic";
import { StatusBlip } from "@/components/ui/StatusBlip";

const auditHref =
  "mailto:aidan@aidanautomations.com?subject=Project%20Mycelium%20Private%20Audit";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* Minimal HUD frame */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        <span className="absolute right-6 top-24 label-mono">47.6062° N</span>
        <span className="absolute left-5 top-20 h-4 w-4 border-l border-t border-cyan/40" />
        <span className="absolute right-5 top-20 h-4 w-4 border-r border-t border-cyan/40" />
        <span className="absolute bottom-6 left-5 h-4 w-4 border-b border-l border-cyan/40" />
        <span className="absolute bottom-6 right-5 h-4 w-4 border-b border-r border-cyan/40" />
      </div>

      {/* Content */}
      <div className="relative z-30 mx-auto w-full max-w-[1280px] px-5 lg:px-8">
        <StatusBlip tone="live" label="Project Mycelium" />

        <h1 className="mt-7 font-display font-medium leading-[0.9] tracking-[-0.03em] text-ink">
          <Scramble
            trigger="mount"
            speed={1.6}
            text="AI, under"
            className="block text-[clamp(3rem,11vw,10rem)]"
          />
          <Scramble
            trigger="mount"
            speed={1}
            text="control."
            className="block text-[clamp(3rem,11vw,10rem)] text-cyan"
          />
        </h1>

        <p className="mt-8 font-mono text-sm uppercase tracking-[0.18em] text-ink-muted">
          Less sprawl. Clearer decisions. Real leverage.
        </p>

        <div className="mt-10">
          <Magnetic>
            <a
              href={auditHref}
              data-cursor="target"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-cyan/50 bg-cyan/5 px-9 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-cyan clip-notch"
            >
              <span className="relative z-10">Request private audit</span>
              <span className="relative z-10 h-1 w-1 bg-cyan animate-blip" />
              <span className="absolute inset-0 -translate-x-full bg-cyan/15 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="label-mono">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";

import { Reveal } from "@/components/fx/Reveal";
import { Scramble } from "@/components/fx/Scramble";
import { Magnetic } from "@/components/fx/Magnetic";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { StatusBlip } from "@/components/ui/StatusBlip";

const auditHref =
  "mailto:aidan@aidanautomations.com?subject=Project%20Mycelium%20Private%20Audit";

export function ClosingCTA() {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-5 py-24 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden border border-line/15 bg-obsidian-900/60 p-10 clip-notch md:p-16">
          <CornerFrame />
          <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(80%_100%_at_100%_0%,#000,transparent_70%)]" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[20ch]">
              <StatusBlip tone="live" label="Private consultation" />
              <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-ink">
                <Scramble text="Find the waste." className="block" />
                <span className="block text-ink-muted">Keep control.</span>
              </h2>
            </div>

            <Magnetic>
              <a
                href={auditHref}
                data-cursor="target"
                className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden border border-cyan/50 bg-cyan/5 px-10 py-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan clip-notch"
              >
                <span className="relative z-10">Request access</span>
                <span className="relative z-10 h-1 w-1 bg-cyan animate-blip" />
                <span className="absolute inset-0 -translate-x-full bg-cyan/15 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

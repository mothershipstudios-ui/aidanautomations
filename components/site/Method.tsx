"use client";

import { Reveal } from "@/components/fx/Reveal";
import { Scramble } from "@/components/fx/Scramble";

const proof: [string, string, string][] = [
  ["01", "Signal", "Workflows, tools, prompts, costs."],
  ["02", "Map", "Drift, duplication, mismatch, gaps."],
  ["03", "Control", "Routing, gates, overrides, signal."],
];

export function Method() {
  return (
    <section id="method" className="border-t border-line/10">
      <div className="mx-auto max-w-[1280px] px-5 py-28 lg:px-8">
        <Reveal className="max-w-[26ch]">
          <span className="label-mono !text-cyan">Method</span>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,6.5vw,6rem)] font-medium leading-[0.88] tracking-[-0.02em] text-ink">
            <Scramble text="From sprawl" className="block" />
            <span className="block text-ink-muted">to control.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {proof.map(([num, title, body], i) => (
            <Reveal key={num} delay={i * 0.08} className="h-full">
              <div className="relative h-full overflow-hidden border border-line/12 bg-obsidian-900/50 p-8">
                <span className="absolute right-7 top-7 font-display text-6xl font-medium text-line/15">
                  {num}
                </span>
                <span className="label-mono !text-cyan">STEP {num}</span>
                <h3 className="mt-12 font-display text-2xl font-medium tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-ink-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

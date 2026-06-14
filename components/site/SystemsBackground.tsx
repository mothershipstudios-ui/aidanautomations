"use client";

import { Reveal } from "@/components/fx/Reveal";
import { Scramble } from "@/components/fx/Scramble";
import { StatusBlip } from "@/components/ui/StatusBlip";

const nodes: { name: string; role: string; status: string; tone: "live" | "ok" | "warn" }[] = [
  { name: "MYCELIUM", role: "Metering + cost ledger", status: "OK", tone: "ok" },
  { name: "MOTHERSHIP OS", role: "Operations routing", status: "LIVE", tone: "live" },
  { name: "EXECUTION ENGINE", role: "Live-domain control", status: "RESTRICTED", tone: "warn" },
];

const story = [
  "Routing across Claude, Codex, Gemini, and human review.",
  "Control models proven in real-time, real-money systems. Strategy stays private.",
];

export function SystemsBackground() {
  return (
    <section className="relative border-y border-line/10 bg-obsidian-950/40">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(90deg,#000,transparent_65%)]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-5 py-28 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="label-mono !text-cyan">Background</span>
            <h2 className="mt-4 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-ink">
              <Scramble text="Built where" className="block" />
              <span className="block text-ink-muted">overrides matter.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 grid gap-px overflow-hidden border border-line/12 bg-line/10">
              {nodes.map((n) => (
                <li
                  key={n.name}
                  className="group flex items-center justify-between gap-4 bg-obsidian-900/80 px-5 py-4 transition-colors hover:bg-obsidian-800/80"
                >
                  <div>
                    <span className="font-mono text-sm font-semibold tracking-[0.14em] text-ink">
                      {n.name}
                    </span>
                    <span className="mt-0.5 block label-mono">{n.role}</span>
                  </div>
                  <StatusBlip tone={n.tone} label={n.status} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid content-center gap-6 border-line/12 lg:col-span-6 lg:border-l lg:pl-12">
          {story.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="max-w-[60ch] text-lg leading-relaxed text-ink-muted lg:text-xl">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

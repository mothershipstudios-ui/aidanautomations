"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CornerFrame } from "@/components/ui/CornerFrame";
import { StatusBlip } from "@/components/ui/StatusBlip";
import { Scramble } from "@/components/fx/Scramble";

type Panel = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  status: string;
  tone: "live" | "ok" | "warn";
  metric: string;
  metricLabel: string;
};

const panels: Panel[] = [
  {
    index: "01",
    eyebrow: "Project Mycelium",
    title: "Inefficiency audits",
    body: "Find the waste in your AI stack.",
    status: "OPERATIONAL",
    tone: "ok",
    metric: "↓ 38%",
    metricLabel: "SPEND DRIFT FOUND",
  },
  {
    index: "02",
    eyebrow: "Mothership OS",
    title: "Operations routing",
    body: "Every tool through one control plane.",
    status: "ONLINE",
    tone: "live",
    metric: "5+",
    metricLabel: "TOOLS, ONE ROUTER",
  },
  {
    index: "03",
    eyebrow: "Applied systems",
    title: "Automation architecture",
    body: "Systems that decide, with you in the loop.",
    status: "ACTIVE",
    tone: "live",
    metric: "100%",
    metricLabel: "HUMAN OVERRIDE",
  },
];

export function SystemsShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tr = track.current!;
      const rootEl = root.current!;
      const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: () => "+=" + dist(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (panels.length))),
        },
      });
      return () => tween.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={root}
      className="relative overflow-hidden border-t border-line/10 lg:h-screen"
    >
      <div
        ref={track}
        className="flex flex-col gap-4 px-5 py-20 lg:h-screen lg:flex-row lg:flex-nowrap lg:items-center lg:gap-8 lg:px-[8vw] lg:py-0"
      >
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-center lg:h-[68vh] lg:w-[38vw] lg:pr-10">
          <span className="label-mono !text-cyan">Systems</span>
          <h2 className="mt-5 font-display text-[clamp(2.75rem,6.5vw,6rem)] font-medium leading-[0.88] tracking-[-0.02em] text-ink">
            <Scramble text="Quiet" className="block" />
            <span className="block text-ink-muted">infrastructure.</span>
          </h2>
          <span className="mt-10 hidden items-center gap-3 label-mono lg:flex">
            {String(Math.min(active + 1, panels.length)).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
            <span className="h-px w-12 bg-cyan/60" />
            Scroll
          </span>
        </div>

        {/* System panels */}
        {panels.map((p) => (
          <article
            key={p.index}
            className="group relative flex shrink-0 flex-col overflow-hidden border border-line/12 bg-obsidian-900/50 p-8 transition-colors duration-500 hover:border-cyan/40 lg:h-[68vh] lg:w-[42vw] lg:p-12"
          >
            <CornerFrame />
            <header className="flex items-center justify-between">
              <span className="font-display text-6xl font-medium text-line/15 lg:text-8xl">
                {p.index}
              </span>
              <StatusBlip tone={p.tone} label={p.status} />
            </header>

            <div className="mt-auto">
              <span className="label-mono !text-cyan">{p.eyebrow}</span>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] font-medium leading-tight tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-ink-muted">{p.body}</p>

              <div className="mt-8 flex items-end justify-between border-t border-line/10 pt-5">
                <div>
                  <div className="font-display text-3xl font-medium text-cyan">{p.metric}</div>
                  <div className="mt-1 label-mono">{p.metricLabel}</div>
                </div>
                <span className="label-mono transition-colors group-hover:text-cyan">INSPECT →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

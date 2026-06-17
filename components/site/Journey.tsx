"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scramble } from "@/components/fx/Scramble";
import { Magnetic } from "@/components/fx/Magnetic";
import { StatusBlip } from "@/components/ui/StatusBlip";
import { CornerFrame } from "@/components/ui/CornerFrame";

const auditHref =
  "mailto:aidan@aidanautomations.com?subject=Project%20Mycelium%20Private%20Audit";

type Station = {
  rail: string;
  eyebrow: string;
  lines: [string, string];
  body: string;
  status?: { tone: "live" | "ok" | "warn"; label: string };
  metric?: string;
  metricLabel?: string;
  cta?: string;
};

const STATIONS: Station[] = [
  {
    rail: "CORE",
    eyebrow: "Project Mycelium",
    lines: ["AI, under", "control."],
    body: "Less sprawl. Clearer decisions. Real leverage.",
    cta: "Request private audit",
  },
  {
    rail: "MYCELIUM",
    eyebrow: "System 01 · Mycelium",
    lines: ["Inefficiency", "audits."],
    body: "Find the waste in your AI stack: spend, latency, and operational risk, mapped to real tasks.",
    status: { tone: "ok", label: "OPERATIONAL" },
    metric: "↓ 38%",
    metricLabel: "SPEND DRIFT FOUND",
  },
  {
    rail: "MOTHERSHIP OS",
    eyebrow: "System 02 · Mothership OS",
    lines: ["Operations", "routing."],
    body: "Every tool through one control plane. Claude, Codex, Gemini, and human review, governed.",
    status: { tone: "live", label: "ONLINE" },
    metric: "5+",
    metricLabel: "TOOLS, ONE ROUTER",
  },
  {
    rail: "ENGINE",
    eyebrow: "System 03 · Execution Engine",
    lines: ["Live-domain", "control."],
    body: "Control models proven in real-time, real-money systems. Strategy stays private.",
    status: { tone: "warn", label: "RESTRICTED" },
    metric: "0x████",
    metricLabel: "CLASSIFIED",
  },
  {
    rail: "METHOD",
    eyebrow: "Method",
    lines: ["From sprawl", "to control."],
    body: "Signal, map, control. Workflows and costs in; routing, gates, and overrides out.",
  },
  {
    rail: "CONTACT",
    eyebrow: "Private consultation",
    lines: ["Find the waste.", "Keep control."],
    body: "A focused read on where your AI creates value, and where it burns attention.",
    cta: "Request access",
  },
];

function StationContent({ s, active }: { s: Station; active: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[64ch] px-6 text-center">
      <div className="flex items-center justify-center gap-3">
        {s.status ? (
          <StatusBlip tone={s.status.tone} label={s.status.label} />
        ) : (
          <span className="label-mono !text-cyan">{s.eyebrow}</span>
        )}
        {s.status && <span className="label-mono">{s.eyebrow}</span>}
      </div>

      <h2 className="mt-7 font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.88] tracking-[-0.03em] text-ink">
        <span className="block">{s.lines[0]}</span>
        <span className="block text-cyan">{s.lines[1]}</span>
      </h2>

      <p className="mx-auto mt-7 max-w-[48ch] text-base leading-relaxed text-ink-muted sm:text-lg">
        {s.body}
      </p>

      {s.metric && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="font-display text-4xl font-medium text-cyan">{s.metric}</span>
          <span className="max-w-[16ch] text-left label-mono">{s.metricLabel}</span>
        </div>
      )}

      {s.cta && (
        <div className="mt-10">
          <Magnetic>
            <a
              href={auditHref}
              data-cursor="target"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-cyan/50 bg-cyan/5 px-9 py-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-cyan clip-notch"
            >
              <span className="relative z-10">{s.cta}</span>
              <span className="relative z-10 h-1 w-1 bg-cyan animate-blip" />
              <span className="absolute inset-0 -translate-x-full bg-cyan/15 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
          </Magnetic>
        </div>
      )}
    </div>
  );
}

export function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const stages = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const total = STATIONS.length;
    let activeIdx = 0;

    const update = (progress: number) => {
      const p = progress * (total - 1);
      for (let i = 0; i < total; i++) {
        const el = stages.current[i];
        if (!el) continue;
        const d = p - i;
        const ad = Math.abs(d);
        const op = Math.max(0, Math.min(1, 1.28 - ad * 1.7));
        el.style.opacity = String(op);
        el.style.transform = `perspective(1100px) translateY(${-d * 42}px) translateZ(${-ad * 320}px)`;
        el.style.pointerEvents = op > 0.6 ? "auto" : "none";
      }
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      const idx = Math.round(p);
      if (idx !== activeIdx) {
        activeIdx = idx;
        setActive(idx);
      }
    };

    const st = ScrollTrigger.create({
      trigger: root.current!,
      start: "top top",
      end: () => "+=" + (total - 1) * window.innerHeight * 3.45,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => update(self.progress),
    });
    update(0);

    return () => st.kill();
  }, []);

  // Reduced-motion / no-JS fallback: plain stacked sections.
  if (reduced) {
    return (
      <div>
        {STATIONS.map((s) => (
          <section key={s.rail} className="flex min-h-screen items-center justify-center border-b border-line/10 py-24">
            <StationContent s={s} active={false} />
          </section>
        ))}
      </div>
    );
  }

  return (
    <div ref={root} className="relative h-[100svh] overflow-hidden">
      <CornerFrame tone="cyan" className="z-30" />

      {/* Chapter rail */}
      <ul className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 gap-1 lg:grid">
        {STATIONS.map((s, i) => (
          <li key={s.rail} className="flex items-center gap-2 py-1.5">
            <span
              className={`inline-block h-1 w-1 transition-all duration-300 ${
                active === i ? "scale-150 bg-cyan shadow-[0_0_8px_var(--color-cyan)]" : "bg-line/40"
              }`}
            />
            <span
              className={`label-mono transition-colors duration-300 ${
                active === i ? "!text-cyan" : ""
              }`}
            >
              {s.rail}
            </span>
          </li>
        ))}
      </ul>

      {/* Stations (depth overlays) */}
      <div className="absolute inset-0 z-20">
        {STATIONS.map((s, i) => (
          <div
            key={s.rail}
            ref={(el) => {
              stages.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ opacity: 0 }}
          >
            <StationContent s={s} active={active === i} />
          </div>
        ))}
      </div>

      {/* Telemetry + progress */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 pb-3">
          <span className="label-mono">
            SECTOR {String(active + 1).padStart(2, "0")} / {String(STATIONS.length).padStart(2, "0")}
          </span>
          <span className="label-mono">FLIGHT · ACTIVE</span>
        </div>
        <div className="h-px w-full bg-line/15">
          <div
            ref={bar}
            className="h-full origin-left bg-cyan shadow-[0_0_10px_var(--color-cyan)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}

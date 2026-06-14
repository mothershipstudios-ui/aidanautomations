"use client";

const ITEMS = [
  "COST INTELLIGENCE",
  "GOVERNED AUTOMATION",
  "AGENT ROUTING",
  "HUMAN OVERSIGHT",
  "CONTROL",
];

/**
 * Infinite ticker band. Duplicated track translated via CSS keyframe (transform
 * only). Pauses under reduced-motion.
 */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative flex overflow-hidden border-y border-line/10 py-5 select-none">
      <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-lg font-medium tracking-tight text-ink-muted">
            {t}
            <span className="h-1 w-1 rotate-45 bg-cyan" />
          </span>
        ))}
      </div>
      <div aria-hidden className="flex shrink-0 animate-[marquee_28s_linear_infinite] motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-lg font-medium tracking-tight text-ink-muted">
            {t}
            <span className="h-1 w-1 rotate-45 bg-cyan" />
          </span>
        ))}
      </div>
    </div>
  );
}

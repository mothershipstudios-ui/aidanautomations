"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { StatusBlip } from "@/components/ui/StatusBlip";
import { easeOutExpo } from "@/lib/motion";

const auditHref =
  "mailto:aidan@aidanautomations.com?subject=Free%20AI%20Audit";

// Journey has 6 stations (0–5); station 4 = Method, station 5 = Contact.
// ScrollTrigger end = (total - 1) * vh * 3.45 = 5 * vh * 3.45
// Scroll to station i = i * vh * 3.45
function scrollToStation(i: number) {
  window.scrollTo({ top: i * window.innerHeight * 3.45, behavior: "smooth" });
}

const LINKS: { label: string; href?: string; onClick?: () => void }[] = [
  { label: "Work", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { label: "Method", onClick: () => scrollToStation(4) },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={reduce ? false : { y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-void/75 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Aidan Automations">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain drop-shadow-[0_0_16px_color-mix(in_oklch,var(--color-cyan)_30%,transparent)]"
          />
          <span className="hidden font-mono text-[13px] font-semibold tracking-[0.16em] text-ink sm:inline">
            AIDAN<span className="text-ink-dim">//</span>AUTOMATIONS
          </span>
        </a>

        <ul
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((l) => (
            <li key={l.label} className="relative" onMouseEnter={() => setHovered(l.label)}>
              <a
                href={l.href ?? "#"}
                onClick={l.onClick ? (e) => { e.preventDefault(); l.onClick!(); } : undefined}
                className="relative z-10 block px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
              {hovered === l.label && (
                <motion.span
                  layoutId="nav-trace"
                  className="absolute inset-x-2 bottom-1 h-px bg-cyan"
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <StatusBlip tone="ok" label="SYS · ONLINE" />
          <a
            href={auditHref}
            className="group relative overflow-hidden border border-cyan/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan clip-notch-sm"
          >
            <span className="relative z-10">Free audit</span>
            <span className="absolute inset-0 -translate-x-full bg-cyan/10 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="label-mono md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="overflow-hidden border-t border-line/10 md:hidden"
          >
            {[...LINKS, { label: "Free audit", href: auditHref }].map((l) => (
              <li key={l.label} className="border-b border-line/10 last:border-0">
                <a
                  href={l.href ?? "#"}
                  onClick={(e) => { if (l.onClick) { e.preventDefault(); l.onClick(); } setOpen(false); }}
                  className="block px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

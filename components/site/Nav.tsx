"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { StatusBlip } from "@/components/ui/StatusBlip";
import { easeOutExpo } from "@/lib/motion";

const auditHref =
  "mailto:aidan@aidanautomations.com?subject=Project%20Mycelium%20Private%20Audit";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Contact", href: "#contact" },
];

function Clock() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setT(new Date().toISOString().slice(11, 19) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="label-mono tabular-nums">{t ?? "--:--:-- UTC"}</span>;
}

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
            <li key={l.href} className="relative" onMouseEnter={() => setHovered(l.href)}>
              <a
                href={l.href}
                className="relative z-10 block px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
              {hovered === l.href && (
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
          <Clock />
          <StatusBlip tone="ok" label="SYS · ONLINE" />
          <a
            href={auditHref}
            className="group relative overflow-hidden border border-cyan/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan clip-notch-sm"
          >
            <span className="relative z-10">Private audit</span>
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
            {[...LINKS, { label: "Private audit", href: auditHref }].map((l) => (
              <li key={l.href} className="border-b border-line/10 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
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

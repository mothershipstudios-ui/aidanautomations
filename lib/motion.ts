import type { Variants } from "framer-motion";

// Ease-out-expo. No bounce, no elastic.
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Section/element reveal on scroll. Pass a custom index to stagger.
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo, delay: i * 0.06 },
  }),
};

// Container that staggers its children.
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Shared viewport config for whileInView.
export const inView = { once: true, margin: "-90px" } as const;

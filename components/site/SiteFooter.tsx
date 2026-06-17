export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line/10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono font-semibold tracking-[0.14em] text-ink">
          AIDAN<span className="text-ink-dim">//</span>AUTOMATIONS
        </span>
        <a
          href="mailto:aidan@aidanautomations.com"
          className="text-ink-muted transition-colors hover:text-cyan"
        >
          aidan@aidanautomations.com
        </a>
        <span className="label-mono">BUILD // MOTHERSHIP-OS</span>
      </div>
    </footer>
  );
}

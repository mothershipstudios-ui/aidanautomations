// Crosshair / frame markers pinned to a relative parent. Decorative only.
export function CornerFrame({
  className = "",
  tone = "cyan",
}: {
  className?: string;
  tone?: "cyan" | "warn" | "line";
}) {
  const color =
    tone === "warn"
      ? "border-warn/60"
      : tone === "line"
        ? "border-line/40"
        : "border-cyan/60";
  const tick = `absolute h-3 w-3 ${color}`;
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${tick} left-0 top-0 border-l border-t`} />
      <span className={`${tick} right-0 top-0 border-r border-t`} />
      <span className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span className={`${tick} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

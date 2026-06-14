const TONE = {
  live: "bg-cyan shadow-[0_0_8px_var(--color-cyan)]",
  ok: "bg-telemetry shadow-[0_0_8px_var(--color-telemetry)]",
  warn: "bg-warn shadow-[0_0_8px_var(--color-warn)]",
} as const;

export function StatusBlip({
  tone = "live",
  label,
}: {
  tone?: keyof typeof TONE;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full animate-blip ${TONE[tone]}`} />
      <span className="label-mono">{label}</span>
    </span>
  );
}

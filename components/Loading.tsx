export default function Loading({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center py-16">
      <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ccff00] fit-pulse" />
        {label}
      </div>
    </div>
  );
}

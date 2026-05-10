export default function TelemetryLabel({ children }) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />

      <p className="text-xs uppercase tracking-[0.35em] text-crimson">
        {children}
      </p>

    </div>
  )
}
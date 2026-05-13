export default function SystemCard({
  index,
  title,
  philosophy,
  description,
  stack,
}) {
  return (
    <div
      className="
      group
      border border-white/10
      bg-white/[0.02]
      backdrop-blur-sm
      p-5 sm:p-8
      hover:border-crimson/40
      transition-all duration-700
      relative
      overflow-hidden
      "
    >

      {/* subtle red hover glow */}

      <div
        className="
        absolute inset-0 opacity-0
        group-hover:opacity-100
        transition-opacity duration-700
        bg-[radial-gradient(circle_at_top_left,rgba(193,18,31,0.12),transparent_55%)]
        "
      />

      <div className="relative z-10">

        <p className="text-xs tracking-[0.35em] uppercase text-crimson mb-8">
          SYSTEM {index}
        </p>

        <h3 className="text-2xl sm:text-3xl font-semibold leading-tight mb-6">
          {title}
        </h3>

        <p className="text-base sm:text-xl text-softWhite leading-relaxed mb-8">
          {philosophy}
        </p>

        <p className="text-mutedWhite leading-relaxed mb-10">
          {description}
        </p>

        <div className="flex flex-wrap gap-3">

          {stack.map((item) => (

            <span
              key={item}
              className="
              text-xs uppercase tracking-wider
              border border-white/10
              px-3 py-2
              text-mutedWhite
              "
            >
              {item}
            </span>

          ))}

        </div>

      </div>

    </div>
  )
}
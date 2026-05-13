const mainLinks = [
  { number: "01", label: "Operational Scale", href: "#scale" },
  { number: "02", label: "Selected Systems", href: "#systems" },
  { number: "03", label: "Current Work", href: "#current-work" },
  { number: "04", label: "Contact", href: "#contact" },
]

const blogLinks = [
  { number: "01", label: "Engineering Notes", href: "#notes" },
  { number: "02", label: "Reflections", href: "#reflections" },
]

function NavLink({ link }) {
  return (
    <a
      href={link.href}
      className="
        group flex items-center justify-between
        border-t border-white/10
        py-4
        text-sm uppercase tracking-[0.22em]
        text-mutedWhite
        transition-all duration-500
        hover:text-softWhite
      "
    >
      <span className="flex items-center gap-4">
        <span className="text-crimson">{link.number}</span>
        {link.label}
      </span>
      <span className="h-px w-6 bg-white/10 group-hover:w-10 group-hover:bg-crimson transition-all duration-500" />
    </a>
  )
}

export default function SystemIndex() {
  return (
    <aside className="hidden lg:block w-full max-w-sm">
      <div className="border border-white/10 bg-white/[0.025] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(193,18,31,0.16),transparent_55%)]" />

        <div className="relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-crimson mb-8">
            System Index
          </p>

          <nav className="space-y-1">
            {mainLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </nav>

          <p className="text-xs tracking-[0.35em] uppercase text-crimson mt-8 mb-8">
            Blogs
          </p>

          <nav className="space-y-1">
            {blogLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
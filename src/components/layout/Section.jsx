export default function Section({
  children,
  className = "",
  id,
}) {
  return (
    <section
      id={id}
      className={`py-32 relative ${className}`}
    >
      {children}
    </section>
  )
}

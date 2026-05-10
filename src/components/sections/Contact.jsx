import Container from "../layout/Container"
import Section from "../layout/Section"
import TelemetryLabel from "../ui/TelemetryLabel"

const links = [
  {
    label: "ritwikreddy615@gmail.com",
    href: "mailto:ritwikreddy615@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ritwik23/",
  },
  {
    label: "GitHub",
    href: "https://github.com/Ritwik-1999",
  },
  {
    label: "Resume",
    href: "/Sai_Ritwik_Reddy_Resume.pdf",
  },
]

export default function Contact() {
  return (
    <Section id="contact" className="pb-16">

      <Container>

        <div
          className="
          relative overflow-hidden
          border border-white/10
          bg-white/[0.025]
          p-10 md:p-14
          "
        >

          {/* crimson atmosphere */}

          <div
            className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(193,18,31,0.20),transparent_58%)]
            "
          />

          <div
            className="
            relative z-10
            grid lg:grid-cols-[1fr_0.8fr]
            gap-14 items-end
            "
          >

            {/* left side */}

            <div className="space-y-8">

              <TelemetryLabel>
                CONTACT
              </TelemetryLabel>

              <h2
                className="
                text-5xl md:text-7xl
                font-semibold
                tracking-tight
                leading-none
                "
              >

                Let’s build
                <span className="text-crimson">
                  {" "}reliable systems.
                </span>

              </h2>

              <p
                className="
                text-mutedWhite
                max-w-2xl
                leading-relaxed
                "
              >

                Open to cloud, platform engineering,
                DevOps, infrastructure automation,
                and backend/platform roles where reliability,
                scale, and strong engineering execution matter.

              </p>

            </div>

            {/* right side */}

            <div className="grid grid-cols-2 gap-3">

              {links.map((link) => (

                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="
                  group
                  border border-white/10
                  bg-background/40
                  px-5 py-4
                  text-sm uppercase tracking-[0.22em]
                  text-mutedWhite
                  transition-all duration-500
                  hover:border-crimson/50
                  hover:text-softWhite
                  "
                >

                  <span className="flex items-center justify-between gap-4">

                    {link.label}

                    <span
                      className="
                      h-px w-6
                      bg-white/10
                      group-hover:w-10
                      group-hover:bg-crimson
                      transition-all duration-500
                      "
                    />

                  </span>

                </a>

              ))}

            </div>

          </div>

        </div>

      </Container>

    </Section>
  )
}
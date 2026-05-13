import { useState } from "react"
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

const RECIPIENT = "ritwikreddy615@gmail.com"

function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`)
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
    )
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`
    setSent(true)
    setFields({ name: "", email: "", message: "" })
  }

  const inputClass = `
    w-full bg-transparent
    border border-white/10
    px-5 py-4
    text-sm text-softWhite placeholder:text-mutedWhite/50
    tracking-wide
    focus:outline-none focus:border-crimson/60
    transition-colors duration-300
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          value={fields.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Your email"
          value={fields.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <textarea
        required
        name="message"
        rows={5}
        placeholder="What would you like to discuss?"
        value={fields.message}
        onChange={handleChange}
        className={`${inputClass} resize-none`}
      />

      <div className="flex items-center justify-between gap-6">
        <button
          type="submit"
          className="
            group flex items-center gap-4
            border border-white/10
            bg-background/40
            px-7 py-4
            text-sm uppercase tracking-[0.22em]
            text-mutedWhite
            transition-all duration-500
            hover:border-crimson/50 hover:text-softWhite
          "
        >
          Send Message
          <span className="h-px w-6 bg-white/10 group-hover:w-10 group-hover:bg-crimson transition-all duration-500" />
        </button>

        {sent && (
          <p className="text-xs uppercase tracking-[0.25em] text-crimson">
            Mail client opened
          </p>
        )}
      </div>
    </form>
  )
}

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

          <div className="relative z-10 space-y-14">

            <div
              className="
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

              {/* right side — quick links */}

              <div className="grid grid-cols-2 gap-3">

                {links.map((link) => (

                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label === "ritwikreddy615@gmail.com" ? undefined : "_blank"}
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

            {/* mail form */}

            <div className="border-t border-white/10 pt-10 space-y-6">

              <p className="text-xs tracking-[0.35em] uppercase text-crimson">
                Send a Message
              </p>

              <ContactForm />

            </div>

          </div>

        </div>

      </Container>

    </Section>
  )
}
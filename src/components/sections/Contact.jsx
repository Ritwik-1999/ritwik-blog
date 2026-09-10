import { useState } from 'react'
const service = import.meta.env.VITE_EMAILJS_SERVICE
const template = import.meta.env.VITE_EMAILJS_TEMPLATE
const publicKey = import.meta.env.VITE_EMAILJS_KEY

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  function change(event) { setFields(previous => ({ ...previous, [event.target.name]: event.target.value })); if (status !== 'sending') setStatus('idle') }
  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(service, template, { ...fields, title: fields.name, time: new Date().toLocaleString() }, publicKey)
      setFields({ name: '', email: '', message: '' }); setStatus('sent')
    } catch { setStatus('error') }
  }
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading">
    <div><p className="eyebrow">Get in touch</p><h2 id="contact-heading">Let’s talk systems.</h2><p>Have a question about an article, an engineering challenge, or an opportunity to work together? I’d like to hear from you.</p><div className="contact-links"><a href="mailto:ritwikreddy615@gmail.com">ritwikreddy615@gmail.com</a><a href="https://www.linkedin.com/in/ritwik23/">LinkedIn ↗</a><a href="https://github.com/Ritwik-1999">GitHub ↗</a></div></div>
    {service && template && publicKey && <form className="contact-form js-only" onSubmit={submit} aria-busy={status === 'sending'}>
      <div className="form-row"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={change} disabled={status === 'sending'} /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={change} disabled={status === 'sending'} /></label></div>
      <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" required rows={5} maxLength={5000} value={fields.message} onChange={change} disabled={status === 'sending'} /></label>
      <button className="send-button" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send message →'}</button>
      <p className="form-status" role="status" aria-atomic="true">{status === 'sent' ? 'Message sent. Thank you for reaching out.' : status === 'sending' ? 'Sending your message…' : ''}</p>
      {status === 'error' && <p role="alert">Your message couldn’t be sent. Please try again or <a href="mailto:ritwikreddy615@gmail.com">email me directly</a>. Your message is still here.</p>}
    </form>}
  </section>
}

import { useEffect, useState, useSyncExternalStore } from 'react'
import { applyConsent, getConsent, saveConsent, subscribeConsent } from '../../lib/analytics'

export default function AnalyticsConsent() {
  const choice = useSyncExternalStore(subscribeConsent, getConsent, () => 'disabled')
  const [open, setOpen] = useState(false)
  useEffect(() => { applyConsent() }, [choice])
  if (choice === 'disabled') return null
  function choose(value) { saveConsent(value); setOpen(false) }
  return <>
    <button className="analytics-settings" onClick={() => setOpen(true)}>Analytics preferences</button>
    {(open || choice === 'unset') && <section className="analytics-choice" aria-label="Analytics preferences">
      <div><h2>Help me understand what gets read.</h2><p>With your permission, Google Analytics uses cookies to measure visits, time spent, reading progress, and link clicks. Contact-form contents are never included in our analytics events. You can change your choice in the footer.</p><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s privacy policy ↗</a></div>
      <div className="analytics-choice-actions"><button onClick={() => choose('accepted')}>Allow analytics</button><button onClick={() => choose('declined')}>No thanks</button>{choice !== 'unset' && <button onClick={() => setOpen(false)}>Close</button>}</div>
    </section>}
  </>
}

export const MEASUREMENT_ID = 'G-7YD89MH3ZP'
export const CONSENT_KEY = 'analytics-consent-v1'
const hosts = new Set(['ritwikreddy.com', 'www.ritwikreddy.com'])
let temporaryChoice
let active = false
let configured = false
let viewed = false
let stopTracking = () => {}

export function isAnalyticsHost(hostname, production) {
  return production && hosts.has(hostname)
}
export function analyticsAvailable() {
  return typeof window !== 'undefined' && isAnalyticsHost(window.location.hostname, import.meta.env?.PROD)
}
export function getConsent() {
  if (!analyticsAvailable()) return 'disabled'
  try {
    const choice = localStorage.getItem(CONSENT_KEY)
    return ['accepted', 'declined'].includes(choice) ? choice : temporaryChoice || 'unset'
  } catch { return temporaryChoice || 'unset' }
}
export function saveConsent(choice) {
  try { localStorage.setItem(CONSENT_KEY, choice); temporaryChoice = undefined } catch { temporaryChoice = choice }
  window.dispatchEvent(new Event('analytics-consent-change'))
}
export function subscribeConsent(callback) {
  const storage = event => { if (event.key === CONSENT_KEY || event.key === null) callback() }
  window.addEventListener('storage', storage)
  window.addEventListener('analytics-consent-change', callback)
  return () => {
    window.removeEventListener('storage', storage)
    window.removeEventListener('analytics-consent-change', callback)
  }
}
export function cleanPageUrl(value) {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : '' } catch { return '' }
}
export function referrerOrigin(value) {
  try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.origin : '' } catch { return '' }
}
export function actionForLink(href, origin) {
  try {
    const url = new URL(href, origin)
    if (url.protocol === 'mailto:') return 'email_click'
    if (url.origin === origin && url.pathname === '/feed.xml') return 'rss_click'
    if (url.origin === origin && url.pathname === '/Sai_Ritwik_reddy_resume.pdf') return 'resume_download'
    if (['www.linkedin.com', 'linkedin.com'].includes(url.hostname)) return 'linkedin_click'
  } catch { /* Ignore malformed links. */ }
  return null
}
const events = new Set(['email_click', 'rss_click', 'resume_download', 'linkedin_click', 'article_share', 'contact_sent', 'article_progress', 'article_engaged'])
export function trackEvent(name, value) {
  if (!active || getConsent() !== 'accepted' || !events.has(name)) return
  const params = { page_path: window.location.pathname }
  if (name === 'article_progress' && [25, 50, 75, 90].includes(value)) params.percent_scrolled = value
  if (name === 'article_engaged' && [30, 60, 120, 300].includes(value)) params.active_seconds = value
  window.gtag('event', name, params)
}
function installEvents() {
  const clicked = event => {
    const link = event.target.closest?.('a[href]')
    if (!link) return
    const action = actionForLink(link.href, window.location.origin)
    if (action) trackEvent(action)
  }
  document.addEventListener('click', clicked)
  const article = document.querySelector('.article-body')
  const progress = new Set(), milestones = new Set()
  let elapsed = 0, previous = performance.now()
  let focused = document.hasFocus() && !document.hidden
  const progressCheck = () => {
    if (!article || document.hidden || !document.hasFocus()) return
    const bounds = article.getBoundingClientRect()
    if (bounds.height <= 0 || bounds.top > innerHeight) return
    const percent = (innerHeight - bounds.top) / bounds.height * 100
    for (const threshold of [25, 50, 75, 90]) {
      if (percent >= threshold && !progress.has(threshold)) {
        progress.add(threshold); trackEvent('article_progress', threshold)
      }
    }
  }
  const tick = () => {
    const now = performance.now()
    if (focused) elapsed += Math.min(now - previous, 1500)
    previous = now
    focused = document.hasFocus() && !document.hidden
    for (const seconds of [30, 60, 120, 300]) {
      if (elapsed >= seconds * 1000 && !milestones.has(seconds)) {
        milestones.add(seconds); trackEvent('article_engaged', seconds)
      }
    }
  }
  const visibility = () => { tick(); focused = document.hasFocus() && !document.hidden }
  const timer = article ? window.setInterval(tick, 1000) : null
  if (article) {
    window.addEventListener('scroll', progressCheck, { passive: true })
    window.addEventListener('focus', visibility)
    window.addEventListener('blur', visibility)
    document.addEventListener('visibilitychange', visibility)
  }
  return () => {
    document.removeEventListener('click', clicked)
    window.clearInterval(timer)
    window.removeEventListener('scroll', progressCheck)
    window.removeEventListener('focus', visibility)
    window.removeEventListener('blur', visibility)
    document.removeEventListener('visibilitychange', visibility)
  }
}
function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(';')) {
    const name = entry.trim().split('=')[0]
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    for (const domain of ['', `; domain=${location.hostname}`, '; domain=.ritwikreddy.com']) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`
    }
  }
}
export function applyConsent() {
  if (!analyticsAvailable()) return
  const accepted = getConsent() === 'accepted'
  window[`ga-disable-${MEASUREMENT_ID}`] = !accepted
  if (!accepted) {
    active = false; stopTracking(); stopTracking = () => {}
    clearAnalyticsCookies()
    return
  }
  if (active) return
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  if (!configured) {
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('js', new Date())
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false,
      page_location: cleanPageUrl(location.href),
      page_referrer: referrerOrigin(document.referrer),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 60 * 60 * 24 * 180,
    })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
    document.head.appendChild(script)
    configured = true
  }
  active = true
  if (!viewed) {
    window.gtag('event', 'page_view', { page_title: document.title, page_location: cleanPageUrl(location.href), page_referrer: referrerOrigin(document.referrer) })
    viewed = true
  }
  stopTracking = installEvents()
}

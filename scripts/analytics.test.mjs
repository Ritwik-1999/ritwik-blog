import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { isAnalyticsHost, cleanPageUrl, referrerOrigin, actionForLink } from '../src/lib/analytics.js'

test('analytics excludes local, preview, and development traffic', () => {
  assert.equal(isAnalyticsHost('ritwikreddy.com', true), true)
  assert.equal(isAnalyticsHost('www.ritwikreddy.com', true), true)
  for (const host of ['localhost', '127.0.0.1', 'ritwik-blog.vercel.app', 'ritwikreddy.com.example.org']) assert.equal(isAnalyticsHost(host, true), false)
  assert.equal(isAnalyticsHost('ritwikreddy.com', false), false)
})
test('custom analytics uses clean URLs and fixed actions, not personal link contents', () => {
  assert.equal(cleanPageUrl('https://ritwikreddy.com/blog?email=private@example.com#secret'), 'https://ritwikreddy.com/blog')
  assert.equal(referrerOrigin('https://example.com/private/path?token=secret'), 'https://example.com')
  assert.equal(cleanPageUrl('javascript:alert(1)'), '')
  assert.equal(actionForLink('mailto:private@example.com?body=private', 'https://ritwikreddy.com'), 'email_click')
  assert.equal(actionForLink('/feed.xml', 'https://ritwikreddy.com'), 'rss_click')
  assert.equal(actionForLink('/Sai_Ritwik_reddy_resume.pdf', 'https://ritwikreddy.com'), 'resume_download')
  assert.equal(actionForLink('https://linkedin.com.evil.test', 'https://ritwikreddy.com'), null)
})
test('consent gates loading, page views are not duplicated, and withdrawal stops events', async () => {
  const originals = Object.fromEntries(['window', 'document', 'location', 'localStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  const scripts = [], listeners = new Map(), storage = new Map()
  const loc = { hostname: 'ritwikreddy.com', origin: 'https://ritwikreddy.com', pathname: '/blog', href: 'https://ritwikreddy.com/blog?private=yes' }
  try {
    globalThis.location = loc
    globalThis.window = { location: loc, addEventListener() {}, removeEventListener() {}, dispatchEvent() {}, clearInterval() {} }
    globalThis.localStorage = { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) }
    globalThis.document = { cookie: '', title: 'Blog', referrer: 'https://example.com/private', hidden: false, hasFocus: () => true, querySelector: () => null, createElement: () => ({}), head: { appendChild: script => scripts.push(script) }, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) }
    // Replace only the build-time environment flag; Google is never loaded in this test.
    const source = fs.readFileSync('src/lib/analytics.js', 'utf8').replace('import.meta.env?.PROD', 'true')
    const analytics = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
    analytics.applyConsent()
    assert.equal(scripts.length, 0)
    analytics.saveConsent('accepted'); analytics.applyConsent(); analytics.applyConsent()
    assert.equal(scripts.length, 1)
    const entries = () => window.dataLayer.map(args => [...args])
    assert.equal(entries().filter(args => args[1] === 'page_view').length, 1)
    analytics.trackEvent('contact_sent', { email: 'private@example.com' })
    assert.doesNotMatch(JSON.stringify(entries()), /private@example|private=yes/)
    assert.equal(listeners.has('click'), true)
    analytics.saveConsent('declined'); analytics.applyConsent()
    const count = window.dataLayer.length
    analytics.trackEvent('contact_sent')
    assert.equal(window.dataLayer.length, count)
    assert.equal(window['ga-disable-G-7YD89MH3ZP'], true)
    assert.equal(listeners.has('click'), false)
  } finally {
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
})

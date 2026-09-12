# Website analytics

Google Analytics 4 measurement ID: `G-7YD89MH3ZP`.

The integration is in `src/lib/analytics.js`. It runs only in production builds on `ritwikreddy.com` or `www.ritwikreddy.com`. Localhost, Vercel preview domains, and development builds never load Google Analytics. No new dependency is required.

## Before pushing

In Google Analytics, open Admin → Data streams → your web stream. Turn off **Enhanced measurement** for this stream. This site explicitly sends page views, reading progress, and selected actions; disabling automatic measurement avoids overlapping scroll/link/form events and automatic collection of link URLs. GA4's native engagement-time measurement still operates through the Google tag.

Commit and push the changes yourself as usual. This implementation does not create a dashboard on the public website; reports belong to your Google Analytics property.

## Visitor choice and collection

Google's script loads only after the visitor allows analytics. Declining sends no analytics requests. The footer's Analytics preferences button lets visitors change their choice. Withdrawal disables the tag, removes this site's custom event listeners, and clears accessible GA cookies. Consent changes are synchronized across open tabs. When browser storage is unavailable, the choice lasts for the current page only.

Advertising storage and personalization are denied, Google signals are disabled, and analytics cookies are configured for 180 days. Explicit page URLs omit query strings and fragments; referrers are reduced to their origin. This limits campaign-detail reporting. Custom events never include form values, email addresses, message bodies, clipboard contents, or outbound URLs. Google Analytics still processes ordinary analytics request/device data as described in Google's privacy policy linked in the visitor notice.

Declined visits, blocked scripts, and local testing are absent from reports, so the figures represent measured traffic rather than every visitor. There is no backfill of earlier visits.

## Reports

- **Realtime:** after pushing, visit the live site and choose Allow analytics. Verify the page view appears in Realtime. This manual verification records a real visit; automated tests use a fake tag and never contact Google.
- **Pages and screens:** page views, users, and average engagement time for individual pages. Engagement time reflects time in focus; it is not proof someone read or understood the article.
- **Traffic acquisition:** referral sources. Detailed campaign query values are intentionally not sent by this integration.
- **Events / Explore:** the custom actions listed below. Standard reports may take 24–48 hours to populate.

| Event | Meaning |
| --- | --- |
| `article_progress` | Article body reached 25%, 50%, 75%, or 90% of its height during scrolling. The `percent_scrolled` parameter identifies the threshold. This is not whole-page scroll depth or proof of reading. |
| `article_engaged` | An article page accumulated 30, 60, 120, or 300 seconds in a visible, focused tab. `active_seconds` identifies the milestone. |
| `article_share` | Copy article link succeeded. Email sharing is counted as `email_click`. |
| `contact_sent` | EmailJS confirmed a successful send. Validation failures and rejected sends do not count. |
| `email_click` | An email link was clicked; this does not prove an email was sent. |
| `resume_download` | The résumé link was clicked; this does not prove the download completed. |
| `linkedin_click` | A LinkedIn link was clicked. |
| `rss_click` | The feed link was clicked; this does not prove a subscription. |

Each custom event includes `page_path`. Reading milestones fire at most once per threshold per tracking session on a loaded page. Navigation is a full page load, so the Google tag is configured once and sends one page view per page, after consent. Native GA4 engagement time is not manually overridden.

To break down custom events in Explore, register event-scoped custom dimensions for `page_path`, `percent_scrolled`, and `active_seconds` under Admin → Custom definitions. Mark `contact_sent` as a key event if successful enquiries are a goal. Do not sum `active_seconds`: these are milestone labels, not duration increments; use GA4's engagement-time metrics for duration.

## Validation

`npm test` checks production-host restrictions, URL minimization, link classification, consent-gated loading, duplicate-pageview prevention, and withdrawal. Tests never send events to the real property. Run `npm run lint` and `npm run build` before pushing.

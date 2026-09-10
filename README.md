# Ritwik's writing & portfolio

A React/Vite site with static HTML publishing. Articles, category pages, search metadata, an RSS feed, a sitemap, and a real 404 page are generated at build time. Existing `/notes/...` and `/reflections/...` addresses are preserved.

## Write a post

Create a Markdown file in `content/posts/`. The filename is for organization; `slug` controls the permanent address.

```markdown
---
title: "A clear, specific article title"
slug: "a-permanent-article-address"
description: "A short explanation of what readers will learn."
date: "2026-09-10"
category: "Engineering"
topics: ["Infrastructure", "Automation"]
status: "draft"
featured: false
---

Start with the problem and why it matters.

## The approach

Write normal Markdown with **emphasis**, `inline code`, and
[references](https://example.com).

### The tradeoffs

- What worked
- What did not
- When to use a different approach
```

`category` is `Engineering` or `Reflections`. `status` is `draft`, `preview`, or `published`:

- **draft:** excluded from all public pages, RSS, sitemap, and browser downloads. Change to preview locally when you want to inspect the rendering; do not deploy that change unless you want it public.
- **preview:** available by URL and under `/blog/previews`, marked as unfinished and `noindex`; excluded from homepage, main archive, RSS, and sitemap.
- **published:** included in the public archive and feed. Only published posts can be featured.

Use exact quoted dates for new articles. Existing `2026-05` dates retain their original month-only precision; an exact publication day has not been invented. Set `updated: "2026-09-12"` only after a substantive revision. Optionally set `image: "/images/article-cover.png"` to an existing image in `public/` for a post-specific social preview. Posts without an image still have title and description previews.

Headings get stable IDs such as `heading-the-approach`; link to a section using `[The approach](#heading-the-approach)`. A contents menu appears automatically at three or more headings. Use `##` and deeper headings because the article title supplies `h1`.

Fenced code blocks support language-aware highlighting. Put images in `public/images/` and use `![Descriptive alt text](/images/diagram.png "Optional caption")`. Inline links, nested lists, blockquotes, tables, and footnotes (`[^1]` with `[^1]: Source`) are supported. Raw HTML is escaped. Internal links must use full site paths such as `/notes/terraform-drift`; broken paths and article section links fail the build.

## Preview and publish

- `npm run dev`: live preview with full article HTML, including Markdown edits.
- `npm test`: content, draft, metadata, and feed checks.
- `npm run lint`: source checks.
- `npm run build`: generate the deployable `dist/` directory.
- `npm run preview`: serve that production build locally.

Before the first production build, set `url` in `site.config.json` to the site's real HTTPS origin (no path), or supply `SITE_URL`. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is also supported as a fallback. Use the custom domain as the primary URL when you have one. Never publish a build using localhost as its origin.

For a local-only production check in PowerShell:

```powershell
$env:SITE_URL = 'http://localhost:5174'
npm run build
```

The existing hosting workflow can deploy `dist/`. Root `vercel.json` uses clean static URLs; there is no SPA catch-all rewrite. Vercel serves `404.html` for missing pages. Other hosts must map directory indexes and serve the 404 file with HTTP status 404. Development and production preview servers also return HTTP 404 for unknown routes.

No new hosting service, account, or subscription is required. Publishing a new post means deploying a new build. Retain established article slugs; redirects should accompany any deliberate address change.

## Reader experience

The initial HTML includes the selected article and its metadata, even without JavaScript. Interactive code loads by page; articles do not load the portfolio, email SDK, or other post bodies. Theme preference is initialized before painting and persists when storage is available. Without JavaScript, all writing, navigation, contact email, and RSS links remain usable.

RSS is at `/feed.xml`. The feed includes finished articles only. Related articles are selected from finished posts sharing a category or topic. Copy-link feedback and form statuses are announced to assistive technology.

EmailJS retains the existing `VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, and `VITE_EMAILJS_KEY` configuration. The form appears when configured; direct email and LinkedIn links are always available. The email SDK loads only on submission. Tests must not send real messages.

## A sustainable publishing routine

Finish a few strong articles before featuring them. Explain a concrete problem, your approach, tradeoffs, evidence, and lessons; cite sources and distinguish personal observations from general claims. A short article is fine when it fully answers its question.

After publishing, share a useful summary on LinkedIn with the permanent article URL. Submit `/sitemap.xml` in your existing Google Search Console account. Review article visits, search referrals, and contact actions using your hosting analytics. No analytics account or tracking service has been connected by this change.

Revisit search when the archive reaches roughly 15–20 posts. Email subscriptions, a browser editor, comments, and user accounts are intentionally deferred until needed; RSS works now without account setup.

# Ritwik's portfolio & blog

The portfolio lives at `/`; the writing archive lives at `/blog`. Existing `/notes/:slug` and `/reflections/:slug` links remain valid.

## Add a post

Add an entry to `src/data/notes.js` (engineering) or `src/data/reflections.js` (reflections). Copy an existing entry and give it a unique, permanent slug. Notes use `description`; reflections use `text` for the summary. Set `date` to an ISO date such as `2026-09-09` for accurate chronological sorting. Older month-only dates remain supported.

Use `status: "draft"` to hide an unfinished post from the archive, home page, and article routes. Use `status: "preview"` to deliberately share a work in progress with a visible notice. Omit status when ready to publish. Reading time is calculated automatically.

Supported content blocks:

```js
{ type: "paragraph", text: "Your paragraph here." }
{ type: "heading", text: "A section title" }
{ type: "quote", text: "A quotation" }
{ type: "code", text: "terraform plan\nterraform apply" }
{ type: "list", items: ["First point", "Second point"] }
{ type: "link", text: "Source documentation", url: "https://example.com" }
```

Headings automatically appear in the article's contents navigation. Text is rendered safely as text, without raw HTML. Keep quoted material attributed through a nearby source link.

Run `npm run dev` to preview, `npm run lint` to check, and `npm run build` before deploying through your existing host. The root `vercel.json` enables direct links and refreshes on article routes when hosted on Vercel.

Publishing is file-based: this site does not include a browser editor or CMS. New posts go live when the updated site is deployed. Article titles and descriptions update in the browser; crawler-rendered previews would require prerendering or server rendering as a separate enhancement.

## Appearance

The header's Light/Dark button is available on every page. First visits follow the device color preference; explicit choices persist in local storage. If storage is unavailable, the switch still works for the current visit. Shared colors are defined in `src/index.css` and used by Tailwind throughout the site.

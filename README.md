# BCC Website (Astro + TypeScript + Tailwind)

Static site for Bethesda Christian Centre, preserving existing public URLs:

- `/` (served by `dist/index.html`)
- `/about.html`
- `/sunday-service.html`
- `/small-gatherings.html`
- `/our-beliefs.html`
- `/get-in-touch.html`
- `/read-learn.html`
- `/stashed_content.html`

## Install

1. Install Node.js (v20+ recommended).
2. Install dependencies:

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

Build output is generated into `dist/` and is ready for static hosting.

## Where content lives

All editable site content is stored in JSON files under:

- `src/content/data/site.json`  
  Shared church info (contact, address, service times, nav links, social links)
- `src/content/data/home.json`
- `src/content/data/about.json`
- `src/content/data/sunday-service.json`
- `src/content/data/small-gatherings.json`
- `src/content/data/beliefs.json`
- `src/content/data/read-learn.json`
- `src/content/data/contact.json`

Pages render from these files using Astro components in:

- `src/layouts/`
- `src/components/`
- `src/pages/`

## Update service times or contact info

Edit `src/content/data/site.json`:

- `serviceTimes`
- `email`
- `phone` and `phoneDisplay`
- `addressLines`
- `serviceLocation` and `serviceLocationLink`

Sunday page-specific wording is in:

- `src/content/data/sunday-service.json`

Get-in-touch page wording is in:

- `src/content/data/contact.json`

## Add a new page safely (without breaking existing URLs)

1. Create a new Astro page in `src/pages/`.
2. If you need an exact `.html` URL, use a filename without `.html` in source.  
   Example: `src/pages/new-ministry.astro` builds to `/new-ministry.html` because `build.format` is set to `file`.
3. Add navigation link in `src/content/data/site.json` if needed.
4. Run `npm run build` and verify the expected output file exists in `dist/`.

Do not rename existing route files for current public pages unless you also preserve their original URL paths.

## Cloudflare/static deploy notes

- Keep `CNAME` in the repository root and `public/CNAME` for build output.
- Deploy the built `dist/` folder to your static host.
- Cloudflare can sit in front of any static host serving `dist/` contents.
- `robots.txt` and `sitemap.xml` are generated at build time from Astro routes.

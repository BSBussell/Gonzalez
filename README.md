# Gonzalez Heating + Cooling

Single-page React 19 / TypeScript / Vite marketing site. The existing hero and rotating photographic showcase are enhanced by progressively enhanced service content and an HTML POST contact form.

## Development and verification

```sh
npm install
npm run dev
npm run lint
npm run build
node scripts/check-build.mjs
npm run preview
```

`npm run build` type-checks, bundles a temporary server renderer with Vite, builds the client, then inserts React-rendered HTML and JSON-LD into `dist/index.html`. The temporary renderer is removed. No server runtime, router, or new dependency is required. `src/main.tsx` hydrates built HTML and uses client rendering during development. Browser globals must stay inside effects so prerendering and hydration agree.

`check-build.mjs` verifies rendered content, one H1, service panels and their unhidden server-rendered fallback, structured data, unique IDs, local links/assets, and domain-dependent indexing files. Preview builds and configured builds were exercised; use a disposable example domain/endpoint for configuration checks, never submit test customer inquiries.

## Configuration and launch

Copy `.env.example` to `.env.local` or set variables in the build environment:

- `VITE_SITE_URL`: final public HTTPS origin, e.g. `https://your-domain.com` (no path). With this set, the build generates the canonical, absolute social URLs, an indexable robots meta tag, `robots.txt`, and a one-URL sitemap. Without it, the build is **noindex**, omits canonical/sitemap, and warns. Keep this empty for preview deployments. This is indexing control, not access control.
- `VITE_CONTACT_FORM_ACTION`: hosted HTTPS POST endpoint, e.g. the client's Formspree endpoint. Without it, the form remains visible with a call notice and disabled submission. Configure spam protection, delivery recipients, and success/error pages at the form provider. Never put secrets in `VITE_` variables.

The earlier `VITE_FORMSPREE_ID` README instruction was stale; it is not supported by the form.

Before publishing:

1. Confirm the business facts and service scope listed in `LAUNCH.md`.
2. Set the final domain and form endpoint; rebuild and run the checks.
3. Host `dist/` with HTTPS. Redirect alternate hosts to the canonical origin. Serve genuine 404 responses for nonexistent paths rather than rewriting every URL to this single page.
4. Configure compression and asset caching at the host (immutable for hashed `/assets/`; revalidate HTML). No hosting provider has been configured in this repository.
5. Verify the deployed page, images, canonical, sitemap, robots, real mobile performance, and form delivery with client-approved test data. Check provider failure and spam handling too.
6. Register Google Search Console/Bing Webmaster Tools, submit the sitemap, and verify the client's business listing details. Configure lead measurement and appropriate privacy disclosures once the client chooses providers and data practices.

## Ownership and assets

- `src/data/business.ts`: business name, contact, location, and display hours. Build schema hours currently mirror the display schedule; update both if it changes.
- `src/data/services.ts`: shared service descriptions, labels, scope notes, form options, and Service schema content.
- `src/components/ServicesShowcase.tsx`: a single service content tree. The server renders all five articles visibly; React enables rotation after mounting. Stable service fragment IDs also match schema URLs.
- `scripts/build.mjs`: build orchestration, metadata, HVACBusiness/Service JSON-LD, sitemap, robots. No fabricated address, ratings, credentials, or FAQ rich-result claims.
- `src/styles/theme.css`: theme and focus/motion rules. Fonts load through one stylesheet link in `index.html`.
- `public/images/`: responsive 640/1320px WebP versions of the existing photographs. Original photographs are retained. The hero stays uncropped; showcase images remain decorative.
- `src/assets/logo.webp` and `public/favicon-48.png`: smaller derivatives of the supplied logo. The existing `public/og-image.png` is retained.

The showcase pauses on text hover, keyboard focus, page/section invisibility, reduced motion, or its persistent Pause control. Left/Right/Home/End keys select services. Its initial state is deterministic for hydration. All service articles and contact links remain available without JavaScript. No duplicate service section is rendered.

`AGENTS.md` is intentionally gitignored local engineering memory.

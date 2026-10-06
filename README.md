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

## GitHub Pages production branch

Keep development on `main`. `prod` contains only the generated site, with `index.html`, assets, and `.nojekyll` at its root. In GitHub Settings → Pages, select **Deploy from a branch → prod → / (root)**.

From a clean, committed source checkout:

```sh
git switch main
npm run deploy:prod          # build, validate, and update local prod
npm run deploy:prod -- --push # also push prod to origin
```

The command leaves your source checkout in place. It creates a normal commit on `prod` using an isolated Git index; old output disappears from the new tree without deleting source files. It refuses dirty source checkouts and any checked-out `prod` branch. It does not force-push. If a push is rejected because another checkout deployed, fetch and reconcile `prod` before retrying. Push source commits on `main` separately to retain the publishing command on GitHub.

The default deployment base comes from the GitHub remote (`/Gonzalez/` for this repository). `VITE_BASE_PATH=/` supports a domain-root deployment; an existing production `CNAME` is preserved, and `public/CNAME` can set or replace it. A configured `VITE_SITE_URL` or CNAME defaults the deployment base to `/`. To remove a custom domain, remove its CNAME from `prod` and update GitHub Pages settings. Ordinary `npm run build` still defaults to `/`; use `VITE_BASE_PATH=/Gonzalez/` for a manual project-path build and pass the same variable to `check-build.mjs`.

Production builds use `https://gonzalezhvacknox.com/`, configured in tracked `.env.production`, with root-relative assets and an indexable canonical/sitemap. `public/CNAME` declares the same domain for GitHub Pages. DNS and Pages domain/HTTPS settings must still be configured at their providers. For a noindex preview, explicitly override `VITE_SITE_URL` with an empty environment value; use `VITE_BASE_PATH` to match the preview host path. The existing contact fallback stays disabled until an endpoint is configured. This command does not change Pages settings or configure a domain/form provider.

## Form confirmation page

The build generates `/thank-you/index.html`, available at `https://gonzalezhvacknox.com/thank-you/`. It uses the shared header/footer, provides home/call actions, is prerendered and hydrated, and remains noindex and outside the sitemap. Navigation returns to the home page sections. No submission data is stored or shown on this page; it is a redirect destination, not proof of delivery.

After publishing the page, set Formspree’s form Settings → Redirect to that URL. Formspree’s custom redirect is available on Personal, Professional, and Business plans: https://help.formspree.io/articles/form-and-project-settings/thank-you-redirect. A free-plan implementation would need JavaScript submission and a redirect only after the provider confirms success. The native POST form currently retains the provider’s success/error handling until its settings are configured. Do not redirect on a submit click or pretend a failed request succeeded.

## Configuration and launch

Production defaults live in `.env.production`. Set overrides in `.env.production.local` (gitignored) or the build environment. For development, use `.env.local`; avoid an empty site URL there if you want to retain the production default:

- `VITE_SITE_URL`: final public HTTPS origin, e.g. `https://your-domain.com` (no path). With this set, the build generates the canonical, absolute social URLs, an indexable robots meta tag, `robots.txt`, and a one-URL sitemap. Without it, the build is **noindex**, omits canonical/sitemap, and warns. Keep this empty for preview deployments. This is indexing control, not access control.
- `VITE_CONTACT_FORM_ACTION`: hosted HTTPS POST endpoint, e.g. the client's Formspree endpoint. Without it, the form remains visible with a call notice and disabled submission. Configure spam protection, delivery recipients, and success/error pages at the form provider. Never put secrets in `VITE_` variables.

The earlier `VITE_FORMSPREE_ID` README instruction was stale; it is not supported by the form.

Before publishing:

1. Confirm the business facts and service scope listed in `LAUNCH.md`.
2. Set the final domain and form endpoint; rebuild and run the checks.
3. Host `dist/` with HTTPS. Redirect alternate hosts to the canonical origin. Serve genuine 404 responses for nonexistent paths rather than rewriting every URL to this single page.
4. Configure compression and asset caching at the host (immutable for hashed `/assets/`; revalidate HTML). The production-branch command supports GitHub Pages; configure its publishing source as described above.
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

# Launch handoff

## Audit and changes

The original production HTML contained an empty React root. Search metadata referred to “the Valley” while visible content said Knoxville, and social metadata asserted licensing/insurance without evidence. There was no canonical, sitemap, robots file, or structured data. Important service details depended on a rotating presentation. The README documented a form variable the code did not use. Displayed photography totaled about 8.06 MB in original formats; the favicon and small header logo were oversized.

This pass preserves the visual system and adds build-time rendering, a progressively enhanced showcase, factual Knoxville metadata, HVACBusiness and Service JSON-LD, domain-driven canonical/social/sitemap output, responsive image derivatives, explicit rotation pause, clearer required fields/contact instructions, and corrected deployment documentation. The duplicate service guide was subsequently removed: one set of service articles is visible in initial HTML and enhanced into the existing rotating showcase after mount. The existing social image was present and retained. Original image files remain in public for source preservation, but the UI requests the smaller derivatives.

## Required client confirmation

- Exact public business name, working phone/email, service hours, and whether Knoxville is the complete service area. No surrounding towns were invented.
- Resolve installation scope: commercial copy mentions installations and residential copy replacements, while line-running excludes appliance/unit installation. The exclusion is now explicitly scoped to that service, but the client must approve that interpretation.
- Confirm existing claims about family ownership, priority response for contract customers, upfront estimates, gas pressure/leak testing, and code documentation. These were inherited from site copy, not independently verified.
- Ask for verified license details, insurance wording, certifications, years in business, relevant manufacturer affiliations, and permission before publishing credentials.
- Confirm who receives leads, expected response timing, available scheduling, form provider, spam handling, and approved privacy/data-retention language.
- Request approved reviews with attribution and permission, completed-project details (problem/work/result), original photos and usage permission, and a public business-profile URL. Do not fabricate reviews or guarantees.

## Launch configuration

Set `VITE_SITE_URL` and `VITE_CONTACT_FORM_ACTION`, rebuild, and verify host configuration as described in README. An unset domain deliberately generates a noindex preview. No domain, account, hosting, form delivery, or analytics integration was configured or published in this pass.

No postal street address was supplied; schema does not invent one. HVACBusiness markup describes the business but does not establish eligibility for Google's local-business rich results. Verify live markup with search-engine tools after facts and domain are finalized.

## Focused follow-ups

1. Claim/verify the business listing and align name, phone, hours, and service area across authoritative profiles.
2. Create substantive residential/commercial/repair service pages only once the client supplies specific equipment, scope, process, and project evidence. Avoid near-duplicate town pages.
3. Publish real project stories with approved photography and outcomes; these can support both customer trust and service-page depth.
4. Add a short FAQ when the client can answer installation scope, coverage, estimates, maintenance, scheduling, and response-time questions accurately.
5. Measure qualified calls and completed requests after selecting analytics/privacy practices. Use Search Console and Bing Webmaster Tools to assess discovery and indexing before expanding content.

## Verification limits

Build, lint, and built-HTML checks passed. Configured output was checked with an example HTTPS domain and endpoint; final output was rebuilt without those test values. Browser checks covered production rendering, hero image loading, 390px and 1280px overflow, mobile contact layout, service selection, End-key selection, persistent pause state, and (in the earlier pass) disclosure expansion. No warnings/errors were captured during those interactions.

No real form was submitted. Live delivery, deployed HTTP headers/statuses, real-user Core Web Vitals, search indexing/ranking, and OS reduced-motion switching were not verified. The no-JavaScript content path was checked in generated HTML, not with JavaScript disabled in a browser. Dependency browser-target data reports age warnings; build and lint still pass.

## Reference rationale

Google recommends prerendering/server rendering for users and crawlers: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

Bing describes clear, discoverable content and discourages manipulative AI-targeting practices: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

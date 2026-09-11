import { build, loadEnv } from 'vite'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const rawUrl = env.VITE_SITE_URL?.trim()
let siteUrl
if (rawUrl) {
  const url = new URL(rawUrl)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || url.hostname === 'localhost') {
    throw new Error('VITE_SITE_URL must be a public HTTPS origin, without path, credentials, query, or hash.')
  }
  siteUrl = url.origin + '/'
}
if (env.VITE_CONTACT_FORM_ACTION) {
  const endpoint = new URL(env.VITE_CONTACT_FORM_ACTION)
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('VITE_CONTACT_FORM_ACTION must be an HTTPS endpoint without credentials.')
}
const serverDir = resolve('node_modules/.cache/gonzalez-prerender')
try {
  await build({ build: { ssr: 'src/entry-server.ts', outDir: serverDir, copyPublicDir: false } })
  await build()
  const { render, BUSINESS, SERVICES } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')).href)
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const title = 'Knoxville HVAC & Gas Line Services | Gonzalez Heating + Cooling'
  const description = 'Gonzalez Heating + Cooling LLC provides residential and commercial HVAC repairs, maintenance, and gas line services in Knoxville, TN. Call 865-385-7289.'
  const businessId = siteUrl ? `${siteUrl}#business` : '#business'
  const graph = [{
    '@type': 'HVACBusiness', '@id': businessId, name: BUSINESS.name,
    telephone: BUSINESS.phoneInternational, email: BUSINESS.email,
    areaServed: { '@type': 'City', name: BUSINESS.location },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '17:00' },
    ...(siteUrl ? { url: siteUrl, image: `${siteUrl}images/GonzalezPicture-1320.webp` } : {}),
  }, ...SERVICES.map((service) => ({
    '@type': 'Service', '@id': `${siteUrl || ''}#service-${service.id}`,
    name: service.title, description: [service.summary, ...service.details, service.disclaimer].filter(Boolean).join(' '),
    provider: { '@id': businessId }, areaServed: { '@type': 'City', name: BUSINESS.location },
    ...(siteUrl ? { url: `${siteUrl}#service-${service.id}` } : {}),
  }))]
  const metadata = [
    `<meta name="robots" content="${siteUrl ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:site_name" content="${escape(BUSINESS.name)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    ...(siteUrl ? [
      `<link rel="canonical" href="${escape(siteUrl)}" />`,
      `<meta property="og:url" content="${escape(siteUrl)}" />`,
      `<meta property="og:image" content="${escape(siteUrl)}og-image.png" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:image" content="${escape(siteUrl)}og-image.png" />`,
    ] : []),
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ')
  let html = await readFile('dist/index.html', 'utf8')
  html = html.replace('<!--seo-head-->', metadata).replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  await writeFile('dist/index.html', html)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`)
  if (siteUrl) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl)}</loc></url></urlset>\n`)
  else console.warn('Preview build is noindex. Set VITE_SITE_URL to generate an indexable site, canonical, and sitemap.')
  if (!env.VITE_CONTACT_FORM_ACTION) console.warn('Contact endpoint is unconfigured; call/email fallback remains available.')
} finally {
  await rm(serverDir, { recursive: true, force: true })
}

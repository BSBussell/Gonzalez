import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
const html = await readFile('dist/index.html', 'utf8')
assert.equal((html.match(/<h1\b/g) || []).length, 1)
assert.ok(html.includes('Gonzalez Heating + Cooling LLC provides'))
const services = [...html.matchAll(/<article\b([^>]*)>(.*?)<\/article>/gs)]
assert.equal(services.length, 5)
assert.ok(!html.includes('service-guide'))
assert.ok(html.includes('data-enhanced="false"'))
for (const [, attributes, content] of services) {
  assert.ok(!attributes.includes('inert') && !attributes.includes('aria-hidden="true"'))
  assert.ok(!attributes.includes('invisible'))
  assert.ok(content.includes('<h3') && content.includes('<ul'))
}
assert.ok(!html.includes('<!--seo-head-->'))
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
assert.equal(schema['@graph'][0]['@type'], 'HVACBusiness')
assert.equal(schema['@graph'].filter(item => item['@type'] === 'Service').length, 5)
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs')
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `Missing anchor ${id}`)
for (const [, path] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) await access(`dist${path}`)
const canonical = html.match(/rel="canonical" href="([^"]+)"/)
if (canonical) {
  assert.ok(html.includes('content="index, follow, max-image-preview:large"'))
  assert.ok((await readFile('dist/sitemap.xml', 'utf8')).includes(`<loc>${canonical[1]}</loc>`))
  assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${canonical[1]}sitemap.xml`))
} else {
  assert.ok(html.includes('content="noindex, follow"'))
  await assert.rejects(access('dist/sitemap.xml'))
}
console.log('Built HTML: content, schema, anchors, assets, and indexing configuration passed.')

/**
 * Genera public/sitemap.xml y public/robots.txt a partir de VITE_SITE_URL y el catálogo.
 * Ejecutar con: node scripts/generate-seo-files.mjs (npm run prebuild).
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const env = loadEnv('production', root, '')
const base = (env.VITE_SITE_URL || 'https://www.lartisan.com').replace(/\/$/, '')

const catalogPath = join(root, 'src', 'data', 'catalogo.js')
const { productosFlat } = await import(catalogPath)

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const locs = new Set()
const add = (path) => locs.add(`${base}${path.startsWith('/') ? path : `/${path}`}`)

add('/')
add('/productos')
add('/recetas')
add('/nosotros')
add('/contacto')

for (const p of productosFlat) {
  if (p?.slugGlobal) add(`/productos/${p.slugGlobal}`)
}

const urlEntries = [...locs].sort().map((loc) => {
  const priority = loc === `${base}/` ? '1.0' : loc.includes('/productos/') ? '0.75' : '0.85'
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`

mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
writeFileSync(join(root, 'public', 'robots.txt'), robots, 'utf8')

console.log(`SEO: generados sitemap (${locs.size} URLs) y robots.txt → ${base}`)

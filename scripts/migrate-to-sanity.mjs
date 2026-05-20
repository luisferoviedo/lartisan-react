/**
 * Migra catalogo.js + recetas.js a Sanity CMS.
 * Sube imágenes de public/ como assets de Sanity.
 * Uso: SANITY_TOKEN=xxx node scripts/migrate-to-sanity.mjs
 */
import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { catalogo } from '../src/data/catalogo.js'
import { recetas } from '../src/data/recetas.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '../public')

const client = createClient({
  projectId: 'zaggnqkb',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Cache de assets subidos (evita duplicados)
const assetCache = new Map()

async function uploadImage(publicPath) {
  if (!publicPath) return null
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)

  // Ruta en disco: /catalogo/xxx.webp → public/catalogo/xxx.webp
  const filePath = path.join(PUBLIC, publicPath)
  if (!existsSync(filePath)) {
    console.log(`  ⚠ Imagen no encontrada: ${filePath}`)
    return null
  }

  const ext = path.extname(filePath).replace('.', '')
  const mimeType = ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'

  try {
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: mimeType,
    })
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    assetCache.set(publicPath, ref)
    console.log(`  ✓ Imagen subida: ${path.basename(filePath)}`)
    return ref
  } catch (err) {
    console.log(`  ✗ Error subiendo ${path.basename(filePath)}: ${err.message}`)
    return null
  }
}

function makeSlug(value) {
  return { _type: 'slug', current: value }
}

async function buildProducto(p) {
  const imagen = await uploadImage(p.imagen)

  const galeria = []
  for (const src of (p.galeria || [])) {
    const asset = await uploadImage(src)
    if (asset) galeria.push({ ...asset, _key: Math.random().toString(36).slice(2) })
  }

  return {
    _type: 'producto',
    _key: p.slugGlobal ?? p.slug ?? Math.random().toString(36).slice(2),
    nombre: p.nombre ?? '',
    frase: p.frase ?? '',
    slug: makeSlug(p.slug ?? ''),
    slugGlobal: makeSlug(p.slugGlobal ?? ''),
    precio: p.precio ?? null,
    presentacion: p.presentacion ?? '',
    peso: p.peso ?? '',
    sellos: p.sellos ?? [],
    atributos: p.atributos ?? [],
    ingredientes: p.ingredientes ?? [],
    historiaCorta: p.historiaCorta ?? '',
    descripcionLarga: p.descripcionLarga ?? '',
    usos: p.usos ?? [],
    maridajeSugerido: p.maridajeSugerido ?? '',
    coccion: (p.coccion ?? []).map((c, i) => ({ ...c, _type: 'object', _key: `coccion_${i}` })),
    conservacion: p.conservacion ?? [],
    ...(imagen ? { imagen } : {}),
    ...(galeria.length ? { galeria } : {}),
  }
}

async function migrateCategorias() {
  console.log('\n📦 Migrando categorías y productos...\n')

  // Borrar documentos existentes para re-crear limpios
  const existing = await client.fetch('*[_type == "categoria"]._id')
  if (existing.length) {
    console.log(`  Eliminando ${existing.length} categorías existentes...`)
    const tx = client.transaction()
    existing.forEach(id => tx.delete(id))
    await tx.commit()
  }

  for (let i = 0; i < catalogo.length; i++) {
    const cat = catalogo[i]
    console.log(`\n→ Categoría: ${cat.titulo}`)

    let items = []
    let secciones = []

    if (cat.items?.length) {
      for (const p of cat.items) {
        items.push(await buildProducto(p))
      }
    }

    if (cat.secciones?.length) {
      for (const sec of cat.secciones) {
        const secItems = []
        for (const p of sec.items ?? []) {
          secItems.push(await buildProducto(p))
        }
        secciones.push({
          _type: 'object',
          _key: sec.slug,
          titulo: sec.titulo,
          slug: makeSlug(sec.slug),
          items: secItems,
        })
      }
    }

    const doc = {
      _type: 'categoria',
      _id: `categoria-${cat.slug}`,
      titulo: cat.titulo,
      slug: makeSlug(cat.slug),
      orden: i + 1,
      ...(items.length ? { items } : {}),
      ...(secciones.length ? { secciones } : {}),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${cat.titulo} guardada`)
  }
}

async function migrateRecetas() {
  console.log('\n🍳 Migrando recetas...\n')

  const existing = await client.fetch('*[_type == "receta"]._id')
  if (existing.length) {
    const tx = client.transaction()
    existing.forEach(id => tx.delete(id))
    await tx.commit()
  }

  for (let i = 0; i < recetas.length; i++) {
    const r = recetas[i]
    console.log(`→ Receta: ${r.titulo}`)

    const doc = {
      _type: 'receta',
      _id: `receta-${r.slug}`,
      titulo: r.titulo,
      slug: makeSlug(r.slug),
      orden: i + 1,
      tiempo: r.tiempo ?? '',
      dificultad: r.dificultad ?? 'Fácil',
      ingredientes: r.ingredientes ?? [],
      pasos: r.pasos ?? [],
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${r.titulo} guardada`)
  }
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ Falta SANITY_TOKEN')
    process.exit(1)
  }

  console.log('🚀 Iniciando migración a Sanity...')
  await migrateCategorias()
  await migrateRecetas()
  console.log('\n✅ Migración completa.')
}

main().catch(err => { console.error(err); process.exit(1) })

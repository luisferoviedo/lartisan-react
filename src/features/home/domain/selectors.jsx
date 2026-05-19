export function flattenCatalog(catalogo = []) {
  const out = []
  for (const cat of catalogo) {
    if (cat?.items?.length) {
      for (const p of cat.items) out.push({ ...p, _cat: cat.titulo })
    }
    if (cat?.secciones?.length) {
      for (const sec of cat.secciones) {
        for (const p of sec.items || []) {
          out.push({ ...p, _cat: `${cat.titulo} · ${sec.titulo}` })
        }
      }
    }
  }
  return out
}

export function getDestacados(catalogo, limit = 6) {
  const flat = flattenCatalog(catalogo)
  if (!flat.length) return []

  const byCategory = new Map()
  for (const product of flat) {
    const key = product.categoriaSlug || product._cat || 'general'
    if (!byCategory.has(key)) byCategory.set(key, [])
    byCategory.get(key).push(product)
  }

  const picks = []
  const seen = new Set()

  for (const items of byCategory.values()) {
    const first = items[0]
    if (first && !seen.has(first.slugGlobal)) {
      picks.push(first)
      seen.add(first.slugGlobal)
    }
  }

  for (const product of flat) {
    if (picks.length >= limit) break
    if (seen.has(product.slugGlobal)) continue
    picks.push(product)
    seen.add(product.slugGlobal)
  }

  return picks.slice(0, limit)
}

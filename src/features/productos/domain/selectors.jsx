import {
  COCCION_FALLBACK,
  CONSERVACION_FALLBACK,
  MOBILE_BREAKPOINT,
  USOS_FALLBACK,
  MARIDAJE_FALLBACK,
} from './constants'

export function flattenCategoryProducts(cat) {
  const out = []
  if (cat.items?.length) {
    for (const product of cat.items) out.push({ product, secTitulo: null })
  }
  if (cat.secciones?.length) {
    for (const section of cat.secciones) {
      for (const product of section.items || []) out.push({ product, secTitulo: section.titulo })
    }
  }
  return out
}

function matchesQuery(product, categoryTitle, sectionTitle, query) {
  return !query || `${product.nombre} ${categoryTitle} ${sectionTitle ?? ''}`.toLowerCase().includes(query)
}

export function filterCatalog(catalogo, query) {
  if (!query) return catalogo

  return catalogo
    .map((cat) => {
      const items = (cat.items || []).filter((product) => matchesQuery(product, cat.titulo, null, query))
      const secciones = (cat.secciones || [])
        .map((sec) => ({
          ...sec,
          items: (sec.items || []).filter((product) => matchesQuery(product, cat.titulo, sec.titulo, query)),
        }))
        .filter((sec) => sec.items.length > 0)

      return {
        ...cat,
        items,
        secciones,
      }
    })
    .filter((cat) => (cat.items && cat.items.length > 0) || (cat.secciones && cat.secciones.length > 0))
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
}

export function getMobileCategoryLabel(cat, secTitulo) {
  return secTitulo ? `${cat.titulo} · ${secTitulo}` : cat.titulo
}

export function cookMetaFallback(titulo = '') {
  const t = titulo.toLowerCase()
  if (t.includes('parrilla')) return { tiempo: '10–12 min', fuego: 'Fuego medio', nivel: 'Fácil' }
  if (t.includes('sart') || t.includes('plancha')) return { tiempo: '8–10 min', fuego: 'Fuego medio', nivel: 'Fácil' }
  if (t.includes('air') || t.includes('horno')) return { tiempo: '15–18 min', fuego: '180°C', nivel: 'Fácil' }
  return { tiempo: '—', fuego: '—', nivel: 'Fácil' }
}

export function deriveProductDetailFields(product) {
  const highlights = Array.isArray(product.atributos) ? product.atributos.slice(0, 3) : []
  const intro = product.descripcionLarga ?? product.historiaCorta ?? product.frase
  const maridaje = product.maridajeSugerido ?? product.maridaje ?? MARIDAJE_FALLBACK[product.categoriaSlug] ?? ''
  const coccion = product.coccion?.length ? product.coccion : COCCION_FALLBACK
  const conservacion = product.conservacion?.length ? product.conservacion : CONSERVACION_FALLBACK
  const usos = product.usos?.length ? product.usos : (USOS_FALLBACK[product.categoriaSlug] ?? ['Parrilla', 'Plancha'])

  const galeria = Array.isArray(product.galeria) && product.galeria.length
    ? product.galeria
    : [
      `/catalogo/galeria/${product.slugGlobal}-1.webp`,
      `/catalogo/galeria/${product.slugGlobal}-2.webp`,
      `/catalogo/galeria/${product.slugGlobal}-3.webp`,
    ]

  return {
    highlights,
    intro,
    maridaje,
    coccion,
    conservacion,
    usos,
    galeria,
  }
}

export function filterVisibleGallery(galeria, brokenThumbs) {
  return galeria
    .slice(0, 3)
    .map((src, idx) => ({ src, idx }))
    .filter(({ idx }) => !brokenThumbs.has(idx))
}

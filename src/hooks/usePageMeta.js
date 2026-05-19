import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSiteUrl, toAbsoluteUrl } from '../utils/siteUrl'

const BRAND = "L'Artisan"
const DEFAULT_DESC = 'Charcutería artesanal en Medellín con pedidos por WhatsApp.'
const DEFAULT_OG_IMAGE_PATH = '/brand/logo.webp'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => {
    el.setAttribute(k, v)
  })
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * SEO por ruta: título, descripción, canonical, og:url, og:image absolutos.
 * @param {{ title?: string, description?: string, ogImagePath?: string }} opts
 *   ogImagePath — ruta bajo el sitio (ej. /covers/x.webp) o URL absoluta.
 */
export function usePageMeta({ title, description, ogImagePath } = {}) {
  const location = useLocation()
  const pathname = location.pathname || '/'

  useEffect(() => {
    const siteUrl = getSiteUrl()
    const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} — Herencia Charcutera`
    const desc = description || DEFAULT_DESC
    const pathForCanonical = pathname || '/'
    const canonical = `${siteUrl}${pathForCanonical.startsWith('/') ? pathForCanonical : `/${pathForCanonical}`}`
    const defaultImage = toAbsoluteUrl(siteUrl, DEFAULT_OG_IMAGE_PATH)
    const ogImage = ogImagePath
      ? (toAbsoluteUrl(siteUrl, ogImagePath) || defaultImage)
      : defaultImage

    document.title = fullTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: desc })
    upsertCanonical(canonical)

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: desc })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'es_CO' })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })
  }, [title, description, ogImagePath, pathname])
}

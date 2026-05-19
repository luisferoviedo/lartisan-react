/** URL pública del sitio (sin barra final). Usada en canonical y Open Graph. */
const DEFAULT_SITE_URL = 'https://www.lartisan.com'

export function getSiteUrl() {
  const raw = import.meta.env.VITE_SITE_URL
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/$/, '')
  }
  return DEFAULT_SITE_URL
}

/** Convierte ruta relativa del sitio o URL absoluta en URL absoluta para og:image. */
export function toAbsoluteUrl(siteUrl, pathOrUrl) {
  if (!pathOrUrl) return null
  const s = String(pathOrUrl).trim()
  if (/^https?:\/\//i.test(s)) return s
  const base = siteUrl.replace(/\/$/, '')
  const path = s.startsWith('/') ? s : `/${s}`
  return `${base}${path}`
}

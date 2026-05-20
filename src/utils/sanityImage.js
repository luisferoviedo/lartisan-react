const SANITY_CDN = 'cdn.sanity.io'

function isSanityUrl(url) {
  return typeof url === 'string' && url.includes(SANITY_CDN)
}

/**
 * Builds an optimized Sanity CDN URL with width, format and quality params.
 * Falls through unchanged for non-Sanity URLs or missing src.
 */
export function sanityUrl(rawUrl, { w, q = 75, fm = 'webp' } = {}) {
  if (!isSanityUrl(rawUrl)) return rawUrl ?? ''
  const url = new URL(rawUrl)
  if (w) url.searchParams.set('w', String(w))
  url.searchParams.set('q', String(q))
  url.searchParams.set('fm', fm)
  url.searchParams.set('fit', 'max')
  return url.toString()
}

/**
 * Generates a srcset string for a Sanity CDN image.
 * Returns undefined for non-Sanity URLs so the browser falls back to src.
 */
export function sanitySrcSet(rawUrl, widths = [400, 800, 1200, 1600]) {
  if (!isSanityUrl(rawUrl)) return undefined
  return widths
    .map((w) => `${sanityUrl(rawUrl, { w })} ${w}w`)
    .join(', ')
}

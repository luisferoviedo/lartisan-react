import { sanityUrl, sanitySrcSet } from '../utils/sanityImage'

/**
 * Imagen robusta con soporte responsive automático para URLs de Sanity CDN.
 * - Si `src` es una URL de Sanity: genera srcset (400/800/1200/1600w) + WebP automático
 * - Si falla, intenta `fallbackSrc` una sola vez
 * - Para URLs externas o estáticas: comportamiento normal de <img>
 */
export default function ImageWithFallback({
  src,
  fallbackSrc = '',
  alt = '',
  sizes,
  onError,
  ...imgProps
}) {
  if (!src) return null

  const optimizedSrc = sanityUrl(src, { w: 1200 })
  const srcSet = sanitySrcSet(src)

  return (
    <img
      key={src}
      {...imgProps}
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget

        if (fallbackSrc && img.dataset.fallbackApplied !== '1') {
          img.dataset.fallbackApplied = '1'
          img.src = sanityUrl(fallbackSrc, { w: 1200 })
          img.srcset = ''
          return
        }

        onError?.(e)
      }}
    />
  )
}

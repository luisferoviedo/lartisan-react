// Imagen robusta: si falla `src`, intenta `fallbackSrc` una sola vez.
export default function ImageWithFallback({
  src,
  fallbackSrc = '',
  alt = '',
  onError,
  ...imgProps
}) {
  if (!src) return null

  return (
    <img
      key={src}
      {...imgProps}
      src={src}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget

        if (fallbackSrc && img.dataset.fallbackApplied !== '1') {
          img.dataset.fallbackApplied = '1'
          img.src = fallbackSrc
          return
        }

        onError?.(e)
      }}
    />
  )
}

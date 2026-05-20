import ImageWithFallback from '../../../../components/ImageWithFallback'

export default function CategoryHero({ title, subtitle, cover, eager, sizes, highlights = [] }) {
  return (
    <div className="cat-hero">
      {cover
        ? (
          <ImageWithFallback
            className="cat-hero-img"
            src={cover}
            alt={title}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            sizes={sizes || '(max-width: 980px) 100vw, 1100px'}
            width="1600"
            height="900"
          />
        )
        : <div className="cat-hero-fallback" aria-hidden="true" />
      }
      <div className="cat-hero-content">
        <span className="cat-hero-eyebrow">Colección</span>
        <h2 className="h2 cat-hero-title">{title}</h2>
        <p className="p cat-hero-subtitle">{subtitle || 'Charcutería de alto valor para una experiencia superior en mesa y parrilla.'}</p>
        {Array.isArray(highlights) && highlights.length > 0 && (
          <div className="cat-hero-highlights" aria-label={`Usos destacados de ${title}`}>
            {highlights.slice(0, 3).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

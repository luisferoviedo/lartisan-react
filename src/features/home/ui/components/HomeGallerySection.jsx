import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { HOME_GALLERY_ITEMS } from '../../domain/constants'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function HomeGallerySection({
  eyebrow = 'Galería de producto',
  title = 'Imágenes que sí ayudan a vender mejor',
  subtitle = 'Una galería pensada para mostrar acabado, textura y servicio con una lectura más comercial y menos decorativa.',
  ctaLabel = null,
  ctaTo = null,
  items: providedItems = null,
  centered = false,
  showGuide = true,
}) {
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const items = useMemo(
    () =>
      Array.isArray(providedItems) && providedItems.length > 0
        ? providedItems
        : HOME_GALLERY_ITEMS,
    [providedItems],
  )

  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < items.length - 1

  const goTo = (targetIndex) => {
    const bounded = Math.max(0, Math.min(items.length - 1, targetIndex))
    const element = itemRefs.current[bounded]
    if (!element) return
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  useEffect(() => {
    const root = trackRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return

        const nextIndex = Number(visible.target.getAttribute('data-index'))
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex)
      },
      {
        root,
        threshold: [0.55, 0.7, 0.9],
      },
    )

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items.length])

  return (
    <section className="section home-gallery">
      <div className="container section-shell">
        <div className={`section-header home-section-head ${centered ? 'is-centered' : ''}`}>
          <div className="section-header-intro home-section-intro">
            <span className="section-kicker home-section-eyebrow">{eyebrow}</span>
            <h2 className="h2 section-title home-section-title">{title}</h2>
            <p className="p section-subtitle home-section-subtitle">{subtitle}</p>
          </div>
          {ctaLabel && ctaTo ? (
            <Link className="btn btn-secondary" to={ctaTo} {...prefetchIntentProps(ctaTo)}>
              {ctaLabel}
            </Link>
          ) : showGuide ? (
            <div className="home-gallery-guide" aria-label="Criterios para revisar la galería">
              <span className="chip chip-glass">Acabado</span>
              <span className="chip chip-glass">Textura</span>
              <span className="chip chip-glass">Servicio</span>
            </div>
          ) : null}
        </div>
        <div className="home-gallery-carousel">
          <div className="home-gallery-scroll" ref={trackRef} aria-label="Carrusel con scroll de galería premium">
            {items.map((item, index) => (
              <article
                key={item.file}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                data-index={index}
                className={`home-gallery-slide ${index === activeIndex ? 'is-active' : ''}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <div className="home-gallery-slide-media">
                  <span className="chip chip-glass home-gallery-slide-chip">{item.eyebrow}</span>
                  <img
                    src={`/galeria/${item.file}`}
                    alt={item.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    sizes="(max-width: 980px) 88vw, 40vw"
                    width="1400"
                    height="900"
                    className="home-gallery-slide-image"
                  />
                </div>
                <div className="home-gallery-slide-caption">
                  <div>
                    <span className="home-gallery-slide-kicker">{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <small className="home-gallery-slide-index">{index + 1} / {items.length}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="home-gallery-controls">
            <button
              type="button"
              className="btn btn-secondary home-gallery-nav"
              onClick={() => canGoPrev && goTo(activeIndex - 1)}
              disabled={!canGoPrev}
              aria-label="Imagen anterior"
            >
              Anterior
            </button>
            <button
              type="button"
              className="btn btn-secondary home-gallery-nav"
              onClick={() => canGoNext && goTo(activeIndex + 1)}
              disabled={!canGoNext}
              aria-label="Imagen siguiente"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

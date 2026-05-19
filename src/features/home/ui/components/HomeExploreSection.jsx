import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { EXPLORE_ITEMS } from '../../domain/constants'

function IconArrowUpRight() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

export default function HomeExploreSection() {
  return (
    <section className="section motion-rise motion-delay-1 home-collections">
      <div className="container section-shell">
        <div className="section-header-intro home-section-intro">
          <span className="section-kicker home-section-eyebrow">Explora L&apos;Artisan</span>
          <h2 className="h2 section-title home-section-title">Elige según cómo vas a comer, no solo qué vas a comprar</h2>
          <p className="p section-subtitle home-section-subtitle">
            Cada línea está pensada para un uso específico: parrilla, tabla o plancha.
          </p>
        </div>
        <div className="grid home-collections-grid">
          {EXPLORE_ITEMS.map((item) => (
            <Link
              key={item.href}
              className={`card home-collection-card ${item.href.includes('plant-based') ? 'is-plant-based' : ''}`}
              to={item.href}
              {...prefetchIntentProps('/productos')}
            >
              <div className="home-collection-media">
                <img
                  src={item.image}
                  alt={`${item.titulo} L'Artisan`}
                  loading="lazy"
                  decoding="async"
                  width="960"
                  height="640"
                />
                <div className="home-collection-overlay">
                  <span className="chip chip-glass home-collection-chip">{item.highlight}</span>
                </div>
              </div>
              <div className="home-collection-content">
                <span className="home-collection-eyebrow">{item.eyebrow}</span>
                <div className="home-collection-heading">
                  <h3 className="home-collection-title">{item.titulo}</h3>
                  <span className="home-collection-arrow" aria-hidden="true"><IconArrowUpRight /></span>
                </div>
                <p className="p home-collection-copy">{item.desc}</p>
                <div className="home-collection-footer">
                  <span className="home-collection-link">{item.cta}<IconArrowUpRight /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

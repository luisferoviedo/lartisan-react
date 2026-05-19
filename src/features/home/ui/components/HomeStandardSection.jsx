import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { HOME_AUTHORITY_ITEMS } from '../../domain/constants'

export default function HomeStandardSection() {
  const teaserItems = HOME_AUTHORITY_ITEMS.slice(0, 2)

  return (
    <section className="section home-standard">
      <div className="container">
        <div className="home-section-intro home-standard-intro">
          <span className="home-section-eyebrow">Confianza y respaldo</span>
          <h2 className="h2 home-section-title">Dos señales claras para confiar antes de pedir</h2>
          <p className="p home-section-subtitle">
            Dejamos aquí lo esencial. El detalle completo de proceso, respaldo y criterio de marca vive mejor en Nosotros.
          </p>
        </div>
        <div className="grid">
          {teaserItems.map((item) => (
            <article
              key={item.title}
              className={`card home-standard-card ${item.status === 'placeholder' ? 'is-placeholder' : ''}`}
            >
              <span className={`home-standard-card-label ${item.status === 'placeholder' ? 'is-placeholder' : ''}`}>
                {item.label}
              </span>
              <h3 className="home-standard-card-title">{item.title}</h3>
              <p className="p p-reset">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="home-standard-actions">
          <Link className="btn btn-outline" to="/nosotros" {...prefetchIntentProps('/nosotros')}>
            Ver proceso y respaldo
          </Link>
        </div>
      </div>
    </section>
  )
}

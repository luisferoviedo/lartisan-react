import { HOME_TRUST_INTRO, HOME_TRUST_ITEMS } from '../../domain/constants'

export default function HomeTrustSection() {
  return (
    <section className="home-trust motion-rise motion-delay-1" aria-label="Señales de confianza premium">
      <div className="container">
        <div className="home-section-intro home-trust-intro">
          <span className="home-section-eyebrow">Antes de confirmar</span>
          <h2 className="h2 home-section-title home-trust-title">{HOME_TRUST_INTRO.title}</h2>
          <p className="p home-section-subtitle home-trust-subtitle">{HOME_TRUST_INTRO.subtitle}</p>
        </div>
        <div className="home-trust-grid">
          {HOME_TRUST_ITEMS.map((item, index) => (
            <article key={item.title} className="home-trust-card">
              <span className="home-trust-card-index">0{index + 1}</span>
              <p className="home-trust-card-title">{item.title}</p>
              <p className="p p-reset home-trust-card-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

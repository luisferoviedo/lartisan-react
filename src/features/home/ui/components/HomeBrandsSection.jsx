import { HOME_BRAND_SLOTS } from '../../domain/constants'

export default function HomeBrandsSection() {
  return (
    <section className="section home-brands">
      <div className="container">
        <div className="home-section-intro">
          <span className="home-section-eyebrow">¿Cuándo te sirve L&apos;Artisan?</span>
          <h2 className="h2 home-section-title">Reconócete en la ocasión y empieza desde ahí</h2>
          <p className="p home-section-subtitle">
            Cada formato de compra tiene su momento. Encuentra el tuyo y elige con más criterio.
          </p>
        </div>

        <div className="home-brand-grid" aria-label="Formatos de compra y ocasiones atendidas">
          {HOME_BRAND_SLOTS.map((brand) => (
            <article key={brand.name} className="home-brand-slot">
              <div className="home-brand-mark" aria-hidden="true">{brand.name}</div>
              <p className="home-brand-caption">{brand.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

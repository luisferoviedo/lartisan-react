import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../utils/prefetchRoutes'
import { useRecetasViewModel } from '../application/useRecetasViewModel'
import RecetasGrid from './components/RecetasGrid'

function IconGrill() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h14" />
      <path d="M6 11h12" />
      <path d="M8 15h8" />
      <path d="M9 15v4" />
      <path d="M15 15v4" />
    </svg>
  )
}

function IconBoard() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h10a3 3 0 0 1 0 6H5z" />
      <path d="M5 12h12a2 2 0 0 1 0 4H5z" />
      <path d="M18 6v10" />
    </svg>
  )
}

function IconGuests() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M16.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M4.5 18a4 4 0 0 1 7 0" />
      <path d="M13.5 18a3.5 3.5 0 0 1 6 0" />
    </svg>
  )
}

function IconRepeat() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 7h3V4" />
      <path d="M20 7a7 7 0 0 0-12-2" />
      <path d="M7 17H4v3" />
      <path d="M4 17a7 7 0 0 0 12 2" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg className="icon-line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16v10H4z" />
      <path d="M12 10v10" />
      <path d="M3 10h18V7H3z" />
      <path d="M8.5 7c-1.3 0-2.5-.8-2.5-2s1-2 2.1-2C10 3 12 7 12 7" />
      <path d="M15.5 7c1.3 0 2.5-.8 2.5-2s-1-2-2.1-2C14 3 12 7 12 7" />
    </svg>
  )
}

const OCCASION_ICONS = {
  'Parrilla en casa': IconGrill,
  'Tabla para compartir': IconBoard,
  'Evento pequeño': IconGuests,
  'Pedido recurrente': IconRepeat,
  'Regalo gastronómico': IconGift,
}

export default function RecetasPageView() {
  const { recetas, highlights, occasionItems, loading, error } = useRecetasViewModel()

  return (
    <main id="main-content" tabIndex="-1" className="recipes-page">
      <section className="section recipes-hero">
        <div className="container section-shell">
          <div className="recipes-hero-shell">
            <span className="section-kicker home-section-eyebrow">Preparación guiada</span>
            <h1 className="h1 home-title-premium">Recetas & Tips</h1>
            <p className="p recipes-hero-copy">
              Formas simples de preparar mejor lo que compras, con resultados que se notan.
            </p>
            <div className="page-hero-points" aria-label="Atributos del contenido de recetas">
              {highlights.map((item) => (
                <span key={item} className="chip chip-soft">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section recipes-occasions">
        <div className="container section-shell">
          <div className="section-header-intro home-section-intro">
            <span className="section-kicker home-section-eyebrow">Ocasiones</span>
            <h2 className="h2 section-title home-section-title">Empieza según el momento</h2>
          </div>

          <div className="recipes-occasion-grid">
            {occasionItems.map((item, index) => (
              <article
                key={item.name}
                className={`card-base card-panel recipes-occasion-card card-interactive ${
                  index === 0 ? 'recipes-occasion-card--featured' : ''
                }`}
              >
                <div className="recipes-occasion-icon" aria-hidden="true">
                  {(() => {
                    const Icon = OCCASION_ICONS[item.name]
                    return Icon ? <Icon /> : null
                  })()}
                </div>
                <h3 className="recipes-occasion-title">{item.name}</h3>
                <p className="p p-reset recipes-occasion-copy">{item.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section recipes-content">
        <div className="container section-shell">
          <div className="section-header home-section-head">
            <div className="section-header-intro home-section-intro">
              <span className="section-kicker home-section-eyebrow">Recetas</span>
              <h2 className="h2 section-title home-section-title">Preparaciones que sí vas a repetir</h2>
              <p className="p section-subtitle home-section-subtitle">
                Cada receta está pensada para que entiendas rápido qué hacer, cómo hacerlo y qué usar.
              </p>
            </div>
            <Link className="btn btn-secondary" to="/productos" {...prefetchIntentProps('/productos')}>
              Ver catálogo
            </Link>
          </div>
          {error && <p className="p">{error}</p>}
          <RecetasGrid recetas={recetas} loading={loading} />
        </div>
      </section>
    </main>
  )
}

import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../utils/prefetchRoutes'
import { useRecetasViewModel } from '../application/useRecetasViewModel'
import RecetasGrid from './components/RecetasGrid'

export default function RecetasPageView() {
  const { recetas, highlights, loading, error } = useRecetasViewModel()

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

import { Link } from "react-router-dom";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";
import { prefetchIntentProps } from "../../../../utils/prefetchRoutes";
import { CATEGORY_COVERS } from "../../../productos/domain/constants";

export default function HomeFeaturedSection({ loading, error, destacados }) {
  const ref = useScrollReveal();
  return (
    <section
      className="section home-featured reveal-on-scroll"
      ref={ref}
    >
      <div className="container section-shell">
        <div className="section-header home-section-head">
          <div className="section-header-intro home-section-intro">
            <span className="section-kicker home-section-eyebrow">Selección con criterio</span>
            <h2 className="h2 section-title home-section-title">Selección de la Casa</h2>
            <p className="p section-subtitle home-section-subtitle">
              Productos elegidos para comparar sabor, uso y nivel de intensidad.
            </p>
          </div>
          <Link
            className="btn btn-secondary"
            to="/productos"
            {...prefetchIntentProps("/productos")}
          >
            Ver catálogo completo
          </Link>
        </div>

        {error && <p className="p">{error}</p>}

        <div className="grid home-featured-grid">
          {loading && destacados.length === 0 && (
            <article className="card">
              <p className="p p-reset">
                Cargando destacados...
              </p>
            </article>
          )}

          {destacados.map((p) => (
            <article key={p.slugGlobal} className="card home-feature-card">
              <div className="home-feature-media">
                <img
                  className="home-feature-image"
                  src={p.imagen || CATEGORY_COVERS[p.categoriaSlug] || "/covers/charcuteria-fina.webp"}
                  alt={`${p.nombre} L'Artisan`}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                />
                <div className="home-feature-overlay">
                  <small className="chip chip-soft home-feature-tag">{p._cat}</small>
                </div>
              </div>

              <div className="home-feature-body">
                <h3 className="home-feature-title">{p.nombre}</h3>
                {Array.isArray(p.usos) && p.usos.length > 0 && (
                  <div className="home-feature-uses" aria-label={`Usos recomendados de ${p.nombre}`}>
                    {p.usos.slice(0, 2).map((use) => (
                      <span key={use} className="chip chip-glass">{use}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="home-feature-footer">
                <span className="home-feature-price">
                  {typeof p.precio === "number"
                    ? `Desde $ ${p.precio.toLocaleString("es-CO")}`
                    : "Precio por confirmar"}
                </span>
                <Link
                  className="btn btn-secondary"
                  to={`/productos/${p.slugGlobal}`}
                  {...prefetchIntentProps("/productos/:slug")}
                >
                  Ver ficha
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

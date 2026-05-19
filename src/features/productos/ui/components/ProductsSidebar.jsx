import { wa } from '../../../../utils/waLink'
import { buildCatalogWhatsAppMessage } from '../../application/whatsappBuilders'

function SearchField({ id, query, setQuery, showHint }) {
  return (
    <div className="sidebar-box">
      <label className="sidebar-label" htmlFor={id}>Buscar</label>
      <input
        id={id}
        className="sidebar-input"
        type="search"
        placeholder="Ej: Argentino, Bondiola…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showHint && <p className="sidebar-hint">Filtra por línea, producto o categoría.</p>}
    </div>
  )
}

function CategoryLinks({ categories }) {
  return (
    <ul className="side-list">
      {categories.map((cat) => (
        <li key={cat.slug}>
          <a className="side-link" href={`#${cat.slug}`}>{cat.titulo}</a>
          {Array.isArray(cat.secciones) && (
            <ul className="side-sublist">
              {cat.secciones.map((sec) => (
                <li key={sec.slug}>
                  <a className="side-link side-link-sub" href={`#${cat.slug}-${sec.slug}`}>{sec.titulo}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ProductsSidebar({ query, setQuery, catalogo, error }) {
  const categories = Array.isArray(catalogo) ? catalogo : []

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <SearchField id="q" query={query} setQuery={setQuery} showHint />

        <nav className="sidebar-box">
          <p className="sidebar-label">Categorías</p>
          {error && <p className="sidebar-hint">{error}</p>}
          <CategoryLinks categories={categories} />
          <div style={{ marginTop: 14 }}>
            <a className="btn btn-primary" href={wa(buildCatalogWhatsAppMessage())} target="_blank" rel="noopener noreferrer">
              Solicitar por WhatsApp
            </a>
          </div>
        </nav>
      </div>

      <details className="sidebar-mobile">
        <summary>Explorar selección</summary>
        <div className="sidebar-inner sidebar-inner--mobile" style={{ paddingTop: 12 }}>
          <SearchField id="q2" query={query} setQuery={setQuery} showHint={false} />

          <nav className="sidebar-box">
            <p className="sidebar-label">Categorías</p>
            <CategoryLinks categories={categories} />
          </nav>
        </div>
      </details>
    </aside>
  )
}

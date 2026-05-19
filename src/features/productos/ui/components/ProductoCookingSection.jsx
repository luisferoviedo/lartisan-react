import { cookMetaFallback } from '../../domain/selectors'

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
)

const FireIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M12 3c2 3 2 5 0 7-2-2-3-4 0-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M7 13c0 4 3 8 5 8s5-4 5-8c0-2-1-3-2-4-1 2-2 3-3 3s-2-1-3-3c-1 1-2 2-2 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
)

const QualityIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
    <path
      d="M12 4.5l2.3 4.66 5.14.75-3.72 3.62.88 5.12L12 16.2l-4.6 2.45.88-5.12-3.72-3.62 5.14-.75L12 4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ProductoCookingSection({ coccion }) {
  return (
    <div className="card">
      <h2 className="h2 h2-tight">Cómo cocinar</h2>
      <div className="pd-cook-grid">
        {coccion.map((c, i) => {
          const baseMeta = cookMetaFallback(c.titulo)
          const meta = {
            ...baseMeta,
            ...(c.meta ?? {}),
            tiempo: c.tiempo ?? baseMeta.tiempo,
            fuego: c.fuego ?? baseMeta.fuego,
            nivel: c.nivel ?? baseMeta.nivel,
          }

          return (
            <div key={i} className="pd-cook-card">
              <div className="pd-cook-title">{c.titulo}</div>
              <div className="pd-cook-meta">
                <span className="pd-meta"><ClockIcon /> {meta.tiempo}</span>
                <span className="pd-meta"><FireIcon /> {meta.fuego}</span>
                <span className="pd-meta"><QualityIcon /> {meta.nivel}</span>
              </div>
              <div className="p p-reset">{c.texto}</div>
              {c.tip && <div className="pd-tip"><strong>Tip:</strong> {c.tip}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

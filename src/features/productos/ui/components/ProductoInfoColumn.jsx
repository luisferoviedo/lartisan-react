export default function ProductoInfoColumn({ producto, usos, maridaje, conservacion }) {
  return (
    <div className="pd-sidecol">
      <div className="card pd-info-card">
        <span className="pd-eyebrow">Composición</span>
        <h2 className="h2 h2-tight">Ingredientes</h2>
        {(producto.ingredientes || []).length
          ? <ul className="pd-ingredients-list">{(producto.ingredientes || []).map((ing, idx) => <li key={idx}>{ing}</li>)}</ul>
          : <p className="p p-reset">(Pendiente) Agrega ingredientes para mostrar al cliente.</p>
        }
      </div>

      <div className="card pd-info-card">
        <span className="pd-eyebrow">Servicio</span>
        <h3 className="h2 pd-h3-card">Ideal para servir</h3>
        <div className="pd-chips">{usos.map((u, i) => <span key={i} className="pd-chip">{u}</span>)}</div>
        {maridaje && (
          <div className="pd-serving-note">
            <strong>Maridaje sugerido:</strong> {maridaje}
          </div>
        )}
      </div>

      <div className="card pd-info-card">
        <span className="pd-eyebrow">Cadena de frío</span>
        <h3 className="h2 pd-h3-card">Conservación</h3>
        <ul className="pd-bullets">{conservacion.map((text, i) => <li key={i}>{text}</li>)}</ul>
      </div>
    </div>
  )
}

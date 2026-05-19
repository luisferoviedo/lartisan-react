import { wa } from '../../../utils/waLink'
import { useContactoViewModel } from '../application/useContactoViewModel'

const CONTACT_HIGHLIGHTS = [
  'Pedidos y disponibilidad',
  'Entrega coordinada',
  'Respuesta por WhatsApp',
]

const CONTACT_CHECKLIST = [
  'Producto o línea que te interesa',
  'Cantidad aproximada',
  'Fecha y franja de entrega',
  'Dirección o zona',
]

export default function ContactoPageView() {
  const { instagramUrl, orderMessage, purchaseSteps, whatsappTemplate } = useContactoViewModel()

  return (
    <main id="main-content" tabIndex="-1" className="contact-page">
      <section className="section contact-hero">
        <div className="container section-shell">
          <div className="page-hero-shell">
            <div className="page-hero-copy">
              <span className="section-kicker home-section-eyebrow">Atención directa</span>
              <h1 className="h1 home-title-premium">Contacto</h1>
              <p className="p contact-hero-copy">
                Atención por WhatsApp para pedidos, disponibilidad y coordinación
                de entrega sin vueltas innecesarias.
              </p>
              <div className="page-hero-points" aria-label="Beneficios del canal de contacto">
                {CONTACT_HIGHLIGHTS.map((item) => (
                  <span key={item} className="chip chip-soft">{item}</span>
                ))}
              </div>
              <div className="btn-group contact-hero-actions">
                <a className="btn btn-primary" href={wa(orderMessage)} target="_blank" rel="noopener noreferrer">
                  Solicitar por WhatsApp
                </a>
                <a className="btn btn-secondary" href={instagramUrl} target="_blank" rel="noopener noreferrer">Ver Instagram</a>
              </div>
            </div>

            <article className="page-support-card page-hero-sidecard card-base card-panel">
              <span className="page-support-kicker">Antes de escribirnos</span>
              <h2 className="page-support-title">Qué ayuda a responderte más rápido</h2>
              <ul className="page-checklist" aria-label="Información sugerida para agilizar la atención">
                {CONTACT_CHECKLIST.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section contact-flow">
        <div className="container section-shell">
          <div className="section-header-intro home-section-intro">
            <span className="section-kicker home-section-eyebrow">Compra sin fricción</span>
            <h2 className="h2 section-title home-section-title">Aquí aterrizamos cómo pedir, confirmar y coordinar</h2>
            <p className="p section-subtitle home-section-subtitle">
              Este bloque salió del home para que la parte operativa viva donde realmente se resuelve: contacto, disponibilidad, entrega y siguientes pasos.
            </p>
          </div>

          <div className="grid home-purchase-grid">
            {purchaseSteps.map((step, idx) => (
              <article key={step.title} className="card home-step-card">
                <span className="home-step-index">0{idx + 1}</span>
                <h3 className="home-step-title">{step.title}</h3>
                <p className="p p-reset">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-content">
        <div className="container section-shell">
          <div className="section-header-intro home-section-intro">
            <span className="section-kicker home-section-eyebrow">Formato recomendado</span>
            <h2 className="h2 section-title home-section-title">Para pedir más rápido</h2>
            <p className="p section-subtitle home-section-subtitle">
              Si compartes estos datos completos, confirmamos disponibilidad y tiempos
              con mayor rapidez.
            </p>
          </div>

            <div className="page-support-grid">
            <div className="card-base card-panel contact-template-card">
              <p className="p contact-template-label">Copia y pega este formato en WhatsApp:</p>
              <pre className="contact-template-pre">
                {whatsappTemplate}
              </pre>
            </div>

            <article className="page-support-card card-base card-panel">
              <span className="page-support-kicker">Compra guiada</span>
              <h3 className="page-support-title">Lo que resolvemos en una sola conversación</h3>
              <ul className="page-checklist" aria-label="Aspectos que se coordinan por WhatsApp">
                <li>Producto recomendado según la ocasión o tipo de servicio.</li>
                <li>Disponibilidad real y cantidades sugeridas.</li>
                <li>Coordinación de entrega y siguientes pasos.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

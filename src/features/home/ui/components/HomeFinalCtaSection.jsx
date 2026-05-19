import { useScrollReveal } from "../../../../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { wa } from "../../../../utils/waLink";
import { prefetchIntentProps } from "../../../../utils/prefetchRoutes";
import { buildHomeOrderMessage } from "../../application/whatsappBuilders";
import { HOME_FINAL_CTA_POINTS } from "../../domain/constants";

export default function HomeFinalCtaSection() {
  const ref = useScrollReveal();
  return (
    <section className="section home-final-cta reveal-on-scroll" ref={ref}>
      <div className="container section-shell">
        <div className="home-final-cta-card">
          <div className="home-final-cta-copy">
            <span className="section-kicker home-section-eyebrow">Siguiente paso</span>
            <h2 className="h2 section-title home-section-title">
              Elige mejor, no más rápido
            </h2>
            <p className="p section-subtitle home-section-subtitle">
              Te ayudamos a definir cantidades, productos y ocasión en una sola conversación.
            </p>
          </div>

          <div className="home-final-cta-actions">
            <div
              className="home-final-cta-points"
              aria-label="Beneficios del contacto por WhatsApp"
            >
              {HOME_FINAL_CTA_POINTS.map((point) => (
                <span key={point} className="chip chip-glass">{point}</span>
              ))}
            </div>
            <a
              className="btn btn-primary"
              href={wa(buildHomeOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp
            </a>
            <Link
              className="btn btn-secondary"
              to="/contacto"
              {...prefetchIntentProps("/contacto")}
            >
              Ver contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

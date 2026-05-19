import { Link } from "react-router-dom";
import { prefetchIntentProps } from "../../../../utils/prefetchRoutes";
import { wa } from "../../../../utils/waLink";
import { buildHomeOrderMessage } from "../../application/whatsappBuilders";
import {
  HERO_BADGES,
  HERO_EDITORIAL_POINTS,
  HERO_HIGHLIGHTS,
} from "../../domain/constants";

export default function HomeHeroSection() {
  return (
    <section className="section motion-rise home-hero">
      <div className="container">
        <div className="home-hero-inner">
          <div className="home-hero-copyblock">
            <span className="home-hero-kicker">L&apos;Artisan · Medellín</span>
            <h1 className="h1 home-title-premium">
              Charcutería hecha con carne real, no con rellenos.
            </h1>
            {HERO_HIGHLIGHTS.map((paragraph) => (
              <p key={paragraph} className="p home-hero-copy">
                {paragraph}
              </p>
            ))}
            <ul
              className="home-hero-points"
              aria-label="Diferenciales del hero"
            >
              {HERO_EDITORIAL_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="btn-group home-hero-actions">
              <a
                className="btn btn-primary"
                href={wa(buildHomeOrderMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir con asesoría
              </a>
              <Link
                className="btn btn-secondary"
                to="/productos"
                {...prefetchIntentProps("/productos")}
              >
                Explorar catálogo
              </Link>
            </div>
            <div
              className="home-hero-trustbar"
              aria-label="Atributos principales de la experiencia"
            >
              {HERO_BADGES.map((badge) => (
                <span key={badge} className="chip chip-soft home-hero-trustitem">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <article
            className="home-hero-showcase home-hero-editorial glass-warm-strong"
            aria-label="Vista destacada de la experiencia premium"
          >
            <div className="home-hero-showcase-chip">3 generaciones de técnica charcutera</div>
            <div className="home-hero-showcase-media">
              <img
                src="/covers/charcuteria-fina.webp"
                alt="Selección premium L'Artisan servida con presentación cuidada"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1200"
                height="900"
              />
            </div>
            <div className="home-hero-showcase-body">
              <h2 className="home-hero-showcase-title">
                Sabor real, sin atajos
              </h2>
              <p className="p home-hero-showcase-copy">
                Conservado para mantener textura, sabor y calidad desde el origen hasta tu mesa.
              </p>
            </div>
            <div
              className="home-hero-showcase-rail"
              aria-label="Usos destacados"
            >
              <span className="chip chip-glass">Parrillas</span>
              <span className="chip chip-glass">Tablas</span>
              <span className="chip chip-glass">Regalos</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

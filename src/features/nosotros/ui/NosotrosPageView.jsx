import { useScrollReveal } from "../../../hooks/useScrollReveal";
import HomeGallerySection from "../../home/ui/components/HomeGallerySection";
import { useNosotrosViewModel } from "../application/useNosotrosViewModel";

function IconSelect() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconProcess() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStandard() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BRAND_PILLARS = [
  {
    icon: <IconSelect />,
    title: "Selección técnica",
    body: "Materia prima elegida con criterio para sostener calidad y perfil sensorial.",
  },
  {
    icon: <IconProcess />,
    title: "Proceso controlado",
    body: "Tiempos, formulación y ejecución pensados para dar consistencia real.",
  },
  {
    icon: <IconStandard />,
    title: "Estándar sensorial",
    body: "Sabor, textura y presencia que deben responder igual cada vez.",
  },
];

export default function NosotrosPageView() {
  const {
    experienceIntro,
    experienceItems,
    promiseItems,
    supportItems,
    faqItems,
    galleryItems,
  } = useNosotrosViewModel();
  const heroRef = useScrollReveal();
  const experienceRef = useScrollReveal();
  const pillarsRef = useScrollReveal();
  const supportRef = useScrollReveal();
  const promiseRef = useScrollReveal();
  const faqRef = useScrollReveal();

  return (
    <main id="main-content" tabIndex="-1" className="about-page">
      <section className="section about-hero-gradient">
        <div
          className="container section-shell reveal-on-scroll about-hero-shell"
          ref={heroRef}
        >
          <span className="section-kicker home-section-eyebrow">
            L&apos;Artisan · Medellín
          </span>
          <h1 className="h1 home-title-premium about-hero-h1">
            El oficio de hacer bien la charcutería
          </h1>
          <p className="p about-hero-copy">
            L&apos;Artisan une ingeniería de alimentos y oficio charcutero para
            crear producto con mejor sabor, mejor textura y mejor presencia al
            servir.
          </p>
          <p className="p about-hero-copy">
            Hecho en Medellín con criterio técnico y una lectura clara de marca.
          </p>
        </div>
      </section>

      <section className="section about-experience">
        <div className="container section-shell">
          <div
            className="section-header-intro home-section-intro about-editorial-intro reveal-on-scroll"
            ref={experienceRef}
          >
            <span className="section-kicker home-section-eyebrow">
              Origen y criterio
            </span>
            <h2 className="h2 section-title home-section-title">
              {experienceIntro.title}
            </h2>
            <p className="p section-subtitle home-section-subtitle">
              {experienceIntro.subtitle}
            </p>
          </div>
          <div className="about-compact-grid about-experience-grid">
            {experienceItems.map((item, index) => (
              <article
                key={item.titulo}
                className="card-base about-compact-card"
              >
                <span className="about-compact-index">0{index + 1}</span>
                <p className="about-compact-title">{item.titulo}</p>
                <p className="p p-reset about-compact-copy">{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-pillars-section">
        <div className="container section-shell">
          <div
            className="section-header-intro home-section-intro about-editorial-intro reveal-on-scroll"
            ref={pillarsRef}
          >
            <span className="section-kicker home-section-eyebrow">
              Cómo trabajamos
            </span>
            <h2 className="h2 section-title home-section-title">
              Tres pilares, un resultado
            </h2>
          </div>
          <div className="about-pillar-grid">
            {BRAND_PILLARS.map((pillar, i) => (
              <article
                key={pillar.title}
                className={`card-base card-panel about-pillar-card reveal-on-scroll reveal-delay-${i}`}
              >
                <div className="about-pillar-icon">{pillar.icon}</div>
                <h3 className="about-pillar-title">{pillar.title}</h3>
                <p className="p about-pillar-body">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-support-section">
        <div
          className="container section-shell reveal-on-scroll"
          ref={supportRef}
        >
          <div className="section-header-intro home-section-intro about-editorial-intro about-support-intro">
            <span className="section-kicker home-section-eyebrow">
              Respaldo
            </span>
            <h2 className="h2 section-title home-section-title">
              Lo que sostiene la experiencia
            </h2>
          </div>
          <div className="about-compact-grid about-support-grid">
            {supportItems.map((item, index) => (
              <article
                key={item.titulo}
                className="card-base about-compact-card about-support-card"
              >
                <span className="about-compact-index">0{index + 1}</span>
                <p className="about-compact-title">{item.titulo}</p>
                <p className="p p-reset about-compact-copy">{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-content about-content-section">
        <div className="container section-shell">
          <div className="reveal-on-scroll" ref={promiseRef}>
            <div className="section-header-intro home-section-intro about-editorial-intro about-section-intro">
              <span className="section-kicker home-section-eyebrow">
                Nuestra promesa
              </span>
              <h2 className="h2 section-title home-section-title">
                Lo que la marca debe sostener siempre
              </h2>
            </div>
            <div className="about-bullet-grid">
              {promiseItems.map((item) => (
                <article
                  key={item.titulo}
                  className="card-base about-bullet-item"
                >
                  <strong>{item.titulo}</strong>
                  <span>{item.texto}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-faq">
        <div className="container section-shell reveal-on-scroll" ref={faqRef}>
          <div className="section-header-intro home-section-intro about-editorial-intro about-section-intro about-section-intro--tight">
            <span className="section-kicker home-section-eyebrow">
              Preguntas clave
            </span>
            <h2 className="h2 section-title home-section-title">
              Lo esencial para decidir y servir mejor
            </h2>
          </div>
          <div className="grid about-faq-grid">
            {faqItems.map((item) => (
              <div key={item.pregunta} className="card-base about-card">
                <strong>{item.pregunta}</strong>
                <p className="p">{item.respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeGallerySection
        eyebrow="Acabado, textura y servicio"
        title="Así se ve el estándar L'Artisan"
        subtitle="Acabado, textura y presentación en contexto real."
        items={galleryItems}
        centered
        showGuide={false}
      />
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { INSTAGRAM_URL } from "../features/home/domain/constants";
import { useJsonLd } from "../hooks/useJsonLd";
import { prefetchIntentProps } from "../utils/prefetchRoutes";
import { getSiteUrl } from "../utils/siteUrl";
import { wa } from "../utils/waLink";

export default function Layout() {
  const siteUrl = getSiteUrl();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const brandSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "L'Artisan",
          url: siteUrl,
          logo: `${siteUrl}/brand/logo.webp`,
          sameAs: ["https://www.instagram.com/alimentoslartisan/"],
        },
        {
          "@type": "WebSite",
          name: "L'Artisan",
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/productos?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    }),
    [siteUrl],
  );

  useJsonLd("ld-org-website", brandSchema);

  return (
    <>
      {/* Accesibilidad: salto rápido al contenido principal */}
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <header className="header-glass">
        <div className="container site-header">
          <Link className="site-brand" to="/" onClick={closeMenu}>
            <img
              className="site-brand-logo"
              src="/brand/logo.webp"
              alt="L'Artisan"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="136"
              height="34"
            />
            <span className="site-brand-text">L'Artisan</span>
          </Link>

          <button
            className={`nav-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          {menuOpen && (
            <div
              className="nav-backdrop"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          <nav
            className={`site-nav${menuOpen ? " is-open" : ""}`}
            aria-label="Navegación principal"
          >
            <NavLink
              to="/productos"
              className="nav-link"
              onClick={closeMenu}
              {...prefetchIntentProps("/productos")}
            >
              Productos
            </NavLink>
            <NavLink
              to="/recetas"
              className="nav-link"
              onClick={closeMenu}
              {...prefetchIntentProps("/recetas")}
            >
              Recetas & Tips
            </NavLink>
            <NavLink
              to="/nosotros"
              className="nav-link"
              onClick={closeMenu}
              {...prefetchIntentProps("/nosotros")}
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className="nav-link"
              onClick={closeMenu}
              {...prefetchIntentProps("/contacto")}
            >
              Contacto
            </NavLink>
            <a
              className="btn btn-primary site-nav-cta"
              href={wa("Hola L'Artisan, quiero hacer un pedido")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="container site-footer-grid">
          <div className="site-footer-brand">
            <small className="site-footer-copy">
              © {new Date().getFullYear()} L&apos;Artisan · Medellín
            </small>
            <p className="site-footer-tagline">
              Charcutería hecha con carne real, sin rellenos innecesarios, con
              procesos controlados y selección guiada para una compra con
              criterio.
            </p>
          </div>
          <div className="site-footer-nav">
            <Link
              className="site-footer-link"
              to="/productos"
              {...prefetchIntentProps("/productos")}
            >
              Productos
            </Link>
            <Link
              className="site-footer-link"
              to="/recetas"
              {...prefetchIntentProps("/recetas")}
            >
              Recetas & Tips
            </Link>
            <Link
              className="site-footer-link"
              to="/nosotros"
              {...prefetchIntentProps("/nosotros")}
            >
              Nosotros
            </Link>
            <Link
              className="site-footer-link"
              to="/contacto"
              {...prefetchIntentProps("/contacto")}
            >
              Contacto
            </Link>
          </div>
          <div className="site-footer-actions">
            <a
              className="site-footer-link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="site-footer-cta"
              href={wa("Hola L'Artisan, quiero hacer un pedido")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

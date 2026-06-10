"use client";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import { useArtworks } from "@/hooks/useArtworks";

export default function Home() {
  const { artworks: featuredArtworks, loading } = useArtworks();

  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* MARQUEE STRIP */}
      <Marquee speed={35}>
        Experiencia Inmersiva &nbsp;&middot;&nbsp; Arte Contemporaneo &nbsp;&middot;&nbsp; Realidad Aumentada &nbsp;&middot;&nbsp; Panama City &nbsp;&middot;&nbsp; Coleccion Exclusiva &nbsp;&middot;&nbsp; WebAR &nbsp;&middot;&nbsp;
      </Marquee>

      {/* HORIZONTAL SCROLL GALLERY */}
      <section className="hscroll-section" id="featured">
        <div className="hscroll-header">
          <div className="hscroll-header-text">
            <span className="section-label">Coleccion Destacada</span>
            <h2 className="section-title">Obras Seleccionadas</h2>
          </div>
          <Link href="/galeria" className="btn btn-outline" id="featured-view-all">
            Ver toda la coleccion
          </Link>
        </div>

        <div className="hscroll-track">
          {featuredArtworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/obra/${artwork.id}`}
              className="hscroll-item"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="hscroll-item-index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="hscroll-item-image">
                <img src={artwork.image} alt={artwork.title} loading="lazy" />
                {artwork.sold && (
                  <div className="badge-vendido">VENDIDO</div>
                )}
              </div>
              <div className="hscroll-item-info">
                <h3 className="hscroll-item-title">{artwork.title}</h3>
                <p className="hscroll-item-artist">{artwork.artist}</p>
                <div className="hscroll-item-meta">
                  <span className="hscroll-item-price">
                    ${artwork.price?.toLocaleString("en-US")}
                  </span>
                  <span className="hscroll-item-dims">
                    {artwork.width_cm} x {artwork.height_cm} cm
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL STATEMENT: AR Experience */}
      <section className="editorial-section" id="como-funciona">
        <div className="editorial-grid">
          <div className="editorial-image reveal">
            <img src="/IMG_7640.JPG" alt="Bosque Encantado" loading="lazy" />
          </div>
          <div className="editorial-text reveal">
            <span className="editorial-number">Experiencia AR</span>
            <h2 className="editorial-headline">
              El arte en tu pared,<br />antes de comprarlo
            </h2>
            <p className="editorial-body">
              Usa tu celular para visualizar cualquier obra en tamano real
              directamente en tu espacio. Sin apps, sin complicaciones. Solo
              apunta y descubre.
            </p>

            <div className="editorial-steps">
              <div className="editorial-step">
                <span className="editorial-step-num">01</span>
                <div className="editorial-step-text">
                  <h4>Explora</h4>
                  <p>Navega nuestra coleccion y encuentra la obra que conecte contigo.</p>
                </div>
              </div>
              <div className="editorial-step">
                <span className="editorial-step-num">02</span>
                <div className="editorial-step-text">
                  <h4>Visualiza en AR</h4>
                  <p>Toca &quot;Ver en tu espacio&quot; y apunta tu camara a la pared.</p>
                </div>
              </div>
              <div className="editorial-step">
                <span className="editorial-step-num">03</span>
                <div className="editorial-step-text">
                  <h4>Adquiere</h4>
                  <p>Contactanos y haz tuya esa pieza que transformara tu espacio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL CTA */}
      <section className="cta-minimal" id="cta-final">
        <div className="container">
          <span className="cta-minimal-label">
            Listo para transformar tu espacio?
          </span>
          <h2 className="cta-minimal-title">
            Descubre tu proxima obra maestra
          </h2>
          <Link href="/galeria" className="btn btn-primary" id="cta-final-btn">
            Explorar Galeria
          </Link>
        </div>
      </section>
    </>
  );
}

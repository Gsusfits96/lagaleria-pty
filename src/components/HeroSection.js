"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SparklesCore from "@/components/SparklesCore";

const heroImages = [
  "/IMG_7641.JPG",
  "/IMG_7635.JPG",
  "/IMG_7647.JPG",
  "/IMG_7633.JPG",
  "/IMG_7636.JPG",
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Auto-rotate featured image */
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-immersive" id="hero">
      {/* Sparkles particle background */}
      <div className="hero-sparkles-wrap">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={80}
          className="hero-sparkles"
          particleColor="#c0c0c0"
          speed={1.5}
        />
      </div>

      {/* Featured artwork slideshow */}
      <div className={`hero-artwork-frame ${loaded ? "hero-artwork-frame--visible" : ""}`}>
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero-artwork-slide ${i === active ? "hero-artwork-slide--active" : ""}`}
            draggable="false"
          />
        ))}
        <div className="hero-artwork-caption">
          <span className="hero-artwork-dot" />
          En exhibicion
        </div>
      </div>

      {/* Central typography */}
      <div className={`hero-center ${loaded ? "hero-center--visible" : ""}`}>
        <span className="hero-eyebrow">Galeria de Arte &middot; Panama</span>
        <h1 className="hero-mega-title">
          La<br />Galeria
        </h1>
        <div className="hero-title-accent">PTY</div>
        <p className="hero-tagline">
          Obras unicas. Visualizalas en tu espacio con Realidad Aumentada.
        </p>
        <div className="hero-actions">
          <Link href="/galeria" className="btn btn-primary" id="hero-cta-explore">
            Explorar Coleccion
          </Link>
          <Link href="/#como-funciona" className="btn btn-outline" id="hero-cta-how">
            Como funciona
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero-scroll-hint ${loaded ? "hero-scroll-hint--visible" : ""}`}>
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

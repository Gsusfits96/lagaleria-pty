"use client";
import Link from "next/link";
import { useArtworks } from "@/hooks/useArtworks";

export default function Galeria() {
  const { artworks, loading } = useArtworks();
  return (
    <div className="page-container">
      <header className="page-header">
        <span className="page-eyebrow">Colección Completa</span>
        <h1 className="page-title">Catálogo</h1>
      </header>

      <div className="gallery-grid">
        {artworks.map((artwork) => (
          <Link
            href={`/obra/${artwork.id}`}
            key={artwork.id}
            className="gallery-item"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="gallery-item-image">
              <img src={artwork.image} alt={artwork.title} loading="lazy" />
              {artwork.sold && <div className="badge-vendido">VENDIDO</div>}
            </div>
            <div className="gallery-item-info">
              <h3 className="gallery-item-title">{artwork.title}</h3>
              <p className="gallery-item-artist">{artwork.artist}</p>
              <div className="gallery-item-meta">
                <span className="gallery-item-price">
                  ${artwork.price?.toLocaleString("en-US")}
                </span>
                <span className="gallery-item-dims">
                  {artwork.width_cm} x {artwork.height_cm} cm
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

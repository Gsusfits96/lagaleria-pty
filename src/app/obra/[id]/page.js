"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useArtwork } from "@/hooks/useArtworks";
import { use } from "react";

import ModelViewerWrapper from "@/components/ModelViewerWrapper";

export default function ObraDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { artwork, loading } = useArtwork(id);

  if (loading) {
    return <div className="page-container"><p>Cargando...</p></div>;
  }

  if (!artwork) {
    notFound();
  }

  return (
    <div className="page-container">
      <Link href="/galeria" className="btn btn-outline" style={{ marginBottom: "var(--space-2xl)", display: "inline-block" }}>
        ← Volver a la Galería
      </Link>
      
      <div className="obra-detail-grid">
        <div className="obra-detail-media">
          <div className="obra-detail-image-wrapper">
             <img src={artwork.image} alt={artwork.title} style={{ opacity: artwork.glb_url ? 0 : 1, width: "100%", height: "auto", display: "block" }} />
             {artwork.glb_url && (
               <ModelViewerWrapper src={artwork.glb_url} alt={artwork.title} poster={artwork.image} />
             )}
             {artwork.sold && <div className="badge-vendido">VENDIDO</div>}
          </div>
        </div>
        
        <div className="obra-detail-info">
          <h1 className="obra-title">{artwork.title}</h1>
          <p className="obra-artist">{artwork.artist}</p>
          
          <div className="obra-price">
            ${artwork.price?.toLocaleString("en-US")}
          </div>

          <div className="obra-meta-list">
            <div className="obra-meta-item">
              <span className="obra-meta-label">Técnica</span>
              <span className="obra-meta-value">{artwork.technique}</span>
            </div>
            <div className="obra-meta-item">
              <span className="obra-meta-label">Dimensiones</span>
              <span className="obra-meta-value">{artwork.width_cm} x {artwork.height_cm} cm</span>
            </div>
          </div>

          {artwork.description && (
            <div className="obra-description">
              <p>{artwork.description}</p>
            </div>
          )}

          <div className="obra-actions">
            <button className="btn btn-primary" disabled={artwork.sold}>
              {artwork.sold ? "Obra Vendida" : "Consultar Disponibilidad"}
            </button>
            {artwork.hasAR && (
              <button className="btn btn-outline">
                Ver en AR (Próximamente)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

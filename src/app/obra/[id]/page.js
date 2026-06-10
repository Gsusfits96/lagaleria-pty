"use client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useArtwork } from "@/hooks/useArtworks";
import { use, useState } from "react";
import { convertImageToGLB } from "@/lib/three-converter";
import ModelViewerWrapper from "@/components/ModelViewerWrapper";

export default function ObraDetail({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { artwork, loading } = useArtwork(id);
  const [localGlbUrl, setLocalGlbUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (loading) {
    return <div className="page-container"><p>Cargando...</p></div>;
  }

  if (!artwork) {
    notFound();
  }

  const activeGlbUrl = localGlbUrl || artwork.glb_url;

  const handleGenerateAR = async () => {
    if (activeGlbUrl) {
      // If already generated, we could optionally trigger the AR button click directly
      return;
    }
    
    try {
      setIsGenerating(true);
      // Generate the GLB on the fly using the dimensions
      const blob = await convertImageToGLB(artwork.image, artwork.width_cm, artwork.height_cm);
      const url = URL.createObjectURL(blob);
      setLocalGlbUrl(url);
    } catch (error) {
      console.error("Failed to generate 3D model", error);
      alert("Hubo un error generando el modelo 3D para AR.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="page-container">
      <Link href="/galeria" className="btn btn-outline" style={{ marginBottom: "var(--space-2xl)", display: "inline-block" }}>
        ← Volver a la Galería
      </Link>
      
      <div className="obra-detail-grid">
        <div className="obra-detail-media">
          <div className="obra-detail-image-wrapper">
             <img src={artwork.image} alt={artwork.title} style={{ opacity: activeGlbUrl ? 0 : 1, width: "100%", height: "auto", display: "block" }} />
             {activeGlbUrl && (
               <ModelViewerWrapper src={activeGlbUrl} alt={artwork.title} poster={artwork.image} />
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
            {artwork.sold ? (
              <button className="btn btn-primary" disabled>
                Obra Vendida
              </button>
            ) : (
              <a 
                href={`https://wa.me/50700000000?text=${encodeURIComponent(`Hola La Galería PTY, estoy interesado en adquirir la obra '${artwork.title}' (${artwork.width_cm}x${artwork.height_cm} cm). ¿Podrían confirmarme si sigue disponible?`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                Consultar Disponibilidad
              </a>
            )}
            {artwork.hasAR && !activeGlbUrl && (
              <button className="btn btn-outline" onClick={handleGenerateAR} disabled={isGenerating}>
                {isGenerating ? "Generando 3D..." : "Cargar Vista AR"}
              </button>
            )}
            {activeGlbUrl && (
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", marginTop: "1rem" }}>
                ✓ Modelo 3D Listo. Interactúa con la imagen o pulsa el botón sobre ella para ver en tu espacio.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

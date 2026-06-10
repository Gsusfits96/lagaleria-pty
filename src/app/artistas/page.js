export default function Artistas() {
  return (
    <div className="page-container">
      <header className="page-header">
        <span className="page-eyebrow">Nuestro Talento</span>
        <h1 className="page-title">Artistas</h1>
      </header>

      <div className="editorial-grid" style={{ marginTop: "var(--space-3xl)" }}>
        <div className="editorial-image">
          <img src="/IMG_7645.JPG" alt="Artista en su estudio" loading="lazy" />
        </div>
        <div className="editorial-text">
          <span className="editorial-number">Exclusivo</span>
          <h2 className="editorial-headline">ZOAREZ</h2>
          <p className="editorial-body">
            ZOAREZ explora la intersección entre la naturaleza, el subconsciente y la materialidad pura. 
            Sus obras, caracterizadas por texturas profundas, paletas vibrantes sobre fondos oscuros y 
            una técnica de paleta audaz, invitan a la introspección y la transformación de los espacios contemporáneos.
          </p>
          <p className="editorial-body">
            Cada pieza es un diálogo silencioso, un punto de atracción sereno pero poderoso diseñado para 
            quienes buscan más que decoración: buscan presencia y vitalidad.
          </p>
        </div>
      </div>
    </div>
  );
}

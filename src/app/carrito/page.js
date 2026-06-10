import Link from "next/link";

export default function Carrito() {
  return (
    <div className="page-container" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <header className="page-header" style={{ textAlign: "center" }}>
        <span className="page-eyebrow">Tu Selección</span>
        <h1 className="page-title">Carrito</h1>
      </header>
      
      <div style={{ marginTop: "var(--space-2xl)" }}>
        <p className="editorial-body" style={{ marginBottom: "var(--space-2xl)" }}>
          Actualmente no tienes obras en tu selección.
        </p>
        <Link href="/galeria" className="btn btn-primary">
          Explorar Colección
        </Link>
      </div>
    </div>
  );
}

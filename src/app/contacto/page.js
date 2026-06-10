export default function Contacto() {
  return (
    <div className="page-container" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <header className="page-header" style={{ textAlign: "center", marginBottom: "var(--space-4xl)" }}>
        <span className="page-eyebrow">Hablemos de Arte</span>
        <h1 className="page-title">Contacto</h1>
      </header>

      <div className="editorial-text" style={{ textAlign: "center", maxWidth: "600px" }}>
        <p className="editorial-body" style={{ marginBottom: "var(--space-2xl)" }}>
          Si estás interesado en adquirir una obra, solicitar una comisión personalizada o 
          simplemente conocer más sobre nuestra colección, no dudes en contactarnos.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", alignItems: "center" }}>
          <div>
            <span className="editorial-number" style={{ marginBottom: "var(--space-xs)" }}>Email</span>
            <a href="mailto:info@lagaleriapty.com" style={{ fontSize: "var(--fs-lg)", fontWeight: "300", textDecoration: "none", color: "var(--color-text-primary)" }}>
              info@lagaleriapty.com
            </a>
          </div>

          <div>
            <span className="editorial-number" style={{ marginBottom: "var(--space-xs)" }}>WhatsApp</span>
            <a href="https://wa.me/50700000000" target="_blank" rel="noopener noreferrer" style={{ fontSize: "var(--fs-lg)", fontWeight: "300", textDecoration: "none", color: "var(--color-text-primary)" }}>
              +507 0000-0000
            </a>
          </div>

          <div>
            <span className="editorial-number" style={{ marginBottom: "var(--space-xs)" }}>Instagram</span>
            <a href="https://instagram.com/lagaleriapty" target="_blank" rel="noopener noreferrer" style={{ fontSize: "var(--fs-lg)", fontWeight: "300", textDecoration: "none", color: "var(--color-text-primary)" }}>
              @lagaleriapty
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

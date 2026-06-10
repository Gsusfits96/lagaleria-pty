import Link from "next/link";

export default function ArtworkCard({ artwork }) {
  const {
    id,
    title,
    artist,
    price,
    technique,
    width_cm,
    height_cm,
    image,
    hasAR,
  } = artwork;

  /* Placeholder gradient when no image */
  const placeholderStyle = !image
    ? {
        background: generateGradient(id),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : {};

  return (
    <div className="artwork-card-container">
      <Link
        href={`/obra/${id}`}
        className="artwork-card"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
        id={`artwork-card-${id}`}
      >
        <div className="artwork-card-image" style={placeholderStyle}>
          {image ? (
            <img src={image} alt={title} loading="lazy" />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(0, 0, 0, 0.2)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Obra de arte
              </span>
            </div>
          )}
          {hasAR && (
            <span className="artwork-card-badge">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              AR
            </span>
          )}
        </div>

        <div className="artwork-card-info">
          <h3 className="artwork-card-title">{title}</h3>
          <p className="artwork-card-artist">{artist}</p>
          <div className="artwork-card-meta">
            <span className="artwork-card-price">
              ${price?.toLocaleString("en-US")}
            </span>
            <span className="artwork-card-dims">
              {width_cm} × {height_cm} cm
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* Generate a unique dark gradient based on artwork id */
function generateGradient(id) {
  const gradients = [
    "linear-gradient(135deg, #1a1520 0%, #0d1117 50%, #1a1a2e 100%)",
    "linear-gradient(135deg, #1a1a1a 0%, #162028 50%, #0d1117 100%)",
    "linear-gradient(135deg, #1a150d 0%, #0d1117 50%, #1a1520 100%)",
    "linear-gradient(135deg, #0d1117 0%, #1a1520 50%, #162028 100%)",
    "linear-gradient(135deg, #162028 0%, #1a150d 50%, #0d1117 100%)",
    "linear-gradient(135deg, #1a1a2e 0%, #1a150d 50%, #162028 100%)",
  ];
  const index = (parseInt(id, 10) || 0) % gradients.length;
  return gradients[index];
}

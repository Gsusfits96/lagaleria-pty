"use client";
import React, { useEffect } from "react";

export default function ModelViewerWrapper({ src, alt, poster }) {
  useEffect(() => {
    // Dynamic import to avoid SSR issues with web components
    import("@google/model-viewer").catch(console.error);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      {/* We use React.createElement to prevent TypeScript/JSX errors with custom elements, 
          although standard JSX works if configured */}
      <model-viewer
        src={src}
        alt={alt}
        poster={poster}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        <button slot="ar-button" className="btn btn-primary" style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)" }}>
          Ver en tu espacio
        </button>
      </model-viewer>
    </div>
  );
}

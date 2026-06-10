import { artworks } from "@/data/artworks";
import { notFound } from "next/navigation";

// Next.js dynamic metadata generation
export async function generateMetadata({ params }) {
  // In Next.js 15+, params should be awaited if coming from a Promise.
  // In Next 14/16 App Router, accessing params directly is common, but 
  // awaiting it is future-proof and avoids warnings in newer versions.
  const { id } = await params;
  
  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return {
      title: "Obra no encontrada",
    };
  }

  // Set the OG Image URL based on our upcoming API route
  // The absolute URL is required for Open Graph images.
  // When deployed to Vercel, VERCEL_URL is available. For local development, fallback to localhost.
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";
    
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(artwork.title)}&artist=${encodeURIComponent(artwork.artist)}&image=${encodeURIComponent(artwork.image)}`;

  return {
    title: artwork.title,
    description: artwork.description || `${artwork.title} por ${artwork.artist}. ${artwork.technique}. Medidas: ${artwork.width_cm}x${artwork.height_cm}cm. Visualízala en tu espacio con nuestra experiencia de Realidad Aumentada (AR).`,
    openGraph: {
      title: `${artwork.title} | La Galería PTY`,
      description: artwork.description || `Visualiza "${artwork.title}" en tus propias paredes con AR.`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${artwork.title} | La Galería PTY`,
      description: artwork.description || `Visualiza "${artwork.title}" en tus propias paredes con AR.`,
      images: [ogImageUrl],
    },
  };
}

// The layout acts as a server-side wrapper passing children (the client page) down.
export default function ObraLayout({ children }) {
  return <>{children}</>;
}

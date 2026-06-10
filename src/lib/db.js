import { artworks as initialArtworks } from "@/data/artworks";

// Temporary Mock Database using localStorage
// Once Firebase is set up with credentials, this will be replaced with Firestore calls.

const DB_KEY = "lagaleria_artworks";

export function getArtworks() {
  if (typeof window === "undefined") return initialArtworks;
  
  const data = localStorage.getItem(DB_KEY);
  if (data) {
    return JSON.parse(data);
  }
  
  localStorage.setItem(DB_KEY, JSON.stringify(initialArtworks));
  return initialArtworks;
}

export function getArtworkById(id) {
  const artworks = getArtworks();
  return artworks.find((a) => a.id === id) || null;
}

export function addArtwork(artwork) {
  if (typeof window === "undefined") return;
  const artworks = getArtworks();
  const newArtwork = {
    ...artwork,
    id: Date.now().toString(),
  };
  artworks.push(newArtwork);
  localStorage.setItem(DB_KEY, JSON.stringify(artworks));
  return newArtwork;
}

export function updateArtwork(id, updates) {
  if (typeof window === "undefined") return;
  const artworks = getArtworks();
  const index = artworks.findIndex((a) => a.id === id);
  if (index !== -1) {
    artworks[index] = { ...artworks[index], ...updates };
    localStorage.setItem(DB_KEY, JSON.stringify(artworks));
  }
}

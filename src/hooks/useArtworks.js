"use client";
import { useState, useEffect } from "react";
import { getArtworks, getArtworkById } from "@/lib/db";

export function useArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const data = getArtworks();
    setArtworks(data);
    setLoading(false);
  }, []);

  return { artworks, loading };
}

export function useArtwork(id) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getArtworkById(id);
    setArtwork(data);
    setLoading(false);
  }, [id]);

  return { artwork, loading };
}

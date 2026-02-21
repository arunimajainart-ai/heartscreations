"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getArtworksFast,
  getBlogsFast,
  getArtworkBySlug as getArtworkBySlugFS,
  getBlogBySlug as getBlogBySlugFS,
  FirestoreArtwork,
  FirestoreBlog,
} from "./firestore";
import { useGlobalData } from "./data-context";

/**
 * useArtworks — uses global DataProvider when available (customer pages),
 * falls back to direct fetch (admin pages).
 */
export function useArtworks(publishedOnly = false, availableOnly = false) {
  const global = useGlobalData();
  const hasGlobal = global.artworksLoaded || global.artworks.length > 0;

  // Fallback state for admin pages (no DataProvider)
  const [fallbackArtworks, setFallbackArtworks] = useState<FirestoreArtwork[]>([]);
  const [fallbackLoading, setFallbackLoading] = useState(!hasGlobal);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasGlobal) return; // skip fetch if global data is available
    setFallbackLoading(true);
    setError(null);
    getArtworksFast()
      .then((data) => {
        let filtered = data;
        if (publishedOnly) filtered = filtered.filter((a) => a.published === true);
        if (availableOnly) filtered = filtered.filter((a) => a.isAvailable === true);
        return filtered;
      })
      .then(setFallbackArtworks)
      .catch((err) => {
        console.error("useArtworks error:", err);
        setError(err?.message || "Failed to fetch artworks");
        setFallbackArtworks([]);
      })
      .finally(() => setFallbackLoading(false));
  }, [publishedOnly, availableOnly, hasGlobal]);

  const artworks = useMemo(() => {
    const source = hasGlobal ? global.artworks : fallbackArtworks;
    let filtered = source;
    if (publishedOnly) filtered = filtered.filter((a) => a.published === true);
    if (availableOnly) filtered = filtered.filter((a) => a.isAvailable === true);
    return filtered;
  }, [hasGlobal, global.artworks, fallbackArtworks, publishedOnly, availableOnly]);

  const loading = hasGlobal ? !global.artworksLoaded : fallbackLoading;

  return { artworks, loading, error };
}

export function useArtworkBySlug(slug: string) {
  const global = useGlobalData();
  const hasGlobal = global.artworksLoaded || global.artworks.length > 0;

  const [fallbackArtwork, setFallbackArtwork] = useState<FirestoreArtwork | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(true);

  // Try to find from global data first (instant)
  const globalMatch = useMemo(
    () => (hasGlobal ? global.artworks.find((a) => a.slug === slug) ?? null : null),
    [hasGlobal, global.artworks, slug]
  );

  useEffect(() => {
    if (hasGlobal) return; // skip fetch
    if (!slug) {
      setFallbackLoading(false);
      return;
    }
    setFallbackLoading(true);
    getArtworkBySlugFS(slug)
      .then(setFallbackArtwork)
      .catch((err) => {
        console.error("useArtworkBySlug error:", err);
        setFallbackArtwork(null);
      })
      .finally(() => setFallbackLoading(false));
  }, [slug, hasGlobal]);

  const artwork = hasGlobal ? globalMatch : fallbackArtwork;
  const loading = hasGlobal ? !global.artworksLoaded : fallbackLoading;

  return { artwork, loading };
}

export function useBlogs(publishedOnly = false) {
  const global = useGlobalData();
  const hasGlobal = global.blogsLoaded || global.blogs.length > 0;

  const [fallbackBlogs, setFallbackBlogs] = useState<FirestoreBlog[]>([]);
  const [fallbackLoading, setFallbackLoading] = useState(!hasGlobal);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasGlobal) return;
    setFallbackLoading(true);
    setError(null);
    getBlogsFast()
      .then((data) => publishedOnly ? data.filter((b) => b.published === true) : data)
      .then(setFallbackBlogs)
      .catch((err) => {
        console.error("useBlogs error:", err);
        setError(err?.message || "Failed to fetch blogs");
        setFallbackBlogs([]);
      })
      .finally(() => setFallbackLoading(false));
  }, [publishedOnly, hasGlobal]);

  const blogs = useMemo(() => {
    const source = hasGlobal ? global.blogs : fallbackBlogs;
    return publishedOnly ? source.filter((b) => b.published === true) : source;
  }, [hasGlobal, global.blogs, fallbackBlogs, publishedOnly]);

  const loading = hasGlobal ? !global.blogsLoaded : fallbackLoading;

  return { blogs, loading, error };
}

export function useBlogBySlug(slug: string) {
  const global = useGlobalData();
  const hasGlobal = global.blogsLoaded || global.blogs.length > 0;

  const [fallbackBlog, setFallbackBlog] = useState<FirestoreBlog | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(true);

  const globalMatch = useMemo(
    () => (hasGlobal ? global.blogs.find((b) => b.slug === slug) ?? null : null),
    [hasGlobal, global.blogs, slug]
  );

  useEffect(() => {
    if (hasGlobal) return;
    if (!slug) {
      setFallbackLoading(false);
      return;
    }
    setFallbackLoading(true);
    getBlogBySlugFS(slug)
      .then(setFallbackBlog)
      .catch((err) => {
        console.error("useBlogBySlug error:", err);
        setFallbackBlog(null);
      })
      .finally(() => setFallbackLoading(false));
  }, [slug, hasGlobal]);

  const blog = hasGlobal ? globalMatch : fallbackBlog;
  const loading = hasGlobal ? !global.blogsLoaded : fallbackLoading;

  return { blog, loading };
}

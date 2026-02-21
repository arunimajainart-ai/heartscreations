"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  getArtworksFromServer,
  getBlogsFromServer,
  FirestoreArtwork,
  FirestoreBlog,
} from "./firestore";
import { auth } from "./firebase";

interface DataContextType {
  artworks: FirestoreArtwork[];
  blogs: FirestoreBlog[];
  artworksLoaded: boolean;
  blogsLoaded: boolean;
  error: string | null;
  refreshArtworks: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  artworks: [],
  blogs: [],
  artworksLoaded: false,
  blogsLoaded: false,
  error: null,
  refreshArtworks: async () => {},
  refreshBlogs: async () => {},
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [artworks, setArtworks] = useState<FirestoreArtwork[]>([]);
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [artworksLoaded, setArtworksLoaded] = useState(false);
  const [blogsLoaded, setBlogsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const retryCount = useRef(0);

  const refreshArtworks = useCallback(async () => {
    try {
      const data = await getArtworksFromServer();
      setArtworks(data);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("DataProvider: artworks server fetch error", msg);
      setError((prev) => prev || `Artwork fetch failed: ${msg}`);
    } finally {
      setArtworksLoaded(true);
    }
  }, []);

  const refreshBlogs = useCallback(async () => {
    try {
      const data = await getBlogsFromServer();
      setBlogs(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("DataProvider: blogs server fetch error", msg);
      setError((prev) => prev || `Blog fetch failed: ${msg}`);
    } finally {
      setBlogsLoaded(true);
    }
  }, []);

  const fetchAll = useCallback(() => {
    refreshArtworks();
    refreshBlogs();
  }, [refreshArtworks, refreshBlogs]);

  // Step 1: Try fetching IMMEDIATELY on mount (works if rules are open)
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Step 2: Also try anonymous auth in background, then retry if first fetch failed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth).catch((err) => {
          console.warn("DataProvider: anonymous auth failed", err);
        });
        return;
      }
      // Auth is now ready — retry fetch if first attempt returned empty
      if (retryCount.current < 2) {
        retryCount.current += 1;
        fetchAll();
      }
    });
    return () => unsubscribe();
  }, [fetchAll]);

  return (
    <DataContext.Provider
      value={{
        artworks,
        blogs,
        artworksLoaded,
        blogsLoaded,
        error,
        refreshArtworks,
        refreshBlogs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(DataContext);
}

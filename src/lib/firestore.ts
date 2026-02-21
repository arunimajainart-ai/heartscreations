import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { supabase } from "./supabase";

// ─── Helper: strip undefined values (Firestore rejects undefined) ───
function cleanData<T extends Record<string, unknown>>(data: T): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

// ─── In-memory cache with TTL ───
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 5 * 60_000; // 5 minutes
const cache: Record<string, CacheEntry<unknown>> = {};

function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    delete cache[key];
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

export function invalidateCache(prefix?: string): void {
  if (prefix) {
    for (const key of Object.keys(cache)) {
      if (key.startsWith(prefix)) delete cache[key];
    }
  } else {
    for (const key of Object.keys(cache)) delete cache[key];
  }
}

// ─── Write-through cache helpers ───
function cacheInsertArtwork(item: FirestoreArtwork): void {
  const key = "artworks_all";
  const list = getCached<FirestoreArtwork[]>(key);
  if (list) {
    setCache(key, [...list, item].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }
}

function cacheUpdateArtwork(id: string, partial: Partial<FirestoreArtwork>): void {
  const key = "artworks_all";
  const list = getCached<FirestoreArtwork[]>(key);
  if (list) {
    setCache(key, list.map((a) => (a.id === id ? { ...a, ...partial } : a))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }
}

function cacheRemoveArtwork(id: string): void {
  const key = "artworks_all";
  const list = getCached<FirestoreArtwork[]>(key);
  if (list) {
    setCache(key, list.filter((a) => a.id !== id));
  }
}

function cacheInsertBlog(item: FirestoreBlog): void {
  const key = "blogs_all";
  const list = getCached<FirestoreBlog[]>(key);
  if (list) {
    setCache(key, [item, ...list].sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    }));
  }
}

function cacheUpdateBlog(id: string, partial: Partial<FirestoreBlog>): void {
  const key = "blogs_all";
  const list = getCached<FirestoreBlog[]>(key);
  if (list) {
    setCache(key, list.map((b) => (b.id === id ? { ...b, ...partial } : b)));
  }
}

function cacheRemoveBlog(id: string): void {
  const key = "blogs_all";
  const list = getCached<FirestoreBlog[]>(key);
  if (list) {
    setCache(key, list.filter((b) => b.id !== id));
  }
}

// ─── Artwork Types ───
export interface FirestoreArtwork {
  id?: string;
  title: string;
  slug: string;
  artist?: string;
  size?: string;
  medium: string;
  description: string;
  bulletPoints?: string[];
  vastuEffect?: string;
  vastuPlacement?: string[];
  symbolism?: { label: string; text: string }[];
  image: string;
  imageSource?: "upload" | "url";
  published: boolean;
  isAvailable: boolean;
  collection?: string;
  price?: string;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// ─── Blog Types ───
export interface FirestoreBlog {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageSource?: "upload" | "url";
  published: boolean;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  metaDescription?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// ─── Image Upload (Supabase) ───
export async function uploadImage(
  file: File,
  folder: string
): Promise<string> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${folder}/${timestamp}_${safeName}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error("Supabase Upload Error:", error);
    throw new Error(error.message || "Failed to upload image to Supabase.");
  }

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadImageWithRetry(
  file: File,
  folder: string,
  maxRetries = 2
): Promise<string> {
  let lastError: any;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await uploadImage(file, folder);
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }
  throw lastError;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const urlObj = new URL(imageUrl);
    const pathParts = urlObj.pathname.split("/public/images/");
    if (pathParts.length > 1) {
      const filePath = pathParts[1];
      await supabase.storage.from("images").remove([filePath]);
    }
  } catch {
    // Ignore errors for deletion
  }
}

// ─── Helper: race a promise against a timeout ───
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); },
    );
  });
}

/**
 * Await a Firestore write — resolves after server acknowledges the write,
 * ensuring data is visible to other devices immediately.
 * Added a timeout to prevent silent hanging when Firestore is offline or disabled.
 */
async function awaitWrite(promise: Promise<unknown>): Promise<void> {
  await withTimeout(promise, 10000); // 10 second timeout for write operations
}

// ─── Artwork CRUD ───
const artworksCollection = collection(db, "artworks");

export async function getArtworks(
  publishedOnly = false,
  availableOnly = false
): Promise<FirestoreArtwork[]> {
  const cacheKey = "artworks_all";
  const cached = getCached<FirestoreArtwork[]>(cacheKey);
  if (cached) {
    let filtered = cached;
    if (publishedOnly) filtered = filtered.filter((a) => a.published === true);
    if (availableOnly) filtered = filtered.filter((a) => a.isAvailable === true);
    return filtered;
  }

  const snapshot = await withTimeout(getDocs(artworksCollection), 8000);
  const results = snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as FirestoreArtwork))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  setCache(cacheKey, results);
  let filtered = results;
  if (publishedOnly) filtered = filtered.filter((a) => a.published === true);
  if (availableOnly) filtered = filtered.filter((a) => a.isAvailable === true);
  return filtered;
}

export async function getArtworksFromServer(
  publishedOnly = false,
  availableOnly = false
): Promise<FirestoreArtwork[]> {
  const snapshot = await withTimeout(getDocs(artworksCollection), 8000);
  const results = snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as FirestoreArtwork))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  setCache("artworks_all", results);
  let filtered = results;
  if (publishedOnly) filtered = filtered.filter((a) => a.published === true);
  if (availableOnly) filtered = filtered.filter((a) => a.isAvailable === true);
  return filtered;
}

/**
 * Fast fetch: returns in-memory cache if fresh, otherwise fetches from server.
 */
export async function getArtworksFast(): Promise<FirestoreArtwork[]> {
  const cacheKey = "artworks_all";
  const cached = getCached<FirestoreArtwork[]>(cacheKey);
  if (cached) return cached;

  try {
    const snap = await withTimeout(getDocs(artworksCollection), 8000);
    const results = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as FirestoreArtwork))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    setCache(cacheKey, results);
    return results;
  } catch {
    return [];
  }
}

export async function getArtworkBySlug(
  slug: string
): Promise<FirestoreArtwork | null> {
  // Check if the full list is cached — avoids a separate query
  const cached = getCached<FirestoreArtwork[]>("artworks_all");
  if (cached) {
    return cached.find((a) => a.slug === slug) ?? null;
  }

  const q = query(artworksCollection, where("slug", "==", slug));
  const snapshot = await withTimeout(getDocs(q), 8000);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as FirestoreArtwork;
}

export async function addArtwork(
  artwork: Omit<FirestoreArtwork, "id" | "createdAt" | "updatedAt">
): Promise<FirestoreArtwork> {
  const now = Timestamp.now();
  const docRef = doc(artworksCollection); // pre-generate ID locally
  const data = cleanData({
    ...artwork,
    published: artwork.published ?? true,
    isAvailable: artwork.isAvailable ?? true,
    createdAt: now,
    updatedAt: now,
  });
  await awaitWrite(setDoc(docRef, data)); // await server confirmation
  const full: FirestoreArtwork = { ...artwork, id: docRef.id, createdAt: now, updatedAt: now };
  cacheInsertArtwork(full);
  return full;
}

export async function updateArtwork(
  id: string,
  artwork: Partial<FirestoreArtwork>
): Promise<void> {
  const now = Timestamp.now();
  const docRef = doc(db, "artworks", id);
  const data = cleanData({
    ...artwork,
    updatedAt: now,
  });
  await awaitWrite(updateDoc(docRef, data)); // await server confirmation
  cacheUpdateArtwork(id, { ...artwork, updatedAt: now });
}

export async function deleteArtwork(id: string): Promise<void> {
  const docRef = doc(db, "artworks", id);
  await awaitWrite(deleteDoc(docRef)); // await server confirmation
  cacheRemoveArtwork(id);
}

export async function deleteAllArtworks(): Promise<void> {
  const snapshot = await withTimeout(getDocs(artworksCollection), 8000);
  if (snapshot.empty) return;
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await awaitWrite(batch.commit()); // await server confirmation
  setCache("artworks_all", []);
}

// ─── Blog CRUD ───
const blogsCollection = collection(db, "blogs");

export async function getBlogs(
  publishedOnly = false
): Promise<FirestoreBlog[]> {
  const cacheKey = "blogs_all";
  const cached = getCached<FirestoreBlog[]>(cacheKey);
  if (cached) {
    return publishedOnly ? cached.filter((b) => b.published === true) : cached;
  }

  const snapshot = await withTimeout(getDocs(blogsCollection), 8000);
  const results = snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as FirestoreBlog))
    .sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    });

  setCache(cacheKey, results);
  return publishedOnly ? results.filter((b) => b.published === true) : results;
}

export async function getBlogsFromServer(
  publishedOnly = false
): Promise<FirestoreBlog[]> {
  const snapshot = await withTimeout(getDocs(blogsCollection), 8000);
  const results = snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() } as FirestoreBlog))
    .sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    });

  setCache("blogs_all", results);
  return publishedOnly ? results.filter((b) => b.published === true) : results;
}

/**
 * Fast fetch for blogs: returns in-memory cache if fresh, otherwise fetches from server.
 */
export async function getBlogsFast(): Promise<FirestoreBlog[]> {
  const cacheKey = "blogs_all";
  const cached = getCached<FirestoreBlog[]>(cacheKey);
  if (cached) return cached;

  const sortBlogs = (docs: FirestoreBlog[]) =>
    docs.sort((a, b) => {
      const ta = a.createdAt?.toMillis?.() ?? 0;
      const tb = b.createdAt?.toMillis?.() ?? 0;
      return tb - ta;
    });

  try {
    const snap = await withTimeout(getDocs(blogsCollection), 8000);
    const results = sortBlogs(
      snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreBlog))
    );
    setCache(cacheKey, results);
    return results;
  } catch {
    return [];
  }
}

export async function getBlogBySlug(
  slug: string
): Promise<FirestoreBlog | null> {
  // Check if the full list is cached — avoids a separate query
  const cached = getCached<FirestoreBlog[]>("blogs_all");
  if (cached) {
    return cached.find((b) => b.slug === slug) ?? null;
  }

  const q = query(blogsCollection, where("slug", "==", slug));
  const snapshot = await withTimeout(getDocs(q), 8000);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as FirestoreBlog;
}

export async function addBlog(
  blog: Omit<FirestoreBlog, "id" | "createdAt" | "updatedAt">
): Promise<FirestoreBlog> {
  const now = Timestamp.now();
  const docRef = doc(blogsCollection); // pre-generate ID locally
  const data = cleanData({
    ...blog,
    createdAt: now,
    updatedAt: now,
  });
  await awaitWrite(setDoc(docRef, data)); // await server confirmation
  const full: FirestoreBlog = { ...blog, id: docRef.id, createdAt: now, updatedAt: now };
  cacheInsertBlog(full);
  return full;
}

export async function updateBlog(
  id: string,
  blog: Partial<FirestoreBlog>
): Promise<void> {
  const now = Timestamp.now();
  const docRef = doc(db, "blogs", id);
  const data = cleanData({
    ...blog,
    updatedAt: now,
  });
  await awaitWrite(updateDoc(docRef, data)); // await server confirmation
  cacheUpdateBlog(id, { ...blog, updatedAt: now });
}

export async function deleteBlog(id: string): Promise<void> {
  const docRef = doc(db, "blogs", id);
  await awaitWrite(deleteDoc(docRef)); // await server confirmation
  cacheRemoveBlog(id);
}

export async function deleteAllBlogs(): Promise<void> {
  const snapshot = await withTimeout(getDocs(blogsCollection), 8000);
  if (snapshot.empty) return;
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await awaitWrite(batch.commit()); // await server confirmation
  setCache("blogs_all", []);
}

// ─── Batch Seed (single network round trip for ALL artworks) ───
export async function batchSeedArtworks(
  artworks: Omit<FirestoreArtwork, "id" | "createdAt" | "updatedAt">[]
): Promise<FirestoreArtwork[]> {
  const batch = writeBatch(db);
  const now = Timestamp.now();
  const results: FirestoreArtwork[] = [];

  for (const artwork of artworks) {
    const docRef = doc(artworksCollection); // auto-generate ID locally
    const data = cleanData({
      ...artwork,
      published: artwork.published ?? true,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(docRef, data);
    results.push({ ...artwork, id: docRef.id, createdAt: now, updatedAt: now });
  }

  await awaitWrite(batch.commit()); // await server confirmation
  // Write-through: append new items to cache
  const existing = getCached<FirestoreArtwork[]>("artworks_all") || [];
  setCache("artworks_all", [...existing, ...results].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  return results;
}

export async function batchUpdateArtworks(
  updates: { id: string; data: Partial<FirestoreArtwork> }[]
): Promise<void> {
  const batch = writeBatch(db);
  const now = Timestamp.now();

  for (const { id, data } of updates) {
    const docRef = doc(db, "artworks", id);
    batch.update(docRef, cleanData({ ...data, updatedAt: now }));
  }

  await awaitWrite(batch.commit()); // await server confirmation
  // Write-through: patch updated items in cache
  const cached = getCached<FirestoreArtwork[]>("artworks_all");
  if (cached) {
    const updateMap = new Map(updates.map((u) => [u.id, u.data]));
    setCache("artworks_all", cached.map((a) => {
      const patch = a.id ? updateMap.get(a.id) : undefined;
      return patch ? { ...a, ...patch, updatedAt: now } : a;
    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }
}

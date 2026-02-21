"use client";

import { useState, useCallback, useEffect } from "react";
import {
  addArtwork,
  getArtworksFast,
  updateArtwork,
  deleteAllArtworks,
  batchSeedArtworks,
  batchUpdateArtworks,
  FirestoreArtwork,
} from "@/lib/firestore";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Database,
  Paintbrush,
  LayoutList,
  Sparkles,
  Info,
} from "lucide-react";

// ─── Seed artwork data — exactly matching Arunima's content ───

type SeedArtwork = Omit<FirestoreArtwork, "id" | "createdAt" | "updatedAt">;

const SEED_ARTWORKS: SeedArtwork[] = [
  {
    title: "A Moment Between Worlds",
    slug: "a-moment-between-worlds",
    artist: "By Arunima Jain",
    size: '24" by 24"',
    medium: "Acrylic on canvas",
    description: "This painting represents:",
    bulletPoints: [
      "Calm amidst chaos",
      "Balance of energies",
      "Mindfulness and inner strength",
    ],
    vastuEffect:
      "Rather than bringing heaviness, it encourages introspection, grounding, and emotional balance.",
    image: "/abstract_collection.webp",
    imageSource: "upload",
    published: true,
    isAvailable: true,
    collection: "Abstract Expressions",
    order: 0,
  },
  {
    title: "Nandi painting",
    slug: "nandi-painting",
    artist: "By Arunima Jain",
    medium: "Acrylic on canvas",
    description:
      "Vastu effect of the painting—\nThis artwork brings strong, determined, and protective energy into a space.",
    vastuEffect:
      "This artwork brings strong, determined, and protective energy into a space.",
    vastuPlacement: [
      "South wall (most powerful choice)",
      "South-East corner",
      "Home office / workspace",
      "Living room (on the wall behind where you sit)",
    ],
    image: "/nandi_art.webp",
    imageSource: "upload",
    published: true,
    isAvailable: true,
    collection: "Sacred Energies",
    order: 1,
  },
  {
    title: "Pichwai painting",
    slug: "pichwai-painting",
    artist: "By Arunima Jain",
    medium: "Acrylic on 300 gsm paper",
    size: "40 inch by 18 inch",
    description: "Symbolism:",
    symbolism: [
      {
        label: "Cow and calf",
        text: "Prosperity, motherhood, abundance, and sacredness",
      },
      {
        label: "Lotus flowers",
        text: "Purity, spiritual awakening, and divine beauty",
      },
      {
        label: "Symmetry & repetition",
        text: "Harmony, balance, and cosmic order",
      },
    ],
    image: "/divine_art.webp",
    imageSource: "upload",
    published: true,
    isAvailable: true,
    collection: "Divine Symmetry",
    order: 2,
  },
];

// ─── Helper: count filled fields ───
function countFields(artwork: SeedArtwork): { filled: number; total: number } {
  const all: (keyof SeedArtwork)[] = [
    "title",
    "slug",
    "artist",
    "size",
    "medium",
    "description",
    "bulletPoints",
    "vastuEffect",
    "vastuPlacement",
    "symbolism",
    "image",
    "imageSource",
    "published",
    "isAvailable",
    "collection",
    "price",
    "order",
  ];
  let filled = 0;
  for (const key of all) {
    const v = artwork[key];
    if (v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
      filled++;
  }
  return { filled, total: all.length };
}

type PerItemStatus = "idle" | "loading" | "success" | "error" | "exists";

export default function SeedDataPage() {
  const [existing, setExisting] = useState<FirestoreArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [itemStatus, setItemStatus] = useState<Record<number, PerItemStatus>>(
    () => SEED_ARTWORKS.reduce((acc, _, i) => ({ ...acc, [i]: "idle" }), {})
  );
  const [globalMsg, setGlobalMsg] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  // ─── Fetch existing on mount ───
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArtworksFast();
      setExisting(data);
      // Mark items that already exist by slug
      const slugs = new Set(data.map((a) => a.slug));
      setItemStatus((prev) => {
        const next = { ...prev };
        SEED_ARTWORKS.forEach((art, i) => {
          if (slugs.has(art.slug) && next[i] === "idle") next[i] = "exists";
          if (!slugs.has(art.slug) && next[i] === "exists") next[i] = "idle";
        });
        return next;
      });
    } catch (err) {
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ─── Seed single artwork + optimistic update ───
  const seedOneAndRefresh = async (index: number, overwrite = false) => {
    const art = SEED_ARTWORKS[index];
    setBusy(true);
    setGlobalMsg(null);
    setItemStatus((p) => ({ ...p, [index]: "loading" }));
    try {
      const match = existing.find((e) => e.slug === art.slug);
      if (match && !overwrite) {
        setItemStatus((p) => ({ ...p, [index]: "exists" }));
        setGlobalMsg({ type: "info", text: `"${art.title}" already exists. Use Update to overwrite.` });
        setBusy(false);
        return;
      }
      if (match && overwrite && match.id) {
        await updateArtwork(match.id, art as Partial<FirestoreArtwork>);
      } else {
        await addArtwork(art);
      }

      // ── Optimistic: mark success IMMEDIATELY, update state from seed data ──
      setItemStatus((p) => ({ ...p, [index]: "success" }));
      setExisting((prev) => {
        const without = prev.filter((e) => e.slug !== art.slug);
        return [...without, { ...art, id: match?.id || "pending" } as FirestoreArtwork];
      });
      setGlobalMsg({ type: "success", text: `"${art.title}" seeded successfully!` });
      setBusy(false);
    } catch (err) {
      console.error(`Error seeding "${art.title}":`, err);
      setItemStatus((p) => ({ ...p, [index]: "error" }));
      setBusy(false);
    }
  };

  // ─── Seed ALL — single batch write + optimistic state update (1 network call total) ───
  const seedAll = async (overwrite = false) => {
    setBusy(true);
    setGlobalMsg(null);
    // Mark all as loading immediately
    setItemStatus(
      SEED_ARTWORKS.reduce((acc, _, i) => ({ ...acc, [i]: "loading" }), {})
    );

    try {
      if (overwrite && existing.length > 0) {
        // Batch update existing docs
        const updates = SEED_ARTWORKS.map((art) => {
          const match = existing.find((e) => e.slug === art.slug);
          return match?.id
            ? { id: match.id, data: art as Partial<FirestoreArtwork> }
            : null;
        }).filter(Boolean) as { id: string; data: Partial<FirestoreArtwork> }[];

        const newArts = SEED_ARTWORKS.filter(
          (art) => !existing.find((e) => e.slug === art.slug)
        );

        // Single batch for updates + single batch for new
        if (updates.length > 0) await batchUpdateArtworks(updates);
        if (newArts.length > 0) await batchSeedArtworks(newArts);
      } else {
        // Filter out artworks that already exist (skip existing)
        const toSeed = SEED_ARTWORKS.filter(
          (art) => !existing.find((e) => e.slug === art.slug)
        );
        if (toSeed.length > 0) {
          await batchSeedArtworks(toSeed); // ← ONE network call for all
        }
      }

      // ── Optimistic: mark success IMMEDIATELY after write completes ──
      setItemStatus(
        SEED_ARTWORKS.reduce((acc, _, i) => ({ ...acc, [i]: "success" }), {})
      );
      // Optimistically update existing list from seed data
      setExisting((prev) => {
        const slugMap = new Map(prev.map((a) => [a.slug, a]));
        return SEED_ARTWORKS.map((art) => {
          const match = slugMap.get(art.slug);
          return { ...art, id: match?.id || "pending" } as FirestoreArtwork;
        });
      });
      setGlobalMsg({ type: "success", text: `All ${SEED_ARTWORKS.length} artworks seeded successfully!` });
      setBusy(false);
    } catch (err) {
      console.error("Error batch seeding:", err);
      setGlobalMsg({ type: "error", text: "Failed to seed artworks. Check console for details." });
      setItemStatus(
        SEED_ARTWORKS.reduce((acc, _, i) => ({ ...acc, [i]: "error" }), {})
      );
      setBusy(false);
    }
  };

  // ─── Clear all Firestore artworks (single batch operation) ───
  const clearAll = async () => {
    if (
      !confirm(
        `This will permanently delete all ${existing.length} artwork(s) from Firestore. Continue?`
      )
    )
      return;
    setBusy(true);
    setGlobalMsg(null);
    try {
      await deleteAllArtworks();
      // ── Optimistic: immediately clear state ──
      setItemStatus(
        SEED_ARTWORKS.reduce((acc, _, i) => ({ ...acc, [i]: "idle" }), {})
      );
      setExisting([]);
      setGlobalMsg({
        type: "success",
        text: `Cleared ${existing.length} artwork(s) from Firestore.`,
      });
      setBusy(false);
    } catch (err) {
      console.error("Error clearing artworks:", err);
      setGlobalMsg({ type: "error", text: "Failed to clear artworks." });
      setBusy(false);
    }
  };

  const toggle = (i: number) =>
    setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const statusBadge = (s: PerItemStatus) => {
    switch (s) {
      case "loading":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-700" />
            Seeding…
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-3 h-3" /> Done
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
            <AlertCircle className="w-3 h-3" /> Error
          </span>
        );
      case "exists":
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
            <Database className="w-3 h-3" /> Already in DB
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
            Ready
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Seed Data</h2>
          <p className="text-sm text-gray-500 mt-1">
            {existing.length} artwork{existing.length !== 1 ? "s" : ""}{" "}
            currently in Firestore
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={busy}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Empty state warning OR info banner */}
      {existing.length === 0 ? (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5 mb-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-900 flex-1">
            <p className="font-bold text-base mb-1">
              Your Firestore database is empty!
            </p>
            <p className="text-amber-700 mb-3">
              No artworks exist in Firestore yet. Your website will show blank
              pages until you seed the data. Click the button below to push
              Arunima&apos;s 3 artworks to the database.
            </p>
            <button
              onClick={() => seedAll(false)}
              disabled={busy}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {busy ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Seeding…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Seed All Artworks Now
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">
              {existing.length} artwork{existing.length !== 1 ? "s" : ""} in
              Firestore
            </p>
            <p className="text-green-600">
              Data is live on your website. You can update individual artworks
              below or use the Artworks manager for full editing.
            </p>
          </div>
        </div>
      )}

      {/* Global actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <button
          onClick={() => seedAll(false)}
          disabled={busy}
          className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 w-full sm:w-auto"
        >
          {busy ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Processing…
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Seed All (Skip Existing)
            </>
          )}
        </button>
        <button
          onClick={() => seedAll(true)}
          disabled={busy}
          className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" /> Seed All (Overwrite)
        </button>
        {existing.length > 0 && (
          <button
            onClick={clearAll}
            disabled={busy}
            className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" /> Clear All ({existing.length})
          </button>
        )}
      </div>

      {/* Global message */}
      {globalMsg && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-6 ${globalMsg.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : globalMsg.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-yellow-50 text-yellow-700 border border-yellow-200"
            }`}
        >
          {globalMsg.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {globalMsg.text}
        </div>
      )}

      {/* Artwork cards */}
      <div className="space-y-4">
        {SEED_ARTWORKS.map((art, i) => {
          const isOpen = expanded[i] ?? false;
          const { filled, total } = countFields(art);
          const existingMatch = existing.find((e) => e.slug === art.slug);

          return (
            <div
              key={art.slug}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Card header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center p-4 sm:gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggle(i)}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                        {art.title}
                      </h3>
                      {statusBadge(itemStatus[i])}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {art.medium}
                      {art.size ? ` · ${art.size}` : ""}
                      {art.collection ? ` · ${art.collection}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {filled}/{total} fields filled ·{" "}
                      {art.published ? (
                        <span className="text-green-600 font-medium">Published</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Draft</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0 w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {itemStatus[i] !== "loading" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            seedOneAndRefresh(i, false);
                          }}
                          disabled={busy}
                          className="px-4 py-2 sm:px-3 sm:py-1.5 text-xs sm:text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
                          title="Seed this artwork"
                        >
                          Seed
                        </button>
                        {existingMatch && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              seedOneAndRefresh(i, true);
                            }}
                            disabled={busy}
                            className="px-4 py-2 sm:px-3 sm:py-1.5 text-xs sm:text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex-1 sm:flex-none"
                            title="Overwrite existing"
                          >
                            Update
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-1">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: fields */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <LayoutList className="w-3.5 h-3.5" /> All Fields
                      </h4>

                      <Field label="Title" value={art.title} />
                      <Field label="Slug" value={art.slug} mono />
                      <Field label="Artist" value={art.artist} />
                      <Field label="Medium" value={art.medium} />
                      <Field label="Size" value={art.size} />
                      <Field label="Collection" value={art.collection} />
                      <Field label="Price" value={art.price} />
                      <Field label="Order" value={String(art.order)} />
                      <Field
                        label="Published"
                        value={art.published ? "Yes" : "No"}
                        icon={
                          art.published ? (
                            <Eye className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-yellow-600" />
                          )
                        }
                      />
                      <Field label="Image" value={art.image} mono />
                      <Field label="Image Source" value={art.imageSource} />
                    </div>

                    {/* Right: content */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Paintbrush className="w-3.5 h-3.5" /> Content &
                        Details
                      </h4>

                      <div>
                        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                          Description
                        </span>
                        <p className="text-sm text-gray-700 whitespace-pre-line mt-0.5">
                          {art.description}
                        </p>
                      </div>

                      {art.bulletPoints && art.bulletPoints.length > 0 && (
                        <div>
                          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                            Bullet Points
                          </span>
                          <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {art.bulletPoints.map((bp, j) => (
                              <li
                                key={j}
                                className="text-sm text-gray-700"
                              >
                                {bp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {art.vastuEffect && (
                        <div>
                          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                            Vastu Effect
                          </span>
                          <p className="text-sm text-gray-700 mt-0.5">
                            {art.vastuEffect}
                          </p>
                        </div>
                      )}

                      {art.vastuPlacement &&
                        art.vastuPlacement.length > 0 && (
                          <div>
                            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                              Best Areas to Place
                            </span>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                              {art.vastuPlacement.map((vp, j) => (
                                <li
                                  key={j}
                                  className="text-sm text-gray-700"
                                >
                                  {vp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {art.symbolism && art.symbolism.length > 0 && (
                        <div>
                          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                            Symbolism
                          </span>
                          <ul className="mt-1 space-y-1">
                            {art.symbolism.map((sym, j) => (
                              <li key={j} className="text-sm text-gray-700">
                                <span className="font-medium text-gray-900">
                                  {sym.label}:
                                </span>{" "}
                                {sym.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Diff with existing */}
                      {existingMatch && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3.5 h-3.5" /> Existing vs
                            Seed
                          </h4>
                          <DiffRow
                            label="Title"
                            existing={existingMatch.title}
                            seed={art.title}
                          />
                          <DiffRow
                            label="Artist"
                            existing={existingMatch.artist}
                            seed={art.artist}
                          />
                          <DiffRow
                            label="Medium"
                            existing={existingMatch.medium}
                            seed={art.medium}
                          />
                          <DiffRow
                            label="Size"
                            existing={existingMatch.size}
                            seed={art.size}
                          />
                          <DiffRow
                            label="Collection"
                            existing={existingMatch.collection}
                            seed={art.collection}
                          />
                          <DiffRow
                            label="Published"
                            existing={
                              existingMatch.published ? "Yes" : "No"
                            }
                            seed={art.published ? "Yes" : "No"}
                          />
                          <DiffRow
                            label="Image"
                            existing={existingMatch.image}
                            seed={art.image}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sub-components ───

function Field({
  label,
  value,
  mono,
  icon,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide w-24 shrink-0 pt-0.5">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {icon}
        {value ? (
          <span
            className={`text-sm text-gray-800 ${mono ? "font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded" : ""
              }`}
          >
            {value}
          </span>
        ) : (
          <span className="text-sm text-gray-300 italic">—</span>
        )}
      </div>
    </div>
  );
}

function DiffRow({
  label,
  existing,
  seed,
}: {
  label: string;
  existing?: string;
  seed?: string;
}) {
  const match = (existing || "") === (seed || "");
  if (match) return null;
  return (
    <div className="text-xs mb-1.5">
      <span className="font-medium text-gray-600">{label}:</span>{" "}
      <span className="line-through text-red-400">{existing || "—"}</span>{" "}
      <span className="text-green-700">→ {seed || "—"}</span>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Upload, X, ImageIcon, Eye, EyeOff, Link2, ExternalLink } from "lucide-react";
import {
  getArtworksFast,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  uploadImageWithRetry,
  FirestoreArtwork,
} from "@/lib/firestore";

interface SymbolismItem {
  label: string;
  text: string;
}

type ImageMode = "upload" | "url";

interface ArtworkForm {
  title: string;
  slug: string;
  artist: string;
  size: string;
  medium: string;
  description: string;
  bulletPoints: string;
  vastuEffect: string;
  vastuPlacement: string;
  symbolism: SymbolismItem[];
  image: string;
  imageUrl: string;
  imageMode: ImageMode;
  published: boolean;
  isAvailable: boolean;
  collection: string;
  price: string;
  order: number;
}

const emptyForm: ArtworkForm = {
  title: "",
  slug: "",
  artist: "By Arunima Jain",
  size: "",
  medium: "",
  description: "",
  bulletPoints: "",
  vastuEffect: "",
  vastuPlacement: "",
  symbolism: [],
  image: "",
  imageUrl: "",
  imageMode: "upload",
  published: true,
  isAvailable: true,
  collection: "",
  price: "",
  order: 0,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function convertGoogleDriveUrl(url: string): string {
  // Extract ID from /d/ID/view or /d/ID
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  // Extract ID from ?id=ID
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2) {
    return `https://lh3.googleusercontent.com/d/${match2[1]}`;
  }
  // Extract ID from file/d/ID
  const match3 = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match3) {
    return `https://lh3.googleusercontent.com/d/${match3[1]}`;
  }
  return url;
}

export default function AdminArtworksPage() {
  const [artworks, setArtworks] = useState<FirestoreArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArtworkForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "media" | "seo">("details");

  const fetchArtworks = useCallback(async () => {
    try {
      const data = await getArtworksFast();
      setArtworks(data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const openNewForm = () => {
    setForm({ ...emptyForm, order: artworks.length });
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
    setActiveTab("details");
    setShowForm(true);
  };

  const openEditForm = (artwork: FirestoreArtwork) => {
    const isUrl = artwork.imageSource === "url" || (!artwork.image.startsWith("/") && !artwork.image.includes("firebasestorage"));
    setForm({
      title: artwork.title,
      slug: artwork.slug,
      artist: artwork.artist || "",
      size: artwork.size || "",
      medium: artwork.medium,
      description: artwork.description || "",
      bulletPoints: artwork.bulletPoints?.join("\n") || "",
      vastuEffect: artwork.vastuEffect || "",
      vastuPlacement: artwork.vastuPlacement?.join("\n") || "",
      symbolism: artwork.symbolism || [],
      image: artwork.image,
      imageUrl: isUrl ? artwork.image : "",
      imageMode: artwork.imageSource || "upload",
      published: artwork.published ?? true,
      isAvailable: artwork.isAvailable ?? true,
      collection: artwork.collection || "",
      price: artwork.price || "",
      order: artwork.order,
    });
    setEditingId(artwork.id || null);
    setImageFile(null);
    setImagePreview(artwork.image);
    setActiveTab("details");
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: editingId ? prev.slug : slugify(title),
    }));
  };

  const addSymbolismItem = () => {
    setForm((prev) => ({
      ...prev,
      symbolism: [...prev.symbolism, { label: "", text: "" }],
    }));
  };

  const updateSymbolismItem = (index: number, field: "label" | "text", value: string) => {
    setForm((prev) => ({
      ...prev,
      symbolism: prev.symbolism.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeSymbolismItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      symbolism: prev.symbolism.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.medium) {
      alert("Title and Medium are required.");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.image;

      if (form.imageMode === "url" && form.imageUrl) {
        imageUrl = convertGoogleDriveUrl(form.imageUrl.trim());
      } else if (form.imageMode === "upload" && imageFile) {
        imageUrl = await uploadImageWithRetry(imageFile, "artworks");
      }

      const bp = form.bulletPoints.split("\n").filter((s) => s.trim());
      const vp = form.vastuPlacement.split("\n").filter((s) => s.trim());
      const sym = form.symbolism.filter((s) => s.label && s.text);

      const artworkData: Record<string, unknown> = {
        title: form.title,
        slug: form.slug,
        medium: form.medium,
        description: form.description || "",
        image: imageUrl,
        imageSource: form.imageMode,
        published: form.published,
        isAvailable: form.isAvailable,
        order: form.order,
        artist: form.artist || "",
        size: form.size || "",
        collection: form.collection || "",
        price: form.price || "",
        bulletPoints: bp.length > 0 ? bp : [],
        vastuEffect: form.vastuEffect || "",
        vastuPlacement: vp.length > 0 ? vp : [],
        symbolism: sym.length > 0 ? sym : [],
      };

      if (editingId) {
        await updateArtwork(editingId, artworkData as Partial<FirestoreArtwork>);
        setArtworks((prev) =>
          prev.map((a) => a.id === editingId ? { ...a, ...artworkData } as FirestoreArtwork : a)
        );
      } else {
        const created = await addArtwork(artworkData as unknown as FirestoreArtwork);
        setArtworks((prev) => [...prev, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      setImageFile(null);
      setImagePreview("");
    } catch (error: any) {
      console.error("Error saving artwork:", error);
      alert(error.message || "Failed to save artwork. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    setDeleting(id);
    try {
      await deleteArtwork(id);
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      setDeleting(null);
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork.");
      setDeleting(null);
    }
  };

  const togglePublished = async (artwork: FirestoreArtwork) => {
    if (!artwork.id) return;
    // Optimistic: toggle in local state immediately
    setArtworks((prev) =>
      prev.map((a) => a.id === artwork.id ? { ...a, published: !a.published } : a)
    );
    try {
      await updateArtwork(artwork.id, { published: !artwork.published });
    } catch (error) {
      console.error("Error toggling publish:", error);
      // Revert on error
      setArtworks((prev) =>
        prev.map((a) => a.id === artwork.id ? { ...a, published: artwork.published } : a)
      );
    }
  };

  const toggleAvailable = async (artwork: FirestoreArtwork) => {
    if (!artwork.id) return;
    // Optimistic: toggle in local state immediately
    setArtworks((prev) =>
      prev.map((a) => a.id === artwork.id ? { ...a, isAvailable: !a.isAvailable } : a)
    );
    try {
      await updateArtwork(artwork.id, { isAvailable: !artwork.isAvailable });
    } catch (error) {
      console.error("Error toggling availability:", error);
      // Revert on error
      setArtworks((prev) =>
        prev.map((a) => a.id === artwork.id ? { ...a, isAvailable: artwork.isAvailable } : a)
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

  const tabs = [
    { id: "details" as const, label: "Details" },
    { id: "media" as const, label: "Media & Image" },
    { id: "seo" as const, label: "Vastu & Symbolism" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Artworks</h2>
          <p className="text-sm text-gray-500 mt-1">{artworks.length} artwork{artworks.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Artwork
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 my-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Artwork" : "Add New Artwork"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* ─── DETAILS TAB ─── */}
              {activeTab === "details" && (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Artwork title"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">/artwork/</span>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Artist */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                    <input
                      type="text"
                      value={form.artist}
                      onChange={(e) => setForm((p) => ({ ...p, artist: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="By Arunima Jain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medium *</label>
                      <input
                        type="text"
                        value={form.medium}
                        onChange={(e) => setForm((p) => ({ ...p, medium: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Acrylic on canvas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                      <input
                        type="text"
                        value={form.size}
                        onChange={(e) => setForm((p) => ({ ...p, size: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder='24" by 24"'
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Collection</label>
                      <input
                        type="text"
                        value={form.collection}
                        onChange={(e) => setForm((p) => ({ ...p, collection: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="e.g. Abstract Expressions"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={form.price}
                        onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="₹15,000 or Contact for price"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Artwork description — tell the story behind this piece"
                    />
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Points <span className="font-normal text-gray-400">(one per line)</span>
                    </label>
                    <textarea
                      value={form.bulletPoints}
                      onChange={(e) => setForm((p) => ({ ...p, bulletPoints: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder={"Calm amidst chaos\nBalance of energies\nMindfulness and inner strength"}
                    />
                  </div>

                  {/* Published + Available + Order */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600" />
                        </label>
                        <span className="text-sm text-gray-700">{form.published ? "Published" : "Draft"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.isAvailable}
                            onChange={(e) => setForm((p) => ({ ...p, isAvailable: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                        <span className="text-sm text-gray-700">{form.isAvailable ? "Available for Sale" : "Not Available"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Order:</label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                        className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ─── MEDIA TAB ─── */}
              {activeTab === "media" && (
                <>
                  {/* Image source toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Source</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, imageMode: "upload" }))}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors ${form.imageMode === "upload"
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, imageMode: "url" }))}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors ${form.imageMode === "url"
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <Link2 className="w-4 h-4" />
                        Paste URL
                      </button>
                    </div>
                  </div>

                  {form.imageMode === "upload" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image <span className="font-normal text-gray-400">(JPG, PNG, WebP, SVG, GIF, AVIF, HEIC)</span>
                      </label>
                      <div className="flex items-start gap-4">
                        {imagePreview && (
                          <div className="relative">
                            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />
                            <button
                              type="button"
                              onClick={() => { setImageFile(null); setImagePreview(""); setForm((p) => ({ ...p, image: "" })); }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500 text-center px-2">Click to browse or drag & drop</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif,image/avif,image/heic,image/heif,image/tiff,image/bmp"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL <span className="font-normal text-gray-400">(Google Drive, direct link, etc.)</span>
                      </label>
                      <input
                        type="url"
                        value={form.imageUrl}
                        onChange={(e) => {
                          const url = e.target.value;
                          setForm((p) => ({ ...p, imageUrl: url }));
                          if (url.trim()) {
                            setImagePreview(convertGoogleDriveUrl(url.trim()));
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="https://drive.google.com/file/d/... or any direct image URL"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">
                        Google Drive links are automatically converted to direct image URLs.
                      </p>
                      {imagePreview && form.imageUrl && (
                        <div className="mt-3 relative inline-block">
                          <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-lg border" />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* ─── VASTU & SYMBOLISM TAB ─── */}
              {activeTab === "seo" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vastu Effect</label>
                    <textarea
                      value={form.vastuEffect}
                      onChange={(e) => setForm((p) => ({ ...p, vastuEffect: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Describe the vastu effect of this painting..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vastu Placement <span className="font-normal text-gray-400">(one per line)</span>
                    </label>
                    <textarea
                      value={form.vastuPlacement}
                      onChange={(e) => setForm((p) => ({ ...p, vastuPlacement: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder={"South wall (most powerful choice)\nSouth-East corner\nHome office / workspace"}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Symbolism</label>
                      <button type="button" onClick={addSymbolismItem} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        + Add Item
                      </button>
                    </div>
                    {form.symbolism.length === 0 && (
                      <p className="text-xs text-gray-400 mb-2">No symbolism items yet. Click &quot;+ Add Item&quot; above.</p>
                    )}
                    {form.symbolism.map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateSymbolismItem(i, "label", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Label (e.g. Cow and calf)"
                        />
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => updateSymbolismItem(i, "text", e.target.value)}
                          className="flex-[2] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Meaning (e.g. Prosperity, abundance)"
                        />
                        <button type="button" onClick={() => removeSymbolismItem(i)} className="p-2 text-red-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {form.published ? (
                  <span className="flex items-center gap-1 text-green-600"><Eye className="w-3.5 h-3.5" /> Will be visible on site</span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-600"><EyeOff className="w-3.5 h-3.5" /> Saved as draft</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Saving...</>
                  ) : (
                    editingId ? "Update Artwork" : "Create Artwork"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artworks Table */}
      {artworks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks yet</h3>
          <p className="text-sm text-gray-500 mb-6">Get started by adding your first artwork.</p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Artwork
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medium</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artworks.map((artwork) => (
                <tr key={artwork.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {artwork.image ? (
                      <img src={artwork.image} alt={artwork.title} className="w-16 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{artwork.title}</p>
                    <p className="text-xs text-gray-500">{artwork.size || artwork.collection || ""}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{artwork.medium}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(artwork)}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer ${artwork.published !== false
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                    >
                      {artwork.published !== false ? (
                        <><Eye className="w-3 h-3" /> Live</>
                      ) : (
                        <><EyeOff className="w-3 h-3" /> Draft</>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAvailable(artwork)}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer ${artwork.isAvailable !== false
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                      {artwork.isAvailable !== false ? "For Sale" : "Not Available"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{artwork.order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/artwork/${artwork.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                        title="View on site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => openEditForm(artwork)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => artwork.id && handleDelete(artwork.id)}
                        disabled={deleting === artwork.id}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === artwork.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

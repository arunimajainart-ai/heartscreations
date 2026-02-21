"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Link2, ExternalLink, FileText, Tag, Search, Image as ImageIcon, Calendar, User } from "lucide-react";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  uploadImageWithRetry,
  FirestoreBlog,
} from "@/lib/firestore";

type ImageMode = "upload" | "url";

interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  imageUrl: string;
  imageMode: ImageMode;
  published: boolean;
  date: string;
  author: string;
  tags: string;
  category: string;
  metaDescription: string;
}

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  imageUrl: "",
  imageMode: "upload",
  published: false,
  date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  author: "Arunima Jain",
  tags: "",
  category: "",
  metaDescription: "",
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

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function readingTime(text: string): string {
  const words = wordCount(text);
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "media" | "seo">("content");

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const fetchBlogs = useCallback(async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const publishedCount = useMemo(() => blogs.filter((b) => b.published).length, [blogs]);
  const draftCount = useMemo(() => blogs.filter((b) => !b.published).length, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" ? true : filter === "published" ? blog.published : !blog.published;
      return matchesSearch && matchesFilter;
    });
  }, [blogs, searchQuery, filter]);

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
    setActiveTab("content");
    setShowForm(true);
  };

  const openEditForm = (blog: FirestoreBlog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      imageUrl: blog.imageSource === "url" ? blog.image : "",
      imageMode: blog.imageSource || "upload",
      published: blog.published,
      date: blog.date,
      author: blog.author || "Arunima Jain",
      tags: blog.tags?.join(", ") || "",
      category: blog.category || "",
      metaDescription: blog.metaDescription || "",
    });
    setEditingId(blog.id || null);
    setImageFile(null);
    setImagePreview(blog.image);
    setActiveTab("content");
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

  const handleSave = async () => {
    if (!form.title || !form.excerpt) {
      alert("Title and Excerpt are required.");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.image;

      if (form.imageMode === "url" && form.imageUrl) {
        imageUrl = convertGoogleDriveUrl(form.imageUrl.trim());
      } else if (form.imageMode === "upload" && imageFile) {
        imageUrl = await uploadImageWithRetry(imageFile, "blogs");
      }

      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const blogData: Record<string, unknown> = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        image: imageUrl || "",
        imageSource: form.imageMode,
        published: form.published,
        date: form.date,
        author: form.author || "Arunima Jain",
        tags: tags.length > 0 ? tags : [],
        category: form.category || "",
        metaDescription: form.metaDescription || "",
      };

      if (editingId) {
        await updateBlog(editingId, blogData as Partial<FirestoreBlog>);
        setBlogs((prev) =>
          prev.map((b) => b.id === editingId ? { ...b, ...blogData } as FirestoreBlog : b)
        );
      } else {
        const created = await addBlog(blogData as unknown as FirestoreBlog);
        setBlogs((prev) => [created, ...prev]);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      setImageFile(null);
      setImagePreview("");
    } catch (error: any) {
      console.error("Error saving blog:", error);
      alert(error.message || "Failed to save blog post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setDeleting(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post.");
      setDeleting(null);
    }
  };

  const togglePublished = async (blog: FirestoreBlog) => {
    if (!blog.id) return;
    setBlogs((prev) =>
      prev.map((b) => b.id === blog.id ? { ...b, published: !b.published } : b)
    );
    try {
      await updateBlog(blog.id, { published: !blog.published });
    } catch (error) {
      console.error("Error toggling publish:", error);
      setBlogs((prev) =>
        prev.map((b) => b.id === blog.id ? { ...b, published: blog.published } : b)
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
    { id: "content" as const, label: "Content" },
    { id: "media" as const, label: "Cover Image" },
    { id: "seo" as const, label: "SEO & Meta" },
  ];

  return (
    <div>
      {/* Header section with Title and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Blog Posts</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="font-medium text-gray-900">{publishedCount}</span> published
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="font-medium text-gray-900">{draftCount}</span> draft{draftCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex bg-gray-100 p-1 rounded-lg shrink-0 w-full sm:w-auto">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all capitalize ${filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs by title or excerpt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Form Modal (Enhanced) */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl min-h-screen sm:min-h-0 relative flex flex-col my-auto origin-center animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/80 sticky top-0 z-10 backdrop-blur-md rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {editingId ? "Edit Post" : "New Post"}
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm mr-4 hidden sm:flex">
                  <span className={`w-2 h-2 rounded-full ${form.published ? 'bg-green-500' : 'bg-yellow-400'}`} />
                  <span className="text-gray-600 font-medium">{form.published ? 'Published' : 'Draft'}</span>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="hidden sm:flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Saving...</>
                  ) : (
                    "Save Post"
                  )}
                </button>
                <button onClick={() => setShowForm(false)} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[70vh]">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-48 lg:w-56 shrink-0 bg-gray-50/50 border-r border-gray-100 flex flex-row md:flex-col p-4 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal ${activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200/60"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 border border-transparent"
                      }`}
                  >
                    {tab.id === 'content' && <FileText className="w-4 h-4" />}
                    {tab.id === 'media' && <ImageIcon className="w-4 h-4" />}
                    {tab.id === 'seo' && <Search className="w-4 h-4" />}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Editing Area */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-3xl mx-auto p-6 sm:p-8 space-y-8">
                  {/* ─── CONTENT TAB ─── */}
                  {activeTab === "content" && (
                    <div className="space-y-6">
                      <div>
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          className="w-full text-3xl sm:text-4xl font-bold text-gray-900 placeholder:text-gray-300 border-none focus:ring-0 px-0 mb-2 focus:outline-none"
                          placeholder="Post Title..."
                        />
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-400">/blog/</span>
                            <input
                              type="text"
                              value={form.slug}
                              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                              className="w-48 border-b border-dashed border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent px-1 py-0.5 transition-colors"
                              placeholder="url-slug"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <input
                              type="text"
                              value={form.author}
                              onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                              className="w-32 border-b border-dashed border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent px-1 py-0.5"
                              placeholder="Author name"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <input
                              type="text"
                              value={form.date}
                              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                              className="w-32 border-b border-dashed border-gray-300 focus:border-gray-900 focus:outline-none bg-transparent px-1 py-0.5"
                              placeholder="January 2025"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-gray-100" />

                      {/* Excerpt */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Excerpt / Subtitle</label>
                          <span className={`text-xs ${form.excerpt.length > 280 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{form.excerpt.length}/300</span>
                        </div>
                        <textarea
                          value={form.excerpt}
                          onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                          rows={2}
                          maxLength={300}
                          className="w-full text-lg sm:text-xl text-gray-600 font-medium placeholder:text-gray-300 border-none focus:ring-0 px-0 resize-none focus:outline-none outline-none"
                          placeholder="Write a captivating short description..."
                        />
                      </div>

                      {/* Content Section */}
                      <div>
                        <div className="flex items-center justify-between mb-4 mt-8">
                          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" /> Body Content
                          </label>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                            {wordCount(form.content)} words · {readingTime(form.content)}
                          </span>
                        </div>
                        <textarea
                          value={form.content}
                          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                          rows={16}
                          className="w-full text-base sm:text-lg text-gray-800 leading-relaxed placeholder:text-gray-300 border border-gray-200 focus:border-gray-400 rounded-xl p-4 sm:p-6 focus:ring-4 focus:ring-gray-100 transition-all font-serif resize-y focus:outline-none outline-none"
                          placeholder={`Start writing your story here...\n\nLeave a blank line between paragraphs to separate them.`}
                        />
                      </div>
                    </div>
                  )}

                  {/* ─── COVER IMAGE TAB ─── */}
                  {activeTab === "media" && (
                    <div className="space-y-8 max-w-2xl">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Cover Image</h4>
                        <p className="text-sm text-gray-500 mb-6">This image will appear at the top of your post and on link previews.</p>

                        <div className="flex bg-gray-100 p-1 rounded-lg w-max mb-6">
                          <button
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, imageMode: "upload" }))}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${form.imageMode === "upload" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                              }`}
                          >
                            <Upload className="w-4 h-4" /> Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, imageMode: "url" }))}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${form.imageMode === "url" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                              }`}
                          >
                            <Link2 className="w-4 h-4" /> Web Link
                          </button>
                        </div>

                        {form.imageMode === "upload" ? (
                          <div className="space-y-4">
                            {imagePreview ? (
                              <div className="relative rounded-2xl overflow-hidden border border-gray-200 group">
                                <img src={imagePreview} alt="Preview" className="w-full aspect-[16/10] object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                  <button
                                    type="button"
                                    onClick={() => { setImageFile(null); setImagePreview(""); setForm((p) => ({ ...p, image: "" })); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-lg"
                                  >
                                    <Trash2 className="w-4 h-4" /> Remove Image
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full aspect-[16/10] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                                <div className="p-4 bg-gray-100 rounded-full mb-3">
                                  <Upload className="w-8 h-8 text-gray-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Click to upload image</span>
                                <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP formats</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <input
                              type="url"
                              value={form.imageUrl}
                              onChange={(e) => {
                                const url = e.target.value;
                                setForm((p) => ({ ...p, imageUrl: url }));
                                if (url.trim()) setImagePreview(convertGoogleDriveUrl(url.trim()));
                              }}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all outline-none"
                              placeholder="Paste image URL (Google Drive supported)"
                            />
                            {imagePreview && form.imageUrl && (
                              <div className="relative rounded-2xl overflow-hidden border border-gray-200 select-none">
                                <img src={imagePreview} alt="Preview" className="w-full aspect-[16/10] object-cover pointer-events-none" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category / Collection</label>
                        <input
                          type="text"
                          value={form.category}
                          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                          placeholder="e.g. Exhibitions, Inspiration..."
                        />
                      </div>
                    </div>
                  )}

                  {/* ─── SEO TAB ─── */}
                  {activeTab === "seo" && (
                    <div className="space-y-8 max-w-2xl">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Search Engine Optimization</h4>
                        <p className="text-sm text-gray-500 mb-6">Control how your post appears on Google and social media.</p>

                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <div className="relative">
                          <textarea
                            value={form.metaDescription}
                            onChange={(e) => setForm((p) => ({ ...p, metaDescription: e.target.value }))}
                            rows={3}
                            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none outline-none ${form.metaDescription.length > 160 ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'}`}
                            placeholder="An engaging description for search engines..."
                          />
                          <div className={`absolute bottom-3 right-3 text-xs font-medium px-2 py-0.5 rounded-md ${form.metaDescription.length > 160 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                            {form.metaDescription.length}/160
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <input
                          type="text"
                          value={form.tags}
                          onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all mb-3 outline-none"
                          placeholder="art, painting, collection (comma separated)"
                        />
                        {form.tags && (
                          <div className="flex flex-wrap gap-2">
                            {form.tags.split(",").map((tag, i) => tag.trim() && (
                              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full shadow-sm">
                                <Tag className="w-3 h-3" /> {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Google Search Preview</label>
                        <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm font-sans">
                          <p className="text-[#1a0dab] text-xl font-medium truncate mb-1 hover:underline cursor-pointer">
                            {form.title || "Blog Post Title"} | Hearts Creations
                          </p>
                          <p className="text-[#006621] text-sm mb-2 flex items-center gap-1">
                            heartscreations.com <span className="text-gray-500">› blog › {form.slug || "post-slug"}</span>
                          </p>
                          <p className="text-[#4d5156] text-sm line-clamp-2 leading-snug">
                            {form.metaDescription || form.excerpt || "Please enter a meta description or excerpt to see the search engine preview..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile / Sticky Footer */}
            <div className="border-t border-gray-100 bg-white p-4 flex sm:hidden flex-col gap-4 rounded-b-2xl">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-gray-500 font-medium">{activeTab.toUpperCase()} TAB</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className={`text-sm font-medium ${form.published ? 'text-green-600' : 'text-gray-500'}`}>{form.published ? 'Published' : 'Draft'}</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <input type="checkbox" className="sr-only" checked={form.published} onChange={(e) => setForm(p => ({ ...p, published: e.target.checked }))} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.published ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Post"}
              </button>
            </div>

            {/* Desktop Publish Toggle Floating */}
            <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2 z-20">
              <span className={`text-sm font-bold ${form.published ? 'text-green-600' : 'text-gray-500'}`}>{form.published ? 'Published' : 'Draft'}</span>
              <div className="w-px h-4 bg-gray-200" />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
              </label>
            </div>

          </div>
        </div>
      )}

      {/* Empty State / No Matches */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 sm:p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
            {searchQuery || filter !== "all" ? (
              <Search className="w-8 h-8 text-gray-300" />
            ) : (
              <FileText className="w-8 h-8 text-gray-300" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchQuery || filter !== "all" ? "No matches found" : "No stories yet"}
          </h3>
          <p className="text-gray-500 font-medium mb-8 max-w-sm">
            {searchQuery || filter !== "all"
              ? "We couldn't find any posts matching your current filters. Try adjusting them."
              : "Start sharing your journey, exhibitions, and inspiration with the world."}
          </p>
          {(searchQuery || filter !== "all") ? (
            <button
              onClick={() => { setSearchQuery(""); setFilter("all"); }}
              className="text-gray-900 font-medium hover:underline hover:text-indigo-600 transition-colors"
            >
              Clear filters
            </button>
          ) : (
            <button
              onClick={openNewForm}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" /> Write First Post
            </button>
          )}
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative pb-14 min-h-[400px]">
              {/* Card Image Wrapper */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => openEditForm(blog)}>
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md backdrop-blur-md text-white shadow-sm border border-white/20 ${blog.published ? 'bg-green-500/90' : 'bg-yellow-500/90 text-yellow-900 border-yellow-200'}`}>
                    {blog.published ? 'Live' : 'Draft'}
                  </span>
                </div>

                {/* Category Badge gradient overlay */}
                {blog.category && (
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent w-full p-4 pt-12 z-10">
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-md">{blog.category}</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-400 font-medium mb-3 gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {blog.date}
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="truncate">{blog.author}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => openEditForm(blog)}>
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100">
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-gray-400 text-[10px] font-bold">+{blog.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Ribbon - Absolute positioned at very bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-gray-100 bg-gray-50/50 flex divide-x divide-gray-200">
                <button
                  onClick={() => togglePublished(blog)}
                  className="flex-[1.5] flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
                >
                  {blog.published ? (
                    <><EyeOff className="w-4 h-4 text-gray-400" /> Unpublish</>
                  ) : (
                    <><Eye className="w-4 h-4 text-green-500" /> Publish</>
                  )}
                </button>
                {blog.published && (
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-indigo-600 hover:bg-white transition-colors group/view"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover/view:text-indigo-500 transition-colors" /> View
                  </a>
                )}
                <button
                  onClick={() => openEditForm(blog)}
                  className="flex-1 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors group/btn"
                  title="Edit Post"
                >
                  <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => blog.id && handleDelete(blog.id)}
                  disabled={deleting === blog.id}
                  className="flex-1 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Delete Post"
                >
                  {deleting === blog.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

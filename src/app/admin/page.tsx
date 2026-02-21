"use client";

import { useEffect, useState } from "react";
import { ImageIcon, FileText } from "lucide-react";
import Link from "next/link";
import { getArtworks, getArtworksFast, getBlogs, FirestoreArtwork, FirestoreBlog } from "@/lib/firestore";

export default function AdminDashboardPage() {
  const [artworks, setArtworks] = useState<FirestoreArtwork[]>([]);
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fast fetch from local cache first (instant after seed)
        const [artworksData, blogsData] = await Promise.all([
          getArtworksFast(),
          getBlogs(),
        ]);
        setArtworks(artworksData);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
      // Background refresh from server to ensure freshness
      getArtworks().then(setArtworks).catch(() => {});
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const stats = [
    {
      label: "Artworks",
      count: artworks.length,
      icon: ImageIcon,
      href: "/admin/artworks",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Blog Posts",
      count: blogs.length,
      icon: FileText,
      href: "/admin/blogs",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>

      {/* Empty state alert */}
      {artworks.length === 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5 mb-6 flex items-start gap-3">
          <ImageIcon className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
          <div className="text-sm text-amber-900">
            <p className="font-bold text-base mb-1">
              No artworks in Firestore yet!
            </p>
            <p className="text-amber-700 mb-3">
              Your website pages will appear empty until artwork data is seeded.
              Go to the Seed Data page to push Arunima&apos;s artworks to the database.
            </p>
            <Link
              href="/admin/seed"
              className="inline-flex items-center gap-2 px-5 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Go to Seed Data →
            </Link>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.count}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Artworks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Artworks</h3>
          <Link href="/admin/artworks" className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </Link>
        </div>
        {artworks.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No artworks yet. Add your first artwork!</p>
        ) : (
          <div className="space-y-3">
            {artworks.slice(0, 5).map((artwork) => (
              <div key={artwork.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                {artwork.image && (
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{artwork.title}</p>
                  <p className="text-xs text-gray-500">{artwork.medium}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Blog Posts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Blog Posts</h3>
          <Link href="/admin/blogs" className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </Link>
        </div>
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No blog posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-3">
            {blogs.slice(0, 5).map((blog) => (
              <div key={blog.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{blog.title}</p>
                  <p className="text-xs text-gray-500">{blog.date}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    blog.published
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

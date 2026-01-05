"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { artworks, collections } from "@/data/artworks";
import ArtworkCard from "@/components/ui/ArtworkCard";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredArtworks =
    activeFilter === "all"
      ? artworks
      : artworks.filter((a) => a.collectionSlug === activeFilter);

  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Complete Collection
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-6">
            Portfolio
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Explore the complete collection of original artworks. Each piece is a 
            unique expression of emotion, tradition, and contemporary vision.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2.5 text-sm tracking-wider uppercase border transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-900"
            }`}
          >
            All Works
          </button>
          {collections.map((collection) => (
            <button
              key={collection.slug}
              onClick={() => setActiveFilter(collection.slug)}
              className={`px-5 py-2.5 text-sm tracking-wider uppercase border transition-all duration-300 ${
                activeFilter === collection.slug
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-900"
              }`}
            >
              {collection.name}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Artworks Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArtworks.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-stone-500">No artworks found in this collection.</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

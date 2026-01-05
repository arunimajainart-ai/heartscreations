"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections, getArtworksByCollection } from "@/data/artworks";

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Curated Series
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-6">
            Collections
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Each collection represents a distinct journey through emotion, tradition, 
            and artistic exploration. Discover the stories behind every series.
          </p>
        </motion.div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-24">
          {collections.map((collection, index) => {
            const collectionArtworks = getArtworksByCollection(collection.slug);
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                {/* Image */}
                <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={collection.coverImage}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border border-rose-200/30 pointer-events-none" />
                </div>

                {/* Content */}
                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <p className="text-rose-600 text-xs tracking-[0.3em] uppercase mb-4">
                    {collection.tagline}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-6">
                    {collection.name}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-8">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-3xl font-light text-stone-900">
                        {collectionArtworks.length}
                      </p>
                      <p className="text-xs text-stone-500 tracking-wider uppercase">
                        Artworks
                      </p>
                    </div>
                    <div className="w-px h-12 bg-stone-200" />
                    <div className="text-center">
                      <p className="text-3xl font-light text-stone-900">
                        {new Set(collectionArtworks.map((a) => a.technique)).size}
                      </p>
                      <p className="text-xs text-stone-500 tracking-wider uppercase">
                        Techniques
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white text-sm tracking-wider uppercase hover:bg-rose-700 transition-colors group"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

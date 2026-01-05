"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCollectionBySlug, getArtworksByCollection } from "@/data/artworks";
import ArtworkCard from "@/components/ui/ArtworkCard";
import { notFound } from "next/navigation";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = use(params);
  const collection = getCollectionBySlug(slug);
  const artworks = getArtworksByCollection(slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-stone-900/30" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm tracking-wider uppercase">All Collections</span>
              </Link>
              <p className="text-rose-300 text-sm tracking-[0.3em] uppercase mb-4">
                {collection.tagline}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
                {collection.name}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-stone-600 leading-relaxed max-w-3xl"
        >
          {collection.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-8 mt-8"
        >
          <div>
            <p className="text-3xl font-light text-stone-900">{artworks.length}</p>
            <p className="text-sm text-stone-500 tracking-wider uppercase">Artworks</p>
          </div>
          <div className="w-px h-12 bg-stone-200" />
          <div>
            <p className="text-3xl font-light text-stone-900">
              {new Set(artworks.map((a) => a.technique)).size}
            </p>
            <p className="text-sm text-stone-500 tracking-wider uppercase">Techniques</p>
          </div>
        </motion.div>
      </section>

      {/* Artworks Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500">No artworks in this collection yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

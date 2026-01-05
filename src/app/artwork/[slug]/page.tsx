"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Expand, Share2, Heart } from "lucide-react";
import { getArtworkBySlug, getArtworksByCollection } from "@/data/artworks";
import ImageModal from "@/components/ui/ImageModal";
import ArtworkCard from "@/components/ui/ArtworkCard";
import { notFound } from "next/navigation";

interface ArtworkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const { slug } = use(params);
  const artwork = getArtworkBySlug(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!artwork) {
    notFound();
  }

  const relatedArtworks = getArtworksByCollection(artwork.collectionSlug)
    .filter((a) => a.id !== artwork.id)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wider uppercase">Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square bg-stone-100 overflow-hidden group cursor-pointer"
                 onClick={() => setIsModalOpen(true)}>
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors flex items-center justify-center">
                <div className="p-4 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-6 h-6 text-stone-700" />
                </div>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-3 text-center">
              Click to view full size
            </p>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href={`/collections/${artwork.collectionSlug}`}
              className="text-rose-600 text-xs tracking-[0.3em] uppercase hover:text-rose-700 transition-colors"
            >
              {artwork.collection}
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 mt-4 mb-6">
              {artwork.title}
            </h1>

            <p className="text-xl text-stone-500 italic mb-8">
              &ldquo;{artwork.essence}&rdquo;
            </p>

            {/* Metadata */}
            <div className="border-t border-b border-stone-200 py-6 mb-8">
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs text-stone-400 tracking-wider uppercase mb-1">Size</dt>
                  <dd className="text-stone-900">{artwork.size}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-400 tracking-wider uppercase mb-1">Medium</dt>
                  <dd className="text-stone-900">{artwork.medium}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-400 tracking-wider uppercase mb-1">Year</dt>
                  <dd className="text-stone-900">{artwork.year}</dd>
                </div>
                <div>
                  <dt className="text-xs text-stone-400 tracking-wider uppercase mb-1">Technique</dt>
                  <dd className="text-stone-900">{artwork.technique}</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="mb-8">
                <h3 className="text-sm text-stone-400 tracking-wider uppercase mb-3">
                  About This Work
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Vastu Placement */}
            {artwork.vastuPlacement && (
              <div className="bg-rose-50 border border-rose-100 p-6 mb-8">
                <h3 className="text-sm text-rose-700 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full" />
                  Vastu & Placement Guide
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {artwork.vastuPlacement}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="flex-1 min-w-[200px] py-4 bg-stone-900 text-white text-sm tracking-wider uppercase text-center hover:bg-rose-700 transition-colors"
              >
                Inquire About This Piece
              </Link>
              <button
                className="p-4 border border-stone-300 text-stone-600 hover:border-rose-500 hover:text-rose-600 transition-colors"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                className="p-4 border border-stone-300 text-stone-600 hover:border-rose-500 hover:text-rose-600 transition-colors"
                aria-label="Share artwork"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Works */}
        {relatedArtworks.length > 0 && (
          <section className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-light text-stone-900 mb-8">
                More from {artwork.collection}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedArtworks.map((relatedArtwork, index) => (
                  <ArtworkCard
                    key={relatedArtwork.id}
                    artwork={relatedArtwork}
                    index={index}
                    variant="compact"
                  />
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={artwork.image}
        alt={artwork.title}
        title={artwork.title}
      />
    </div>
  );
}

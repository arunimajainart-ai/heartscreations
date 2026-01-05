"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Expand, ArrowUpRight } from "lucide-react";
import { Artwork } from "@/data/artworks";
import ImageModal from "./ImageModal";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  variant?: "default" | "compact" | "detailed";
}

export default function ArtworkCard({
  artwork,
  index = 0,
  variant = "default",
}: ArtworkCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === "compact") {
    return (
      <>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/artwork/${artwork.slug}`} className="block">
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-medium text-stone-900 group-hover:text-rose-700 transition-colors">
                {artwork.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{artwork.medium}</p>
            </div>
          </Link>
        </motion.article>
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          src={artwork.image}
          alt={artwork.title}
          title={artwork.title}
        />
      </>
    );
  }

  if (variant === "detailed") {
    return (
      <>
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-500"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto overflow-hidden bg-stone-100">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-rose-600 transition-colors rounded-full opacity-0 group-hover:opacity-100"
                aria-label="View full size"
              >
                <Expand className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-rose-600 text-xs tracking-[0.2em] uppercase mb-2">
                {artwork.collection}
              </p>
              <h3 className="text-2xl font-light text-stone-900 mb-4">
                {artwork.title}
              </h3>
              <div className="space-y-2 text-sm text-stone-600 mb-6">
                <p><span className="text-stone-400">Size:</span> {artwork.size}</p>
                <p><span className="text-stone-400">Medium:</span> {artwork.medium}</p>
                <p><span className="text-stone-400">Year:</span> {artwork.year}</p>
                <p><span className="text-stone-400">Technique:</span> {artwork.technique}</p>
              </div>
              <p className="text-stone-500 italic mb-6">&ldquo;{artwork.essence}&rdquo;</p>
              <Link
                href={`/artwork/${artwork.slug}`}
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors group/link"
              >
                <span className="text-sm tracking-wider uppercase">View Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.article>
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          src={artwork.image}
          alt={artwork.title}
          title={artwork.title}
        />
      </>
    );
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-4 bg-white/90 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-rose-600 transition-colors rounded-full"
              aria-label="View full size"
            >
              <Expand className="w-5 h-5" />
            </button>
            <Link
              href={`/artwork/${artwork.slug}`}
              className="p-4 bg-white/90 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-rose-600 transition-colors rounded-full"
              aria-label="View artwork details"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Bottom Info on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white/80 text-sm italic">&ldquo;{artwork.essence}&rdquo;</p>
          </div>
        </div>

        {/* Artwork Info */}
        <Link href={`/artwork/${artwork.slug}`} className="block mt-5">
          <p className="text-rose-600 text-xs tracking-[0.15em] uppercase mb-2">
            {artwork.collection}
          </p>
          <h3 className="text-xl font-light text-stone-900 group-hover:text-rose-700 transition-colors">
            {artwork.title}
          </h3>
          <p className="text-sm text-stone-500 mt-2">
            {artwork.medium} · {artwork.size}
          </p>
        </Link>
      </motion.article>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={artwork.image}
        alt={artwork.title}
        title={artwork.title}
      />
    </>
  );
}

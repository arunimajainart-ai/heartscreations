"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useArtworks } from "@/lib/useFirestoreData";
import { ArtworkGridSkeleton } from "@/components/ui/Skeleton";

export default function AvailableWorksPage() {
  const { artworks, loading } = useArtworks(true, true);

  return (
    <div className="page-transition">
      {/* Title */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-[#333]"
          >
            Available works
          </motion.h1>
        </div>
      </section>

      {/* Individual Artworks Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <ArtworkGridSkeleton columns={3} />
          ) : artworks.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No artworks available yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/artwork/${artwork.slug}`}
                    className="group block relative aspect-[3/4] overflow-hidden"
                  >
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay with title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-end p-6 md:p-8">
                      <h2
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                        className="text-2xl md:text-3xl font-light text-white drop-shadow-lg"
                      >
                        {artwork.title}
                      </h2>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useArtworks } from "@/lib/useFirestoreData";
import { PortfolioGridSkeleton } from "@/components/ui/Skeleton";

export default function PortfolioPage() {
  const { artworks, loading } = useArtworks(true);

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
            Portfolio
          </motion.h1>
        </div>
      </section>

      {/* Two-column artwork grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <PortfolioGridSkeleton />
          ) : artworks.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No artworks in portfolio yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/artwork/${artwork.slug}`}
                    className="group block overflow-hidden"
                  >
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      width={800}
                      height={800}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="mt-4">
                    <p className="text-[15px] text-[#333] leading-relaxed">
                      <span className="font-medium">{artwork.title}.</span>
                      {" "}{artwork.medium}.{artwork.size ? ` ${artwork.size}` : ""}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

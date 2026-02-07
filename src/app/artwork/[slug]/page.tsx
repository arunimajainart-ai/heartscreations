"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Expand } from "lucide-react";
import { artworks, getArtworkBySlug } from "@/data/artworks";
import ImageModal from "@/components/ui/ImageModal";
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

  const otherArtworks = artworks
    .filter((a) => a.id !== artwork.id)
    .slice(0, 3);

  return (
    <div className="page-transition">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 md:pt-12 pb-20 md:pb-28">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[#999] hover:text-[#333] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back to Portfolio</span>
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative aspect-[4/5] bg-[#fafafa] overflow-hidden group cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                <div className="p-4 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-5 h-5 text-[#333]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="text-3xl md:text-4xl font-light text-[#333] mb-2"
            >
              {artwork.title}
            </h1>

            {artwork.artist && (
              <p className="text-[15px] text-[#666] mb-4">{artwork.artist}</p>
            )}

            {/* Metadata */}
            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <dl className="flex flex-col gap-3">
                {artwork.size && (
                  <div>
                    <dd className="text-[15px] text-[#333]">{artwork.size}</dd>
                  </div>
                )}
                <div>
                  <dd className="text-[15px] text-[#333]">{artwork.medium}</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-[15px] text-[#444] leading-[1.85] whitespace-pre-line">
                {artwork.description}
              </p>
            </div>

            {/* Bullet Points */}
            {artwork.bulletPoints && artwork.bulletPoints.length > 0 && (
              <ul className="list-disc list-inside mb-6 space-y-1">
                {artwork.bulletPoints.map((point, i) => (
                  <li key={i} className="text-[15px] text-[#444] leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* Vastu Effect */}
            {artwork.vastuEffect && (
              <div className="mb-8">
                <p className="text-[15px] text-[#444] leading-[1.85]">
                  {artwork.vastuEffect}
                </p>
              </div>
            )}

            {/* Vastu Placement */}
            {artwork.vastuPlacement && artwork.vastuPlacement.length > 0 && (
              <div className="bg-[#fafafa] border border-gray-100 p-6 mb-8">
                <h3 className="text-[13px] text-[#666] tracking-wide uppercase mb-3">
                  Best areas to place
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {artwork.vastuPlacement.map((place, i) => (
                    <li key={i} className="text-[14px] text-[#555] leading-relaxed">
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Symbolism */}
            {artwork.symbolism && artwork.symbolism.length > 0 && (
              <div className="bg-[#fafafa] border border-gray-100 p-6 mb-8">
                <ul className="space-y-2">
                  {artwork.symbolism.map((item, i) => (
                    <li key={i} className="text-[14px] text-[#555] leading-relaxed">
                      <span className="font-medium text-[#333]">{item.label}:</span> {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <Link
              href="/contact"
              className="inline-block py-3 px-8 bg-[#333] text-white text-[13px] tracking-wider uppercase text-center hover:bg-[#555] transition-colors"
            >
              Inquire About This Piece
            </Link>
          </motion.div>
        </div>

        {/* Other Works */}
        {otherArtworks.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <h2
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="text-2xl font-light text-[#333] mb-8"
            >
              Other Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherArtworks.map((relatedArtwork, index) => (
                <motion.div
                  key={relatedArtwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/artwork/${relatedArtwork.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={relatedArtwork.image}
                        alt={relatedArtwork.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-[14px] font-medium text-[#333] group-hover:text-[#666] transition-colors">
                        {relatedArtwork.title}
                      </h3>
                      <p className="text-[13px] text-[#999] mt-1">{relatedArtwork.medium}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedArtworks } from "@/data/artworks";

export default function FeaturedWorks() {
  const featuredArtworks = getFeaturedArtworks();

  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
              Selected Works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">View All Works</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Artworks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork, index) => (
            <motion.article
              key={artwork.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Link href={`/artwork/${artwork.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-stone-200">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
                  
                  {/* Quick info overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-stone-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/80 text-sm">{artwork.essence}</p>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-light text-stone-900 group-hover:text-rose-700 transition-colors">
                      {artwork.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-sm text-stone-500">
                    {artwork.medium} · {artwork.size}
                  </p>
                  <p className="text-xs text-rose-600 tracking-wider uppercase">
                    {artwork.collection}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

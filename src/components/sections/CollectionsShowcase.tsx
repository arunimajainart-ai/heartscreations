"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/artworks";

export default function CollectionsShowcase() {
  return (
    <section className="py-24 md:py-32 bg-white">
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
              Curated Series
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900">
              Selected Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">View Full Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.slice(0, 3).map((collection, index) => (
            <motion.article
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <Link href={`/collections/${collection.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <p className="text-rose-300 text-xs tracking-[0.2em] uppercase mb-2">
                      {collection.tagline}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {collection.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                      <span className="text-sm tracking-wider uppercase">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

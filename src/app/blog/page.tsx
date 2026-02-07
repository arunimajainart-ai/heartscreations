"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: "1",
    title: "The Journey Behind Sacred Energies Collection",
    excerpt:
      "Exploring the spiritual depth and artistic process behind the Nandi paintings that channel ancient protective energy into contemporary spaces.",
    date: "January 2025",
    image: "/nandi_art.webp",
    slug: "sacred-energies-journey",
  },
  {
    id: "2",
    title: "Abstract Expressions: Finding Calm in Chaos",
    excerpt:
      "How bold color collisions and emotional energy on canvas can transform a space and bring mindfulness to everyday life.",
    date: "December 2024",
    image: "/abstract_collection.webp",
    slug: "abstract-expressions-calm",
  },
  {
    id: "3",
    title: "The Art of Pichwai: Tradition Meets Contemporary Vision",
    excerpt:
      "A deep dive into the centuries-old Pichwai painting tradition and how it inspires my Divine Symmetry collection.",
    date: "November 2024",
    image: "/divine_art.webp",
    slug: "pichwai-tradition",
  },
];

export default function BlogPage() {
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
            Blog
          </motion.h1>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-[#999] mb-3">{post.date}</p>
                    <h2
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="text-xl md:text-2xl font-light text-[#333] mb-4 leading-snug"
                    >
                      {post.title}
                    </h2>
                    <p className="text-[15px] text-[#666] leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <span className="text-sm text-[#333] font-medium tracking-wide uppercase hover:text-[#666] transition-colors cursor-pointer">
                      Read More
                    </span>
                  </div>
                </div>
                {index < blogPosts.length - 1 && (
                  <div className="mt-16 border-b border-gray-100" />
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "@/lib/useFirestoreData";
import { BlogListSkeleton } from "@/components/ui/Skeleton";

export default function BlogPage() {
  const { blogs, loading } = useBlogs(true);

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
          {loading ? (
            <BlogListSkeleton />
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No blog posts yet.</p>
          ) : (
            <div className="space-y-16">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
                      {post.image && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 55vw"
                          />
                        </div>
                      )}
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
                  </Link>
                  {index < blogs.length - 1 && (
                    <div className="mt-16 border-b border-gray-100" />
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

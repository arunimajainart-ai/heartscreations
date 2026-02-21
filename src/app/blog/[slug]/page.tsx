"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { useBlogBySlug } from "@/lib/useFirestoreData";
import { Skeleton } from "@/components/ui/Skeleton";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

function estimateReadingTime(text: string): string {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function BlogDetailSkeleton() {
  return (
    <div className="page-transition">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-8 md:pt-12 pb-20 md:pb-28">
        <Skeleton className="h-4 w-24 mb-8" />
        <Skeleton className="h-3 w-16 mb-3" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="aspect-[16/9] w-full mb-10 rounded-none" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const { blog, loading } = useBlogBySlug(slug);

  const readTime = useMemo(
    () => (blog ? estimateReadingTime(blog.content) : ""),
    [blog]
  );

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!blog) {
    return (
      <div className="page-transition">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-8 md:pt-12 pb-20 md:pb-28 text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Blog post not found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-[#fafafa]">
      <article className="pt-12 md:pt-20 pb-24 md:pb-32">
        {/* Navigation & Breadcrumb */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mb-10 md:mb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#999] hover:text-[#333] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] relative top-px">Back to Journal</span>
          </Link>
        </div>

        {/* Masthead Header */}
        <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category */}
            {blog.category && (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888] mb-6">
                {blog.category}
              </p>
            )}

            <h1
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#111] mb-8 leading-[1.1] md:leading-[1.1] max-w-3xl mx-auto tracking-tight"
            >
              {blog.title}
            </h1>

            {/* Elegant By-line */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[13px] font-medium text-[#777] uppercase tracking-wider">
              <span>{blog.date}</span>
              {blog.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                  <span>By {blog.author}</span>
                </>
              )}
              {readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#ccc]" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 relative top-[-1px]" />
                    {readTime}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </header>

        {/* Dynamic Cover Image (Breaks out of text container) */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-md shadow-sm">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Constrained Editorial Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-[680px] mx-auto px-6 lg:px-8"
        >
          <div className="prose prose-lg md:prose-xl prose-gray max-w-none prose-p:text-[#3a3a3a] prose-p:leading-[1.8] md:prose-p:leading-[1.9] prose-p:mb-8 md:prose-p:mb-10 prose-headings:font-serif prose-headings:font-medium prose-headings:text-[#111] prose-a:text-[#111] hover:prose-a:text-gray-600 prose-a:transition-colors prose-a:underline-offset-4">
            {blog.content.split("\n\n").map((paragraph, i) => {
              // Option to apply a drop-cap class to the very first paragraph if desired, 
              // but relying on strong typography sizes ensures a clean look.
              return (
                <p
                  key={i}
                  className={`text-[17px] md:text-[19px] tracking-[-0.01em] ${i === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#111] first-line:tracking-normal" : ""}`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Sign-off line */}
          <div className="mt-16 pt-10 border-t border-gray-200 text-center">
            {blog.author && (
              <p style={{ fontFamily: "var(--font-cormorant), serif" }} className="text-2xl text-[#111] italic mb-2">
                — {blog.author}
              </p>
            )}
            <p className="text-xs uppercase tracking-[0.2em] text-[#999]">Hearts Creations Journal</p>
          </div>

          {/* Elegant Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#555] border border-gray-200 rounded-full hover:border-[#333] hover:text-[#111] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
}

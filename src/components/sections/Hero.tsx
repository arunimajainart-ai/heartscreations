"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Animated Background Layers */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        {/* Gradient Overlay inspired by the artwork colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-stone-900/80 to-teal-900/90 z-10" />
        
        {/* Abstract color blocks inspired by the bird painting */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-rose-600/40 to-rose-900/60"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-teal-500/40 to-cyan-900/60"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/3 w-1/4 h-1/2 bg-gradient-to-b from-amber-500/30 to-orange-600/40 blur-2xl"
          />
        </div>

        {/* Texture Overlay - using CSS gradient instead of image */}
        <div className="absolute inset-0 z-20 opacity-20 mix-blend-overlay bg-gradient-to-br from-white/10 via-transparent to-black/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-30 h-full flex flex-col items-center justify-center text-white px-6 pb-24 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base tracking-[0.4em] uppercase text-white/70 mb-6"
        >
          Contemporary Artist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-wide">
            ARUNIMA
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-wide mt-2">
            JAIN
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex flex-col items-center"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mb-6" />
          <p className="text-lg md:text-xl lg:text-2xl font-light italic text-white/90 tracking-wide">
            &ldquo;Where Art Becomes Energy&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-white text-stone-900 text-sm tracking-wider uppercase hover:bg-rose-50 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
          >
            View Collection
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300"
          >
            Commission Art
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-white/60"
      >
        <span className="text-xs tracking-[0.3em] uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Side Decorative Elements */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span className="text-[10px] tracking-[0.3em] text-white/40 rotate-90 origin-center whitespace-nowrap">
          EST. 2020
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <span className="text-[10px] tracking-[0.3em] text-white/40 -rotate-90 origin-center whitespace-nowrap">
          INDIA
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}

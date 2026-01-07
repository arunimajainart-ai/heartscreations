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
      data-nav-theme="dark"
      className="relative h-screen overflow-hidden"
    >
      {/* Animated Background Layers */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Arunima_Landing_Page.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 z-10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-30 h-full flex flex-col items-center justify-center text-white px-6 pb-24 md:pb-32 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontFamily: "var(--font-cormorant), serif" }}
          className="text-sm md:text-base font-normal tracking-wide text-white/75 mb-5"
        >
          Contemporary Artist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            WebkitTextStroke: "0.9px rgba(0,0,0,0.22)",
            textShadow: "0 10px 26px rgba(0,0,0,0.28)",
          }}
          className="text-center text-[#f6efe6]/95 leading-[1.02]"
        >
          <span className="block text-[clamp(2.35rem,7vw,6.1rem)] font-medium tracking-[0.06em]">
            ARUNIMA
          </span>
          <span className="block text-[clamp(2.2rem,6vw,5.45rem)] font-medium tracking-[0.06em] -mt-2">
            <span className="inline-block italic" style={{ fontSize: "1.08em" }}>
              J
            </span>
            <span className="inline-block -ml-1">AIN</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex flex-col items-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a646]/80 to-transparent mb-5" />
          <p
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            className="text-base md:text-lg lg:text-xl font-light italic text-[#f1e7da] tracking-wide drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          >
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
            className="px-8 py-4 bg-[#7d0f23] border-2 border-[#c9a646] text-sm tracking-[0.16em] uppercase text-white shadow-[0_10px_30px_rgba(0,0,0,0.24)] hover:brightness-110 transition-all duration-300"
          >
            View Collection
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-white/60 text-white text-sm tracking-[0.14em] uppercase hover:bg-white/08 transition-all duration-300"
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

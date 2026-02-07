"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="page-transition">
      {/* About Header */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#333]"
          >
            About
          </motion.h1>
        </div>
      </section>

      {/* Artist Photo */}
      <section className="pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden"
          >
            <Image
              src="/Artist.webp"
              alt="Arunima Jain"
              fill
              className="object-contain bg-[#fafafa]"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-5 text-[15px] md:text-[16px] text-[#444] leading-[1.85]">
              <p>
                With over 12+ years of artistic practice, Arunima operates at the intersection of
                contemporary art and elevated design. Her work is defined by restraint, precision,
                and a refined visual language that transcends trends.
              </p>
              <p>
                Working primarily with mixed media, abstract, modern techniques, her practice is
                defined by meticulous detail, layered textures, and a subtle yet powerful visual
                language. Each piece is thoughtfully crafted and reflects a deliberate balance of
                material, space, and narrative, designed to exist effortlessly within curated,
                design-led environments.
              </p>
              <p>
                Rooted in sophistication and driven by conceptual clarity, Arunima&apos;s practice
                appeals to a global, style-conscious audience that values originality, craftsmanship,
                and timeless luxury. The work is not decorative—it is intentional, collectible,
                and enduring.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

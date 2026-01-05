"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ArtistStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 leading-tight"
            >
              <span className="italic text-rose-700">A Dialogue Between</span>
              <br />
              <span className="text-stone-400">Chaos & Silence</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-6"
            >
              <p className="text-stone-600 leading-relaxed text-lg">
                My work is an exploration of the unseen forces that govern our existence. 
                Through the vibrant collisions of color in my abstracts to the meditative 
                stillness of sacred geometry, I seek to capture the fleeting moment where 
                emotion transforms into tangible energy.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Each canvas becomes a conversation — between tradition and innovation, 
                between the divine and the earthly, between what we see and what we feel. 
                I invite you to step into this dialogue and discover the stories that 
                resonate with your soul.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="w-16 h-px bg-rose-300" />
              <p className="text-lg italic text-stone-800 font-light">Arunima Jain</p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                  src="/artworks/pichwai-cow.svg"
                  alt="Pichwai artwork by Arunima Jain"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-rose-200/50 pointer-events-none" />
            </div>
            
            {/* Floating accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-rose-600 text-white px-6 py-4 shadow-xl"
            >
              <p className="text-xs tracking-[0.2em] uppercase">Featured Work</p>
              <p className="text-lg font-light mt-1">Divine Symmetry</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
}

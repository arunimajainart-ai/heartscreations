"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cedarville_Cursive } from "next/font/google";

const signatureFont = Cedarville_Cursive({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function ArtistStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative py-20 md:py-24 lg:py-32 bg-[#0b0b0d] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,166,70,0.16),transparent_48%),radial-gradient(circle_at_70%_60%,rgba(176,28,64,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full bg-[conic-gradient(from_180deg,rgba(201,166,70,0.18),rgba(176,28,64,0.14),rgba(255,255,255,0.06),rgba(201,166,70,0.18))] blur-3xl opacity-50" />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-[radial-gradient(circle,rgba(201,166,70,0.14),transparent_60%)] opacity-70" />
        <div className="absolute -right-52 top-1/2 -translate-y-1/2 w-[860px] h-[860px] rounded-full border border-white/8 opacity-40" />
        <div className="absolute -right-56 top-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full border border-white/6 opacity-25" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 max-w-[34rem]"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="font-light leading-[1.06] text-[#d7c7bd] drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
            >
              <span className="block text-[clamp(2.25rem,3.4vw,3rem)]">
                A Dialogue Between
              </span>
              <br />
              <span className="block text-[clamp(2.25rem,3.4vw,3rem)] -mt-2">
                Chaos &amp; Silence
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-6"
            >
              <p className="text-white/70 leading-[1.9] text-[14px] md:text-[15px]">
                My work is an exploration of the unseen forces that govern our existence. 
                Through the vibrant collisions of color in my abstracts to the meditative 
                stillness of sacred geometry, I seek to capture the fleeting moment where 
                emotion transforms into tangible energy.
              </p>
              <p className="text-white/70 leading-[1.9] text-[14px] md:text-[15px]">
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
              <div className="w-14 h-px bg-[#c9a646]/55" />
              <p
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-sm md:text-base italic text-white/65 font-light"
              >
                Arunima Jain
              </p>
            </motion.div>

          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="mx-auto max-w-[22rem] md:max-w-[24rem] lg:max-w-[26rem] rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl shadow-[0_40px_110px_rgba(0,0,0,0.62)] p-4 md:p-5">
                <div className="relative">
                  <div className="absolute -inset-10 rounded-[32px] bg-[radial-gradient(circle,rgba(201,166,70,0.22),transparent_55%)] blur-3xl opacity-70" />

                  <div className="relative rounded-2xl border border-white/10 bg-black/25 p-3 md:p-4">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <motion.div style={{ y: imageY }} className="absolute inset-0">
                        <Image
                          src="/artworks/pichwai-cow.svg"
                          alt="Pichwai artwork by Arunima Jain"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-[10px] tracking-[0.26em] uppercase text-white/55">
                        Featured Work
                      </p>
                      <p className="mt-1 text-sm text-white/75">Divine Symmetry</p>

                      <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="w-6 h-px bg-[#c9a646]/70" />
                        <span className="w-6 h-px bg-white/20" />
                        <span className="w-6 h-px bg-white/20" />
                        <span className="w-6 h-px bg-white/20" />
                      </div>

                      <Link
                        href="/portfolio"
                        className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-xs tracking-[0.22em] uppercase border border-[#c9a646]/75 text-[#f2e8da] bg-[linear-gradient(180deg,rgba(201,166,70,0.22),rgba(255,255,255,0.04))] shadow-[0_14px_34px_rgba(0,0,0,0.40)] hover:bg-[linear-gradient(180deg,rgba(201,166,70,0.28),rgba(255,255,255,0.06))] transition-colors"
                      >
                        Explore Featured Work
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative bg-white py-8 md:py-12 lg:py-14"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 max-w-[34rem]"
          >
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: "var(--font-cormorant), serif" }}
              className="text-[#1b1b1b] leading-[1.05] font-normal"
            >
              <span className="block text-[clamp(2.4rem,3.6vw,3.2rem)]">
                A Dialogue Between
              </span>
              <span
                className="block text-[clamp(2.4rem,3.6vw,3.2rem)] italic text-[#b08b40] drop-shadow-[0_3px_6px_rgba(0,0,0,0.18)]"
              >
                Chaos &amp; Silence
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 space-y-5"
            >
              <p className="text-[#4a4a4a] leading-[1.8] text-[15px] md:text-[16px] max-w-xl">
                My work is an exploration of the unseen forces that govern our existence. 
                Through the vibrant collisions of color in my abstracts to the meditative 
                stillness of sacred geometry, I seek to capture the fleeting moment where 
                emotion transforms into tangible energy.
              </p>
              <p className="text-[#4a4a4a] leading-[1.8] text-[15px] md:text-[16px] max-w-xl">
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
              className="mt-8 flex items-center gap-4"
            >
              <div className="w-12 h-px bg-black/60" />
              <p
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-sm md:text-base italic text-black/75 font-normal"
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
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-[22rem] lg:max-w-[23rem] space-y-4">
              <div className="group relative overflow-hidden rounded-[22px] bg-gradient-to-b from-slate-50 via-white to-slate-100 p-[10px] shadow-[0_32px_80px_rgba(15,23,42,0.16)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_110px_rgba(15,23,42,0.22)]">
                <motion.div
                  className="relative aspect-[3/4] max-h-[65vh] sm:max-h-[70vh] md:max-h-[72vh] rounded-[16px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.10)] overflow-hidden transition-all duration-500 group-hover:scale-[1.01]"
                >
                  <Image
                    src="/divine_art.webp"
                    alt="Divine art by Arunima Jain"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 rounded-[16px] ring-1 ring-black/5" />
                </motion.div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-base font-semibold text-slate-900">Pichwai painting</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1 text-xs text-amber-800 shadow-[0_6px_16px_rgba(253,230,138,0.35)] ring-1 ring-amber-200">
                    Acrylic on 300 gsm paper
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 shadow-[0_6px_16px_rgba(15,23,42,0.04)] ring-1 ring-slate-200">
                    40&quot; x 18&quot;
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowDetails((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-white px-4 py-2 text-xs font-semibold text-amber-800 shadow-[0_14px_34px_rgba(251,191,36,0.35)] ring-1 ring-amber-200 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_42px_rgba(251,191,36,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {showDetails ? "Hide symbolism & details" : "View symbolism & details"}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="rounded-[18px] border border-amber-200/60 bg-gradient-to-b from-amber-50/90 via-white/92 to-white shadow-[0_26px_64px_rgba(15,23,42,0.12)] p-6 backdrop-blur-sm"
                  >
                    <div className="mb-4">
                      <p className="text-xs tracking-[0.18em] uppercase text-slate-500">Pichwai painting</p>
                      <p className="mt-1 text-sm text-slate-700">Acrylic on 300 gsm paper · 40&quot; x 18&quot;</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-slate-800">Symbolism</p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                          <span><span className="font-semibold">Cow and calf:</span> Prosperity, motherhood, abundance, and sacredness</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                          <span><span className="font-semibold">Lotus flowers:</span> Purity, spiritual awakening, and divine beauty</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                          <span><span className="font-semibold">Symmetry &amp; repetition:</span> Harmony, balance, and cosmic order</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

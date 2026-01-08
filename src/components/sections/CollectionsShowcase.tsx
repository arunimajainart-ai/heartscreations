"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/artworks";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motionTransition, motionVariants } from "@/lib/motion";

export default function CollectionsShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <Section tone="light" padding="tight" className="bg-background">
      <div className="space-y-8 md:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Curated Series"
            title="Selected Collections"
            action={{ href: "/collections", label: "View Full Archive" }}
          />
        </motion.div>

        <motion.div
          variants={motionVariants.stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-4 md:gap-6"
        >
          {collections.slice(0, 3).map((collection) => (
            <motion.article
              key={collection.id}
              variants={motionVariants.fadeUp}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: motionTransition.easeOut }
              }
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group relative"
            >
              <Link href={`/collections/${collection.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${collection.id === "divine-symmetry" ? "object-contain p-3 bg-white" : "object-cover"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/10 to-transparent" />

                  {/* Default title overlay */}
                  <div className="absolute inset-0 px-6 md:px-7 pb-7 md:pb-8 flex items-end transition-opacity duration-300 group-hover:opacity-0">
                    <h3
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="text-[clamp(1.4rem,1.7vw,2rem)] font-light leading-[1.08] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                    >
                      {collection.name}
                    </h3>
                  </div>

                  {/* Hover info overlays */}
                  {collection.id === "abstract-expressions" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 flex flex-col justify-end px-7 pb-8 gap-3 text-white">
                        <div className="text-[11px] tracking-[0.28em] uppercase text-white/80">
                          Color &amp; Emotion
                        </div>
                        <div
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                          className="text-[clamp(1.5rem,1.8vw,2.1rem)] leading-[1.08] font-light"
                        >
                          Abstract Expressions
                        </div>
                        <div className="text-sm text-white/85">
                          A journey into the subconscious mind.
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-white/85">
                          Explore <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {collection.id === "sacred-energies" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 flex flex-col justify-end px-7 pb-8 gap-3 text-white">
                        <div className="text-[11px] tracking-[0.28em] uppercase text-white/80">
                          Nandi &amp; Power
                        </div>
                        <div
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                          className="text-[clamp(1.5rem,1.8vw,2.1rem)] leading-[1.08] font-light"
                        >
                          Sacred Energies
                        </div>
                        <div className="text-sm text-white/85">
                          The divine strength of silence.
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-white/85">
                          Explore <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {collection.id === "divine-symmetry" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 flex flex-col justify-end px-7 pb-8 gap-3 text-white">
                        <div className="text-[11px] tracking-[0.28em] uppercase text-white/80">
                          Pichwai &amp; Lotus
                        </div>
                        <div
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                          className="text-[clamp(1.5rem,1.8vw,2.1rem)] leading-[1.08] font-light"
                        >
                          Divine Symmetry
                        </div>
                        <div className="text-sm text-white/85">
                          Traditional motifs reimagined.
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-white/85">
                          Explore <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

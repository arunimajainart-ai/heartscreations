"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info, X } from "lucide-react";
import { collections } from "@/data/artworks";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motionTransition, motionVariants } from "@/lib/motion";

export default function CollectionsShowcase() {
  const [openId, setOpenId] = useState<string | null>(null);
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
                    className={`transition-transform duration-700 group-hover:scale-105 ${
                      collection.id === "divine-symmetry"
                        ? "object-contain p-4 bg-white"
                        : "object-cover"
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/10 to-transparent" />

                  {/* Mobile quick title (always visible until expanded) */}
                  {openId !== collection.id && (
                    <div className="md:hidden pointer-events-none absolute inset-0 flex items-end">
                      <div className="w-full px-5 pb-5">
                        <div className="pointer-events-auto inline-flex flex-col gap-1 rounded-2xl bg-black/55 backdrop-blur-md px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-white/10">
                          <div className="text-[11px] tracking-[0.26em] uppercase text-white/80">
                            {collection.id === "abstract-expressions" && "Color & Emotion"}
                            {collection.id === "sacred-energies" && "Nandi & Power"}
                            {collection.id === "divine-symmetry" && "Pichwai & Lotus"}
                          </div>
                          <div
                            style={{ fontFamily: "var(--font-cormorant), serif" }}
                            className="text-[1.35rem] leading-[1.05] font-light text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                          >
                            {collection.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile info toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenId((prev) => (prev === collection.id ? null : collection.id));
                    }}
                    className="md:hidden absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm shadow-lg border border-white/10 transition hover:bg-black/70 active:scale-[0.98]"
                    aria-label={openId === collection.id ? "Hide collection info" : "Show collection info"}
                  >
                    {openId === collection.id ? <X className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                  </button>

                  {/* Mobile info panel */}
                  {openId === collection.id && (
                    <div className="md:hidden pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/25 backdrop-blur-[2px] transition duration-300">
                      <div className="pointer-events-auto absolute inset-0 flex flex-col justify-end gap-3 px-5 pb-6 text-white animate-in fade-in slide-in-from-bottom-1">
                        <div className="text-[11px] tracking-[0.28em] uppercase text-white/80">
                          {collection.id === "abstract-expressions" && "Color & Emotion"}
                          {collection.id === "sacred-energies" && "Nandi & Power"}
                          {collection.id === "divine-symmetry" && "Pichwai & Lotus"}
                        </div>
                        <div
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                          className="text-[1.5rem] leading-[1.08] font-light"
                        >
                          {collection.name}
                        </div>
                        {collection.id === "abstract-expressions" && (
                          <>
                            <div className="text-sm text-white/85">A journey into the subconscious mind.</div>
                            <ul className="space-y-1.5 text-[13px] text-white/82">
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Calm amidst chaos</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Balance of energies</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Mindfulness &amp; inner strength</span>
                              </li>
                            </ul>
                            <div className="text-[13px] text-white/80">
                              Encourages introspection, grounding, and emotional balance.
                            </div>
                          </>
                        )}

                        {collection.id === "sacred-energies" && (
                          <>
                            <div className="text-sm text-white/85">The divine strength of silence.</div>
                            <ul className="space-y-1.5 text-[13px] text-white/82">
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Brings strong, determined, protective energy</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Best placed on the south wall or south-east</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Great for home office, workspace, or living room</span>
                              </li>
                            </ul>
                            <div className="text-[13px] text-white/80">
                              Encourages grounding and emotional steadiness.
                            </div>
                          </>
                        )}

                        {collection.id === "divine-symmetry" && (
                          <>
                            <div className="text-sm text-white/85">Acrylic on 300 gsm paper · 40&quot; x 18&quot;</div>
                            <ul className="space-y-1.5 text-[13px] text-white/82">
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Cow and calf: prosperity, motherhood, abundance, sacredness</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Lotus flowers: purity, spiritual awakening, divine beauty</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                                <span>Symmetry &amp; repetition: harmony, balance, cosmic order</span>
                              </li>
                            </ul>
                            <div className="text-[13px] text-white/80">
                              Invites harmony, abundance, and emotional balance.
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Default title overlay (desktop only) */}
                  <div className="hidden md:flex absolute inset-0 px-6 md:px-7 pb-7 md:pb-8 items-end transition-opacity duration-300 group-hover:opacity-0">
                    <h3
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="text-[clamp(1.4rem,1.7vw,2rem)] font-light leading-[1.08] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                    >
                      {collection.name}
                    </h3>
                  </div>

                  {/* Hover info overlays */}
                  {collection.id === "abstract-expressions" && (
                    <div className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
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
                        <div className="text-sm text-white/85">A journey into the subconscious mind.</div>
                        <ul className="space-y-1.5 text-[13px] text-white/82">
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Calm amidst chaos</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Balance of energies</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Mindfulness &amp; inner strength</span>
                          </li>
                        </ul>
                        <div className="text-[13px] text-white/80">
                          Encourages introspection, grounding, and emotional balance.
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-white/85">
                          Explore <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {collection.id === "sacred-energies" && (
                    <div className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
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
                        <ul className="space-y-1.5 text-[13px] text-white/82">
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Brings strong, determined, protective energy</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Best placed on the south wall or south-east</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Great for home office, workspace, or living room</span>
                          </li>
                        </ul>
                        <div className="text-[13px] text-white/80">
                          Encourages grounding and emotional steadiness.
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase text-white/85">
                          Explore <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {collection.id === "divine-symmetry" && (
                    <div className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-transparent opacity-0 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
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
                          Acrylic on 300 gsm paper · 40&quot; x 18&quot;
                        </div>
                        <ul className="space-y-1.5 text-[13px] text-white/82">
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Cow and calf: prosperity, motherhood, abundance, sacredness</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Lotus flowers: purity, spiritual awakening, divine beauty</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
                            <span>Symmetry &amp; repetition: harmony, balance, cosmic order</span>
                          </li>
                        </ul>
                        <div className="text-[13px] text-white/80">
                          Invites harmony, abundance, and emotional balance.
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

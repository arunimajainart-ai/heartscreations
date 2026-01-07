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
    <Section tone="light" padding="default" className="bg-background">
      <div className="space-y-10 md:space-y-14">
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={collection.coverImage}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

                  <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-end">
                    <p className="text-background/70 text-[11px] tracking-[0.28em] uppercase">
                      {collection.tagline}
                    </p>
                    <h3
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="mt-3 text-[clamp(1.4rem,1.8vw,2rem)] font-light leading-[1.08] text-background"
                    >
                      {collection.name}
                    </h3>
                    <div className="mt-4 inline-flex items-center gap-2 text-background/70 group-hover:text-background transition-colors">
                      <span className="text-[12px] tracking-[0.22em] uppercase">
                        Explore
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

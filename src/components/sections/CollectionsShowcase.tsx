"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useArtworks } from "@/lib/useFirestoreData";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motionTransition, motionVariants } from "@/lib/motion";

export default function CollectionsShowcase() {
  const reduceMotion = useReducedMotion();
  const { artworks } = useArtworks(true);

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
            eyebrow="Selected Works"
            title="Artworks"
            action={{ href: "/available-works", label: "View All" }}
          />
        </motion.div>

        <motion.div
          variants={motionVariants.stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-4 md:gap-6"
        >
          {artworks.map((artwork) => (
            <motion.article
              key={artwork.id}
              variants={motionVariants.fadeUp}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: motionTransition.easeOut }
              }
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group relative"
            >
              <Link href={`/artwork/${artwork.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-end px-6 pb-7">
                    <h3
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="text-[clamp(1.4rem,1.7vw,2rem)] font-light leading-[1.08] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                    >
                      {artwork.title}
                    </h3>
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

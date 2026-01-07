"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedArtworks } from "@/data/artworks";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motionTransition, motionVariants } from "@/lib/motion";

export default function FeaturedWorks() {
  const featuredArtworks = getFeaturedArtworks();
  const reduceMotion = useReducedMotion();

  return (
    <Section tone="light" padding="default" className="bg-muted">
      <div className="space-y-10 md:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Selected Works"
            title="Featured Collection"
            action={{ href: "/portfolio", label: "View All Works" }}
          />
        </motion.div>

        <motion.div
          variants={motionVariants.stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {featuredArtworks.map((artwork) => (
            <motion.article
              key={artwork.id}
              variants={motionVariants.fadeUp}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: motionTransition.easeOut }
              }
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="group"
            >
              <Link href={`/artwork/${artwork.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-foreground/85 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-background/85 text-sm">{artwork.essence}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-lg font-light group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {artwork.medium} · {artwork.size}
                  </p>
                  <p className="text-[11px] tracking-[0.24em] uppercase text-accent">
                    {artwork.collection}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

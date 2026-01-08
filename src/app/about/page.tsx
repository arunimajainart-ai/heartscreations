"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Parchment backdrop and gold accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f0e3] via-[#f1e6d6] to-[#f9f3e8]" />
        <div className="absolute -top-24 -right-16 w-[340px] h-[340px] bg-[radial-gradient(circle,rgba(189,155,84,0.12),transparent_55%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(189,155,84,0.10),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_50%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-[420px] bg-white/80 rounded-3xl shadow-[0_28px_80px_rgba(0,0,0,0.12)] p-4 border border-amber-100">
                <div className="relative aspect-[3/4] rounded-[28px] overflow-hidden bg-white">
                  <div className="absolute inset-[10px] rounded-[24px] border border-amber-300/70 shadow-inner shadow-amber-200/40 pointer-events-none" />
                  <Image
                    src="/bio_pic.webp"
                    alt="Arunima Jain - Contemporary Artist"
                    fill
                    className="object-contain p-4 rounded-[22px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="mt-6 text-center text-amber-800 text-sm tracking-[0.28em] uppercase">
                  The Artist
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <p className="text-amber-700 text-sm tracking-[0.32em] uppercase mb-3 font-medium">
                The Artist
              </p>
              <h1
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-[clamp(2.6rem,4vw,3.4rem)] leading-tight text-[#b08b40] font-light"
              >
                Arunima Jain
              </h1>
              <div className="mt-4 flex items-center gap-3 text-amber-700">
                <div className="h-px w-12 bg-amber-400/80" />
                <span className="text-xs tracking-[0.22em] uppercase">Contemporary Artist</span>
              </div>

              <div className="mt-8 space-y-5 text-[#3a3129] leading-[1.8] text-[16px]">
                <p>
                  Art has always been my language — a way to express what words cannot capture.
                  Through my brush, I explore the delicate balance between tradition and modernity,
                  chaos and serenity, the seen and the unseen.
                </p>
                <p>
                  My journey as an artist began with a deep fascination for Indian classical art
                  forms, particularly the intricate beauty of Pichwai paintings. Over time, my
                  style evolved to embrace abstract expressionism, finding harmony between bold
                  contemporary strokes and sacred traditional motifs.
                </p>
                <p>
                  Each piece I create is an invitation to pause, reflect, and feel. Whether it's
                  the raw energy of an abstract or the meditative calm of sacred geometry, my
                  art seeks to transform spaces and touch souls.
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-6 text-amber-800">
                <a
                  href="https://instagram.com/Hearts_Creations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium hover:text-amber-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@Hearts_Creations</span>
                </a>
                <a
                  href="mailto:arunimajain02@gmail.com"
                  className="flex items-center gap-2 text-sm font-medium hover:text-amber-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
              Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-8">
              Where Art Becomes Energy
            </h2>
            <p className="text-xl text-stone-600 italic leading-relaxed">
              &ldquo;I believe every space has a soul, and art is the bridge that connects 
              our physical surroundings to our inner world. When you bring a piece of 
              art into your space, you&apos;re not just decorating — you&apos;re inviting energy, 
              emotion, and story into your life.&rdquo;
            </p>
            <p className="mt-6 text-stone-500">— Arunima Jain</p>
          </motion.div>
        </div>
      </section>

      {/* Artistic Journey */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
              Artistic Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">
              Styles & Influences
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Abstract Expressions",
                description: "Bold color collisions and emotional energy captured on canvas",
                icon: "🎨",
              },
              {
                title: "Sacred Art",
                description: "Nandi, deities, and spiritual symbols with Vastu significance",
                icon: "🕉️",
              },
              {
                title: "Pichwai Tradition",
                description: "Classical Indian art with lotus motifs and divine themes",
                icon: "🪷",
              },
              {
                title: "Modern Textures",
                description: "Layered mixed media works with contemporary sensibility",
                icon: "✨",
              },
            ].map((style, index) => (
              <motion.div
                key={style.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white border border-stone-100 hover:border-rose-200 transition-colors"
              >
                <span className="text-4xl mb-4 block">{style.icon}</span>
                <h3 className="text-lg font-medium text-stone-900 mb-2">
                  {style.title}
                </h3>
                <p className="text-sm text-stone-500">{style.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-stone-900 text-white p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Let&apos;s Create Something Beautiful
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Whether you&apos;re looking for a statement piece for your home, a meaningful 
            gift, or a custom commission, I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 text-sm tracking-wider uppercase hover:bg-rose-50 transition-colors"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

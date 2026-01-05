"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
              <Image
                src="/artist-profile.svg"
                alt="Arunima Jain - Contemporary Artist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border border-rose-200 -z-10" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-stone-900 text-white px-6 py-4"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-white/70">Artist</p>
              <p className="text-lg font-light">Since 2020</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
              The Artist
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Arunima Jain
            </h1>
            <div className="w-16 h-px bg-rose-400 mb-8" />
            <div className="space-y-6 text-stone-600 leading-relaxed">
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
                Each piece I create is an invitation to pause, reflect, and feel. Whether it&apos;s 
                the raw energy of an abstract or the meditative calm of sacred geometry, my 
                art seeks to transform spaces and touch souls.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <a
                href="https://instagram.com/Hearts_Creations"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@Hearts_Creations</span>
              </a>
              <a
                href="mailto:arunimajain02@gmail.com"
                className="flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </motion.div>
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

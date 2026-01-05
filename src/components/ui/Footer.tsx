"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";

const collections = [
  { name: "Abstract Expressions", href: "/collections/abstract-expressions" },
  { name: "Sacred Energies", href: "/collections/sacred-energies" },
  { name: "Divine Symmetry", href: "/collections/divine-symmetry" },
  { name: "Modern Textures", href: "/collections/modern-textures" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-rose-400 text-sm tracking-[0.3em] uppercase mb-4">
              Transform Your Space
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8">
              Ready to Own a Piece of Art?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 text-sm tracking-wider uppercase hover:bg-rose-50 transition-colors duration-300"
            >
              Start a Commission
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-b border-white/10 py-6 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap text-2xl md:text-3xl font-light text-white/20"
        >
          {Array(4)
            .fill(["Beauty", "Spirit", "Essence", "Energy", "Harmony"])
            .flat()
            .map((word, i) => (
              <span key={i} className="flex items-center gap-8">
                {word} <span className="text-rose-500">•</span>
              </span>
            ))}
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-light tracking-[0.3em]">
                HEARTS<span className="font-medium text-rose-500">CREATIONS</span>
              </span>
              <span className="block text-[10px] tracking-[0.2em] text-white/50 mt-1">
                BY ARUNIMA JAIN
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Where Art Becomes Energy.
              <br />
              A portfolio of contemporary works
              <br />
              by Arunima Jain.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/Hearts_Creations"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:arunimajain02@gmail.com"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-white/80">
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.map((collection) => (
                <li key={collection.href}>
                  <Link
                    href={collection.href}
                    className="text-white/60 hover:text-rose-400 transition-colors text-sm"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-white/80">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  All Artworks
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  About the Artist
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  Commissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-white/80">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:arunimajain02@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  arunimajain02@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918055069122"
                  className="flex items-center gap-3 text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +91 80550 69122
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/Hearts_Creations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-rose-400 transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  @Hearts_Creations
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Hearts Creations by Arunima Jain. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Crafted with passion for art
          </p>
        </div>
      </div>
    </footer>
  );
}

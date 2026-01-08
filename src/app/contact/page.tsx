"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-rose-600 text-sm tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-lg text-stone-600">
            Whether you&apos;re interested in a custom commission, purchasing an existing 
            piece, or simply want to discuss art, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr] justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#f7f0e3] via-white to-[#f1e6d6] border border-amber-100 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(191,146,82,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(191,146,82,0.10),transparent_30%)]" />
            <div className="relative p-8 md:p-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-2">Reach Out</p>
                  <h2 className="text-3xl font-light text-[#b08b40]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                    Direct Inquiries
                  </h2>
                  <p className="text-stone-600 mt-3 max-w-2xl">
                    We&apos;re prioritizing personal conversations right now. Email or call and we&apos;ll respond within 24–48 hours.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="mailto:arunimajain02@gmail.com"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-white shadow-[0_14px_30px_rgba(191,146,82,0.35)] transition-all duration-300 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-500 hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(191,146,82,0.45)] focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/20 via-transparent to-white/10 transition-opacity" />
                    <Mail className="relative w-4 h-4 text-white drop-shadow" />
                    <span className="relative">Email</span>
                  </a>
                  <a
                    href="tel:+918055069122"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-amber-800 border border-amber-300 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-amber-500 hover:shadow-[0_12px_28px_rgba(191,146,82,0.18)] focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-50/90 via-white/60 to-amber-50/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Phone className="relative w-4 h-4 text-amber-700" />
                    <span className="relative">Call</span>
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-white border border-amber-100 shadow-sm">
                      <Mail className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 tracking-wider uppercase mb-1">Email</p>
                      <a href="mailto:arunimajain02@gmail.com" className="text-stone-900 hover:text-amber-700 transition-colors">
                        arunimajain02@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-white border border-amber-100 shadow-sm">
                      <Phone className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 tracking-wider uppercase mb-1">Phone</p>
                      <a href="tel:+918055069122" className="text-stone-900 hover:text-amber-700 transition-colors">
                        +91 80550 69122
                      </a>
                      <p className="text-xs text-stone-500 mt-1">Best for urgent inquiries</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-white border border-amber-100 shadow-sm">
                      <Instagram className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 tracking-wider uppercase mb-1">Instagram</p>
                      <a
                        href="https://instagram.com/Hearts_Creations"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 hover:text-amber-700 transition-colors"
                      >
                        @Hearts_Creations
                      </a>
                      <p className="text-xs text-stone-500 mt-1">Hearts_Creations by Arunima Jain</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-white border border-amber-100 shadow-sm">
                      <MapPin className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 tracking-wider uppercase mb-1">Location</p>
                      <p className="text-stone-900">India</p>
                      <p className="text-xs text-stone-500 mt-1">Shipping worldwide available</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Commission Info */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="bg-rose-50 border border-rose-100 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-light text-stone-900 mb-4">
                  Custom Commissions
                </h2>
                <p className="text-stone-600 leading-relaxed">
                  Looking for a unique piece tailored to your space? I offer custom 
                  commissions across all my styles — from abstract expressions to 
                  traditional Pichwai. Share your vision, and let&apos;s create something 
                  extraordinary together.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <p className="text-stone-700">Share your vision and requirements</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <p className="text-stone-700">Receive a proposal and quote</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <p className="text-stone-700">Collaborate on the creation process</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </span>
                  <p className="text-stone-700">Receive your unique artwork</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

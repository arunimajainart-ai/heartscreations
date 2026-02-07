"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="page-transition">
      {/* Contact Header */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "var(--font-cormorant), serif" }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#333]"
          >
            Contact
          </motion.h1>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-10"
          >
            {/* Intro text */}
            <div className="space-y-4 text-[15px] md:text-[16px] text-[#444] leading-[1.85] max-w-2xl">
              <p>
                Whether you&apos;re interested in a custom commission, purchasing an existing
                piece, or simply want to discuss art — I&apos;d love to hear from you.
              </p>
              <p>
                Get in touch directly via email or phone and I&apos;ll respond within 24–48 hours.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#999] tracking-wide uppercase mb-1">Email</p>
                    <a
                      href="mailto:arunimajain02@gmail.com"
                      className="text-[#333] hover:text-[#666] transition-colors"
                    >
                      arunimajain02@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#999] tracking-wide uppercase mb-1">Phone</p>
                    <a
                      href="tel:+918055069122"
                      className="text-[#333] hover:text-[#666] transition-colors"
                    >
                      +91 80550 69122
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#999] tracking-wide uppercase mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/Hearts_Creations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#333] hover:text-[#666] transition-colors"
                    >
                      @Hearts_Creations
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#666] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#999] tracking-wide uppercase mb-1">Location</p>
                    <p className="text-[#333]">India</p>
                    <p className="text-[13px] text-[#999] mt-1">Worldwide shipping available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Info */}
            <div className="pt-8 border-t border-gray-100">
              <h2
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-xl md:text-2xl font-normal text-[#333] mb-4"
              >
                Commissions
              </h2>
              <div className="space-y-3 text-[15px] text-[#444] leading-[1.85]">
                <p>
                  Looking for a unique piece tailored to your space? Custom commissions are
                  available across all styles — from abstract expressions to traditional Pichwai
                  and sacred art.
                </p>
                <p>
                  Share your vision, preferred size, and style, and we&apos;ll work together
                  to create something extraordinary for your space.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

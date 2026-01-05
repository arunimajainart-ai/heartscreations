"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

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

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-stone-50 p-8 h-full">
              <h2 className="text-xl font-light text-stone-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <a
                  href="mailto:arunimajain02@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-white border border-stone-200 group-hover:border-rose-300 transition-colors">
                    <Mail className="w-5 h-5 text-stone-600 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 tracking-wider uppercase mb-1">
                      Email
                    </p>
                    <p className="text-stone-900 group-hover:text-rose-600 transition-colors">
                      arunimajain02@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918055069122"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-white border border-stone-200 group-hover:border-rose-300 transition-colors">
                    <Phone className="w-5 h-5 text-stone-600 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 tracking-wider uppercase mb-1">
                      Phone
                    </p>
                    <p className="text-stone-900 group-hover:text-rose-600 transition-colors">
                      +91 80550 69122
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/Hearts_Creations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-white border border-stone-200 group-hover:border-rose-300 transition-colors">
                    <Instagram className="w-5 h-5 text-stone-600 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 tracking-wider uppercase mb-1">
                      Instagram
                    </p>
                    <p className="text-stone-900 group-hover:text-rose-600 transition-colors">
                      @Hearts_Creations
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Hearts_Creations by Arunima Jain
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-stone-200">
                    <MapPin className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 tracking-wider uppercase mb-1">
                      Location
                    </p>
                    <p className="text-stone-900">India</p>
                    <p className="text-xs text-stone-500 mt-1">
                      Shipping worldwide available
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-10 pt-8 border-t border-stone-200">
                <p className="text-xs text-stone-400 tracking-wider uppercase mb-2">
                  Response Time
                </p>
                <p className="text-stone-600 text-sm">
                  I typically respond within 24-48 hours. For urgent inquiries, 
                  please reach out via phone.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-stone-100 p-8 md:p-10">
              <h2 className="text-xl font-light text-stone-900 mb-2">
                Send a Message
              </h2>
              <p className="text-stone-500 text-sm mb-8">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
              <ContactForm />
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

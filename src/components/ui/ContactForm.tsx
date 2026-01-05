"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-light text-stone-900 mb-3">
          Thank You
        </h3>
        <p className="text-stone-600">
          Your message has been received. I&apos;ll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-rose-600 hover:text-rose-700 text-sm tracking-wider uppercase"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm text-stone-600 mb-2 tracking-wide"
          >
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-stone-600 mb-2 tracking-wide"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm text-stone-600 mb-2 tracking-wide"
        >
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label
          htmlFor="interest"
          className="block text-sm text-stone-600 mb-2 tracking-wide"
        >
          I&apos;m Interested In <span className="text-rose-500">*</span>
        </label>
        <select
          id="interest"
          name="interest"
          required
          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900"
        >
          <option value="">Select an option</option>
          <option value="commission">Custom Commission</option>
          <option value="purchase">Purchase Existing Artwork</option>
          <option value="collaboration">Collaboration Inquiry</option>
          <option value="exhibition">Exhibition/Gallery Inquiry</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-sm text-stone-600 mb-2 tracking-wide"
        >
          Budget Range (Optional)
        </label>
        <select
          id="budget"
          name="budget"
          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900"
        >
          <option value="">Prefer not to say</option>
          <option value="under-10k">Under ₹10,000</option>
          <option value="10k-25k">₹10,000 - ₹25,000</option>
          <option value="25k-50k">₹25,000 - ₹50,000</option>
          <option value="50k-100k">₹50,000 - ₹1,00,000</option>
          <option value="above-100k">Above ₹1,00,000</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-stone-600 mb-2 tracking-wide"
        >
          Your Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition-colors text-stone-900 resize-none"
          placeholder="Tell me about your vision, the space you're looking to transform, or any specific requirements..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full py-4 bg-stone-900 text-white text-sm tracking-wider uppercase hover:bg-rose-700 disabled:bg-stone-400 transition-colors flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </motion.button>

      <p className="text-xs text-stone-400 text-center">
        By submitting this form, you agree to be contacted regarding your inquiry.
      </p>
    </form>
  );
}

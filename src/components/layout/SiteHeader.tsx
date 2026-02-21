"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/available-works", label: "Available Works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">
            <Link href="/" className="group">
              <h1
                style={{ fontFamily: "var(--font-cormorant), serif" }}
                className="text-[22px] sm:text-[26px] md:text-[30px] font-light tracking-[0.04em] text-[#1a1a1a] uppercase"
              >
                HEARTS CREATIONS
              </h1>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[13px] tracking-[0.02em] text-[#555] hover:text-[#1a1a1a] transition-colors duration-200",
                    pathname === link.href && "text-[#1a1a1a] font-medium"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#1a1a1a]"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="border-b border-gray-200" />
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[73px] md:h-[81px]" />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-200">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <span
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                    className="text-[22px] font-light tracking-[0.04em] text-[#1a1a1a] uppercase"
                  >
                    HEARTS CREATIONS
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1a1a1a]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-4 text-[16px] tracking-[0.02em] text-[#555] hover:text-[#1a1a1a] transition-colors border-b border-gray-100",
                          pathname === link.href && "text-[#1a1a1a] font-medium"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="px-6 pb-8 text-sm text-[#999]">
                <p>arunimajain02@gmail.com</p>
                <p className="mt-1">+91 80550 69122</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/available-works", label: "Available Works" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("light");

  const getThemeFromDom = () => {
    const headerEl = headerRef.current;
    const headerHeight = headerEl?.offsetHeight ?? 80;

    const els = document.elementsFromPoint(window.innerWidth / 2, headerHeight + 8);
    const target = els.find((el) => !headerEl?.contains(el)) as HTMLElement | undefined;

    let node: HTMLElement | null = target ?? null;
    while (node) {
      const theme = node.dataset?.navTheme;
      if (theme === "dark" || theme === "light") return theme;
      node = node.parentElement;
    }

    return "light";
  };

  useEffect(() => {
    let raf = 0;

    const update = () => {
      setIsScrolled(window.scrollY > 50);
      setNavTheme(getThemeFromDom());
    };

    const scheduleUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const isDark = navTheme === "dark";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isDark
            ? isScrolled
              ? "bg-stone-950/70 backdrop-blur-md border-b border-white/10 py-3"
              : "bg-transparent py-5"
            : "bg-white/95 backdrop-blur-md shadow-sm py-3"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col"
            >
              <span
                className={cn(
                  "text-lg md:text-xl font-light tracking-[0.26em] transition-colors duration-300",
                  isDark ? "text-white" : "text-stone-900"
                )}
              >
                HEARTS
                <span className="font-medium text-rose-600">CREATIONS</span>
              </span>
              <span
                className={cn(
                  "text-[9px] tracking-[0.22em] uppercase transition-colors duration-300",
                  isDark ? "text-white/70" : "text-stone-500"
                )}
              >
                by Arunima Jain
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] tracking-[0.16em] uppercase transition-all duration-300 hover:opacity-70 relative group",
                  isDark ? "text-white" : "text-stone-700"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                "ml-3 px-5 py-2 text-[13px] tracking-[0.16em] uppercase border transition-all duration-300",
                isDark
                  ? "border-white/70 text-white hover:bg-white hover:text-stone-900"
                  : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
              )}
            >
              Inquire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 transition-colors",
              isDark ? "text-white" : "text-stone-900"
            )}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-light tracking-[0.3em] text-white">
                  HEARTS<span className="font-medium text-rose-500">CREATIONS</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl text-white tracking-wider uppercase hover:text-rose-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="text-center text-white/50 text-sm">
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

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"dark" | "light">("light");
  const pathname = usePathname();
  const brandOutline: CSSProperties = {
    WebkitTextStroke: "0.4px var(--accent)",
    color: "#0a0a0a",
  };
  const monoDark: CSSProperties = {
    backgroundImage:
      "linear-gradient(145deg, rgba(201,166,70,0.95), rgba(255,233,186,0.9))",
    color: "#0a0a0a",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  };
  const monoLight: CSSProperties = {
    color: "#111",
    border: "1px solid rgba(0,0,0,0.12)",
    backgroundColor: "rgba(255,255,255,0.9)",
  };

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
      setIsScrolled(window.scrollY > 24);
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

  useEffect(() => {
    // On route change, optimistically reset to light, then read actual theme
    setNavTheme("light");
    const raf = requestAnimationFrame(() => {
      setNavTheme(getThemeFromDom());
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const isDark = navTheme === "dark";
  const heartStyle: CSSProperties = isDark
    ? { WebkitTextStroke: "0.4px var(--accent)", color: "#f5f5f5", letterSpacing: "0.18em" }
    : { color: "#111", letterSpacing: "0.18em" };
  const creationsStyle: CSSProperties = { color: "var(--accent)", letterSpacing: "0.18em" };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-[background-color,backdrop-filter,border-color,padding] duration-500",
          isDark && "theme-dark",
          isScrolled
            ? "py-3 bg-[color:color-mix(in_srgb,var(--background)_80%,transparent)] backdrop-blur-xl border-b border-border"
            : "py-4 bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full p-[2px] overflow-hidden border border-[rgba(201,166,70,0.9)] shadow-[0_8px_20px_rgba(0,0,0,0.28)] bg-[linear-gradient(145deg,#200c14,#2b101a,#3a1723)]">
                <Image
                  src="/HC_Logo.webp"
                  alt="Hearts Creations logo"
                  width={96}
                  height={96}
                  sizes="44px"
                  className="h-full w-full rounded-full object-contain bg-[#0c0c0e]"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium uppercase flex items-center gap-1 sm:gap-2">
                  <span style={heartStyle}>HEARTS</span>
                  <span style={creationsStyle}>CREATIONS</span>
                </span>
                <span
                  className="mt-1 text-[9px] tracking-[0.22em] uppercase font-medium text-foreground"
                >
                  by Arunima Jain
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[12px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors",
                  "relative after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                "ml-2 inline-flex items-center justify-center rounded-full font-semibold",
                "h-11 px-5 text-[12px] tracking-[0.18em] uppercase",
                "bg-[linear-gradient(135deg,#d6b356,#f4dd9a)] text-[#0b0b0d]",
                "shadow-[0_10px_28px_rgba(0,0,0,0.24)]",
                "border border-[rgba(201,166,70,0.8)]",
                "transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.32)] hover:brightness-105"
              )}
            >
              Inquire
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[color:color-mix(in_srgb,var(--card)_70%,transparent)]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "fixed inset-0 z-50",
              "bg-[color:color-mix(in_srgb,#050506_88%,transparent)] backdrop-blur-xl theme-dark"
            )}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full p-[2px] overflow-hidden border border-[rgba(201,166,70,0.9)] shadow-[0_8px_20px_rgba(0,0,0,0.28)] bg-[linear-gradient(145deg,#200c14,#2b101a,#3a1723)]">
                    <Image
                      src="/HC_Logo.webp"
                      alt="Hearts Creations logo"
                      width={96}
                      height={96}
                      sizes="44px"
                      className="h-full w-full rounded-full object-contain bg-[#0c0c0e]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium uppercase flex items-center gap-1.5 text-foreground">
                      <span style={heartStyle}>HEARTS</span>
                      <span style={creationsStyle}>CREATIONS</span>
                    </span>
                    <span
                      className="mt-1 text-[9px] tracking-[0.22em] uppercase font-medium text-foreground"
                    >
                      by Arunima Jain
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-8">
                <div className="grid gap-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-5 py-4 min-h-[56px] text-foreground"
                      >
                        <span className="text-[13px] tracking-[0.18em] uppercase">
                          {link.label}
                        </span>
                        <span className="text-accent text-base">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="px-6 pb-8 text-xs text-muted-foreground">
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

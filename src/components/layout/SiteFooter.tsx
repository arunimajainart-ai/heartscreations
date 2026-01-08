"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  collections: [
    { label: "Abstract Expressions", href: "/collections/abstract-expressions" },
    { label: "Sacred Energies", href: "/collections/sacred-energies" },
    { label: "Divine Symmetry", href: "/collections/divine-symmetry" },
  ],
};

export function SiteFooter() {
  const pathname = usePathname();
  const hideCta = pathname === "/contact";
  const monoDark: CSSProperties = {
    backgroundImage:
      "linear-gradient(145deg, rgba(201,166,70,0.95), rgba(255,233,186,0.9))",
    color: "#0a0a0a",
    boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
  };

  return (
    <footer data-nav-theme="dark" className="theme-dark bg-background text-foreground">
      <div className="relative overflow-hidden border-t border-border">
        {!hideCta && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[980px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,166,70,0.16),transparent_62%)] blur-3xl" />
            </div>

            <Container className="relative py-14 md:py-16">
              <GlassCard className="p-6 md:p-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[11px] tracking-[0.34em] uppercase text-accent">
                      Transform your space
                    </p>
                    <h2
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                      className="mt-3 text-[clamp(1.9rem,3vw,2.75rem)] font-light leading-[1.06]"
                    >
                      Ready to own a piece of art?
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-[1.85] text-muted-foreground">
                      Commission a bespoke artwork or explore the curated collection. A calm,
                      premium experience—designed to let the art breathe.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full h-12 px-6 text-sm font-medium tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] bg-accent text-accent-foreground hover:bg-[color:color-mix(in_srgb,var(--accent)_86%,black)]"
                  >
                    Start a commission
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassCard>
            </Container>
          </>
        )}
      </div>

      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold uppercase"
                  style={monoDark}
                >
                  HC
                </span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-medium tracking-[0.3em] uppercase">
                    HEARTS<span className="text-accent">CREATIONS</span>
                  </span>
                  <span className="mt-1 text-[9px] tracking-[0.24em] uppercase text-muted-foreground">
                    by Arunima Jain
                  </span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/Hearts_Creations"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:arunimajain02@gmail.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {footerLinks.explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Collections
            </p>
            <ul className="mt-5 space-y-3">
              {footerLinks.collections.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Contact
            </p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="mailto:arunimajain02@gmail.com"
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  arunimajain02@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918055069122"
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +91 80550 69122
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hearts Creations. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for calm, crafted for art.
          </p>
        </div>
      </Container>
    </footer>
  );
}

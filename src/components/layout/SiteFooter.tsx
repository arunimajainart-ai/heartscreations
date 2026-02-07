"use client";

import Link from "next/link";

const footerLinks = [
  { label: "Commissions", href: "/contact" },
  { label: "Shipping FAQs", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-14">
        {/* Footer links */}
        <div className="flex flex-wrap gap-6 justify-center text-[13px] text-[#666] mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#333] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[12px] text-[#999] tracking-wide uppercase">
            Copyright &copy; Hearts Creations {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

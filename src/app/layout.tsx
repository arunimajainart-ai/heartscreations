import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArtistJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heartscreations.com"),
  title: {
    default: "Hearts Creations by Arunima Jain | Contemporary Artist",
    template: "%s | Hearts Creations",
  },
  description:
    "Discover the captivating artworks of Arunima Jain. From abstract expressions to sacred Pichwai paintings, experience art that transforms spaces and touches souls.",
  keywords: [
    "Arunima Jain",
    "Hearts Creations",
    "Contemporary Artist",
    "Indian Art",
    "Abstract Art",
    "Pichwai Painting",
    "Sacred Art",
    "Nandi Painting",
    "Art Commission",
    "Buy Art Online India",
  ],
  authors: [{ name: "Arunima Jain" }],
  creator: "Arunima Jain",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://heartscreations.com",
    siteName: "Hearts Creations by Arunima Jain",
    title: "Hearts Creations by Arunima Jain | Contemporary Artist",
    description:
      "Discover the captivating artworks of Arunima Jain. From abstract expressions to sacred Pichwai paintings, experience art that transforms spaces and touches souls.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hearts Creations by Arunima Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hearts Creations by Arunima Jain",
    description: "Contemporary art that transforms spaces and touches souls.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/favicon/site.webmanifest" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <ArtistJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

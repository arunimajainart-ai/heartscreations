# Hearts Creations by Arunima Jain

A premium Next.js 15 artist portfolio website for contemporary artist Arunima Jain (Hearts_Creations).

## ✨ Features

- **Premium Gallery Experience** - Museum-quality artwork presentation with zoom modals
- **Curated Collections** - Organized artwork series (Abstract Expressions, Sacred Energies, Divine Symmetry, Modern Textures)
- **Framer Motion Animations** - Smooth parallax scrolling, fade-ups, and hover effects
- **Responsive Design** - Mobile-first approach with elegant layouts
- **SEO Optimized** - JSON-LD structured data for Artist and Artwork schemas
- **Contact Form** - Commission inquiry system with elegant UI
- **Accessibility** - ARIA labels, keyboard navigation, 4.5:1 contrast ratios

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond, Inter

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── portfolio/         # All artworks gallery
│   ├── collections/       # Collection pages
│   ├── artwork/[slug]/    # Individual artwork detail
│   ├── about/             # Artist biography
│   └── contact/           # Commission/contact form
├── components/
│   ├── sections/          # Page sections (Hero, FeaturedWorks, etc.)
│   ├── ui/                # Reusable components (Navigation, Footer, etc.)
│   └── seo/               # JSON-LD structured data
├── data/                  # Artwork and collection data
└── lib/                   # Utility functions
```

## 🎨 Adding Real Artwork Images

Replace placeholder SVG files in `public/artworks/` with actual artwork images:

1. Add your artwork images (recommended: WebP or optimized JPG)
2. Update `src/data/artworks.ts` with correct file paths
3. Update `public/artist-profile.svg` with actual artist photo

## 📧 Contact Information

- **Email**: arunimajain02@gmail.com
- **Phone**: +91 80550 69122
- **Instagram**: @Hearts_Creations

## 📄 License

© 2024 Hearts Creations by Arunima Jain. All rights reserved.

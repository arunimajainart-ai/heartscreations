export function ArtistJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arunima Jain",
    alternateName: "Hearts Creations by Arunima Jain",
    description:
      "Contemporary artist specializing in abstract expressions, sacred Indian art, Pichwai paintings, and modern mixed media artworks.",
    url: "https://heartscreations.com",
    image: "https://heartscreations.com/artist-profile.jpg",
    sameAs: [
      "https://instagram.com/Hearts_Creations",
    ],
    jobTitle: "Contemporary Artist",
    knowsAbout: [
      "Abstract Art",
      "Pichwai Painting",
      "Sacred Art",
      "Acrylic Painting",
      "Mixed Media Art",
      "Indian Traditional Art",
    ],
    email: "arunimajain02@gmail.com",
    telephone: "+91-80550-69122",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  return (
    <script
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArtworkJsonLdProps {
  title: string;
  description: string;
  image: string;
  dateCreated: string;
  medium: string;
  size: string;
  url: string;
}

export function ArtworkJsonLd({
  title,
  description,
  image,
  dateCreated,
  medium,
  size,
  url,
}: ArtworkJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: title,
    description: description,
    image: image,
    dateCreated: dateCreated,
    artMedium: medium,
    width: size.split("×")[0]?.trim(),
    height: size.split("×")[1]?.trim(),
    url: url,
    creator: {
      "@type": "Person",
      name: "Arunima Jain",
      url: "https://heartscreations.com",
    },
    artform: "Painting",
  };

  return (
    <script
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hearts Creations by Arunima Jain",
    alternateName: "Hearts Creations",
    url: "https://heartscreations.com",
    description:
      "Official portfolio of contemporary artist Arunima Jain featuring abstract expressions, sacred energies, divine symmetry, and modern texture artworks.",
    publisher: {
      "@type": "Person",
      name: "Arunima Jain",
    },
  };

  return (
    <script
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

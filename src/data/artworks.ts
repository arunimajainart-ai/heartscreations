export interface Artwork {
  id: string;
  title: string;
  slug: string;
  size: string;
  medium: string;
  year: number;
  technique: string;
  collection: string;
  collectionSlug: string;
  essence: string;
  description?: string;
  vastuPlacement?: string;
  image: string;
  featured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
}

export const collections: Collection[] = [
  {
    id: "abstract-expressions",
    name: "Abstract Expressions",
    slug: "abstract-expressions",
    tagline: "Bold color energy & introspection",
    description: "A journey through vibrant collisions of color, where emotion becomes movement and chaos transforms into serene beauty. Each piece captures the fleeting moment where thought surrenders to pure feeling.",
    coverImage: "/artworks/bird-window.svg",
  },
  {
    id: "sacred-energies",
    name: "Sacred Energies",
    slug: "sacred-energies",
    tagline: "The divine strength of silence",
    description: "Works that channel ancient power and protective aura. Inspired by sacred symbolism, these pieces bring Vastu-aligned energy and spiritual grounding to any space they inhabit.",
    coverImage: "/artworks/nandi.svg",
  },
  {
    id: "divine-symmetry",
    name: "Divine Symmetry",
    slug: "divine-symmetry",
    tagline: "Sacred geometry & prosperity",
    description: "Pichwai-inspired masterpieces celebrating divine motherhood, lotus symbolism, and timeless Indian artistic traditions. Each stroke honors centuries of spiritual artistry.",
    coverImage: "/artworks/pichwai-cow.svg",
  },
  {
    id: "modern-textures",
    name: "Modern Textures",
    slug: "modern-textures",
    tagline: "Contemporary collectibles",
    description: "Layered explorations of texture and form, blending traditional techniques with contemporary vision. Mixed media works that reward closer inspection with deeper meaning.",
    coverImage: "/artworks/texture-abstract.svg",
  },
];

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "The Watcher",
    slug: "the-watcher",
    size: '12" × 12"',
    medium: "Acrylic on Canvas",
    year: 2024,
    technique: "Abstract Expressionism",
    collection: "Abstract Expressions",
    collectionSlug: "abstract-expressions",
    essence: "Calm amidst chaos",
    description: "A solitary bird perched between worlds of fire and ice. The deep crimson meets ethereal teal in a dance of opposing forces, while the centered figure remains still — an observer of life's beautiful contradictions.",
    image: "/artworks/bird-window.svg",
    featured: true,
  },
  {
    id: "2",
    title: "Nandi - The Divine Guardian",
    slug: "nandi-divine-guardian",
    size: '24" × 18"',
    medium: "Acrylic on Canvas",
    year: 2024,
    technique: "Sacred Symbolism",
    collection: "Sacred Energies",
    collectionSlug: "sacred-energies",
    essence: "Strength in devotion",
    description: "The mighty Nandi emerges from deep crimson depths, his silver crescent horns catching divine light. With the sacred Shiva lingam and trishul adorning his form, he embodies unwavering devotion and protective power.",
    vastuPlacement: "Ideal for entrance halls or puja rooms. Facing east brings prosperity and removes obstacles. The red background activates the south direction for fame and recognition.",
    image: "/artworks/nandi.svg",
    featured: true,
  },
  {
    id: "3",
    title: "Kamadhenu's Grace",
    slug: "kamadhenus-grace",
    size: '36" × 24"',
    medium: "Natural Pigments on Cloth",
    year: 2024,
    technique: "Traditional Pichwai",
    collection: "Divine Symmetry",
    collectionSlug: "divine-symmetry",
    essence: "Abundance through nurturing",
    description: "The sacred cow Kamadhenu nurtures her calf amidst a garden of blooming lotuses. This traditional Pichwai artwork celebrates divine motherhood, prosperity, and the eternal cycle of giving and receiving.",
    vastuPlacement: "Perfect for living rooms or dining areas. The cow symbolizes prosperity and the lotuses bring purity. North or northeast placement enhances positive energy flow.",
    image: "/artworks/pichwai-cow.svg",
    featured: true,
  },
  {
    id: "4",
    title: "Crimson Depths",
    slug: "crimson-depths",
    size: '18" × 18"',
    medium: "Acrylic on Canvas",
    year: 2023,
    technique: "Abstract Layering",
    collection: "Modern Textures",
    collectionSlug: "modern-textures",
    essence: "Passion beneath surface",
    description: "Layers of deep red and burgundy create a textured landscape of emotion. Each brushstroke adds depth to the narrative of hidden passions waiting to emerge.",
    image: "/artworks/texture-abstract.svg",
    featured: false,
  },
  {
    id: "5",
    title: "Ocean's Memory",
    slug: "oceans-memory",
    size: '20" × 16"',
    medium: "Acrylic on Canvas",
    year: 2024,
    technique: "Abstract Expressionism",
    collection: "Abstract Expressions",
    collectionSlug: "abstract-expressions",
    essence: "Flow and release",
    description: "Teal waves crash against golden shores in this meditation on memory and time. The fluidity of water meets the permanence of earth in an eternal dance.",
    image: "/artworks/ocean-abstract.svg",
    featured: false,
  },
  {
    id: "6",
    title: "Golden Lotus Mandala",
    slug: "golden-lotus-mandala",
    size: '24" × 24"',
    medium: "Acrylic with Gold Leaf",
    year: 2024,
    technique: "Sacred Geometry",
    collection: "Divine Symmetry",
    collectionSlug: "divine-symmetry",
    essence: "Inner illumination",
    description: "Concentric lotus petals unfold in perfect symmetry, touched by real gold leaf. A meditation in visual form, inviting the viewer to journey inward toward their own center of peace.",
    vastuPlacement: "Excellent for meditation spaces or bedroom. The mandala pattern promotes mental clarity. Center of home or northeast corner maximizes spiritual benefits.",
    image: "/artworks/lotus-mandala.svg",
    featured: false,
  },
];

export const getFeaturedArtworks = () => artworks.filter((a) => a.featured);

export const getArtworksByCollection = (collectionSlug: string) =>
  artworks.filter((a) => a.collectionSlug === collectionSlug);

export const getArtworkBySlug = (slug: string) =>
  artworks.find((a) => a.slug === slug);

export const getCollectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);

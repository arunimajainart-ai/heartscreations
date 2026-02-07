export interface Artwork {
  id: string;
  title: string;
  slug: string;
  artist?: string;
  size?: string;
  medium: string;
  description: string;
  bulletPoints?: string[];
  vastuEffect?: string;
  vastuPlacement?: string[];
  symbolism?: { label: string; text: string }[];
  image: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "A Moment Between Worlds",
    slug: "a-moment-between-worlds",
    artist: "By Arunima Jain",
    size: '24" by 24"',
    medium: "Acrylic on canvas",
    description:
      "This painting represents:",
    bulletPoints: [
      "Calm amidst chaos",
      "Balance of energies",
      "Mindfulness and inner strength",
    ],
    vastuEffect:
      "Rather than bringing heaviness, it encourages introspection, grounding, and emotional balance.",
    image: "/abstract_collection.webp",
  },
  {
    id: "2",
    title: "Nandi painting",
    slug: "nandi-painting",
    medium: "Acrylic on canvas",
    description:
      "Vastu effect of the painting—\nThis artwork brings strong, determined, and protective energy into a space.",
    vastuPlacement: [
      "South wall (most powerful choice)",
      "South-East corner",
      "Home office / workspace",
      "Living room (on the wall behind where you sit)",
    ],
    image: "/nandi_art.webp",
  },
  {
    id: "3",
    title: "Pichwai painting",
    slug: "pichwai-painting",
    medium: "Acrylic on 300 gsm paper",
    size: "40 inch by 18 inch",
    description: "Symbolism:",
    symbolism: [
      { label: "Cow and calf", text: "Prosperity, motherhood, abundance, and sacredness" },
      { label: "Lotus flowers", text: "Purity, spiritual awakening, and divine beauty" },
      { label: "Symmetry & repetition", text: "Harmony, balance, and cosmic order" },
    ],
    image: "/divine_art.webp",
  },
];

export const getArtworkBySlug = (slug: string) =>
  artworks.find((a) => a.slug === slug);

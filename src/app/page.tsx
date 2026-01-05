import Hero from "@/components/sections/Hero";
import ArtistStatement from "@/components/sections/ArtistStatement";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";

export default function Home() {
  return (
    <div className="page-transition">
      <Hero />
      <ArtistStatement />
      <FeaturedWorks />
      <CollectionsShowcase />
    </div>
  );
}

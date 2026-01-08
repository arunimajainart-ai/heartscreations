import Hero from "@/components/sections/Hero";
import ArtistStatement from "@/components/sections/ArtistStatement";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";

export default function Home() {
  return (
    <div className="page-transition">
      <Hero />
      <ArtistStatement />
      <CollectionsShowcase />
    </div>
  );
}

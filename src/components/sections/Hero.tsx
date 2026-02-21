"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { useArtworks } from "@/lib/useFirestoreData";
import { HeroSkeleton } from "@/components/ui/Skeleton";

export default function Hero() {
  const { artworks, loading } = useArtworks(true);
  const [current, setCurrent] = useState(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroImages = useMemo(
    () =>
      artworks
        .filter((a) => a.image && a.image.trim() !== "")
        .map((a) => ({ src: a.image, alt: a.title })),
    [artworks]
  );

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (heroImages.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
  }, [heroImages.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer();
  };

  if (loading && heroImages.length === 0) {
    return <HeroSkeleton />;
  }

  if (heroImages.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "calc(100vh - 81px)" }}
    >
      {/* Skeleton shimmer underneath until first image loads */}
      {!firstImageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}

      {heroImages.map((slide, i) => {
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-contain transition-opacity duration-[1.5s] ease-in-out z-[1] ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
            priority={i === 0}
            onLoad={() => {
              if (i === 0) setFirstImageLoaded(true);
            }}
          />
        );
      })}

      {/* Subtle bottom gradient for indicators */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-[2]" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-white"
                : "w-4 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

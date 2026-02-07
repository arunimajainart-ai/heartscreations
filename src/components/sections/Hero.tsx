"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { artworks } from "@/data/artworks";

const heroImages = artworks
  .filter(
    (a) =>
      a.image.endsWith(".webp") ||
      a.image.endsWith(".jpeg") ||
      a.image.endsWith(".jpg") ||
      a.image.endsWith(".png")
  )
  .map((a) => ({ src: a.image, alt: a.title }));

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
  }, []);

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

  if (heroImages.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "calc(100vh - 81px)" }}
    >
      {heroImages.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[1.5s] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Subtle bottom gradient for indicators */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-[1]" />

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

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types/marketplace";

interface FeaturedSliderProps {
  products: Product[];
}

/*
  Uses native CSS scroll-snap rather than a JS carousel library — matches
  the project's existing snap-x pattern (see EventsSection) and gives
  free, buttery touch/swipe momentum on mobile. Dot indicators are driven
  by an IntersectionObserver watching which slide is centered, so they
  stay accurate even through a fast flick past multiple slides.
*/
export default function FeaturedSlider({ products }: FeaturedSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = slideRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: track, threshold: [0.6] },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [products.length]);

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto hide-scrollbar px-6 -mx-6 pb-1"
        style={{ scrollPaddingLeft: "1.5rem" }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="relative shrink-0 snap-center overflow-hidden rounded-lg border border-foreground/10"
            style={{ width: "85%" }}
          >
            <div className="relative aspect-[16/10] w-full">
              <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-circuit-navy/90 via-circuit-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-aces-blue/90">
                  {product.vendorName}
                </p>
                <p className="mt-0.5 text-lg font-semibold leading-tight text-white">
                  {product.title}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">GHS {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cnDot(i === activeIndex)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function cnDot(active: boolean) {
  return `h-1.5 rounded-full transition-all ${active ? "w-5 bg-aces-blue" : "w-1.5 bg-foreground/15"}`;
}

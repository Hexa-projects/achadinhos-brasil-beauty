import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    setActive(Math.round(scrollLeft / width));
  };

  return (
    <div className="relative">
      <div ref={containerRef} onScroll={handleScroll} className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-2 sm:overflow-visible">
        {images.map((src, i) => (
          <motion.div key={i} className="w-full shrink-0 snap-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <img src={src} alt={`${title} - imagem ${i + 1}`} className="aspect-square w-full rounded-2xl bg-muted object-cover sm:rounded-xl" loading={i > 0 ? "lazy" : "eager"} />
          </motion.div>
        ))}
      </div>
      {/* Dots mobile */}
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {images.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-200 ${active === i ? "w-4 bg-primary" : "w-1.5 bg-border"}`} />
        ))}
      </div>
    </div>
  );
}

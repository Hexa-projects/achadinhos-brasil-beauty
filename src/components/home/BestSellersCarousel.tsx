import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NormalizedProduct } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: NormalizedProduct[];
  ctaTo?: string;
  ctaQuery?: string;
}

export function BestSellersCarousel({ eyebrow, title, subtitle, products, ctaQuery }: Props) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-end justify-between gap-4"
      >
        <div>
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          <h2 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            {title}
          </h2>
          {subtitle && <p className="mt-1 max-w-md text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link
          to="/buscar"
          search={ctaQuery ? { q: ctaQuery } : undefined}
          className="hidden shrink-0 items-center gap-1 text-[13px] font-medium text-primary hover:underline sm:inline-flex"
        >
          Ver todos <ArrowRight size={14} />
        </Link>
      </motion.div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { NormalizedProduct } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

export function ProductCard({ product }: { product: NormalizedProduct }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title} adicionado à sacola`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group w-44 shrink-0 sm:w-full"
    >
      <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative mb-3 overflow-hidden rounded-2xl bg-warm shadow-soft transition-shadow duration-300 group-hover:shadow-premium">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Badges */}
          <div className="pointer-events-none absolute inset-x-2 top-2 flex items-start justify-between gap-2">
            {product.badge ? (
              <span className="rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-card backdrop-blur-md">
                {product.badge}
              </span>
            ) : <span />}
            {product.discountPercentage ? (
              <span className="rounded-full bg-discount px-2 py-1 text-[10px] font-bold text-success-foreground shadow-soft">
                -{product.discountPercentage}%
              </span>
            ) : null}
          </div>
          {/* Quick add (desktop hover) */}
          <button
            onClick={handleAdd}
            className="absolute inset-x-3 bottom-3 hidden h-10 items-center justify-center gap-1.5 rounded-xl bg-card/95 text-xs font-semibold text-foreground shadow-premium backdrop-blur-md transition-all duration-300 group-hover:flex hover:bg-card"
            aria-label={`Adicionar ${product.title} à sacola`}
          >
            <ShoppingBag size={14} strokeWidth={2.2} />
            Adicionar
          </button>
        </div>

        <div className="px-0.5">
          {product.brand && (
            <p className="editorial-eyebrow text-[10px] tracking-[0.16em]">{product.brand}</p>
          )}
          <h3 className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
            {product.title}
          </h3>

          {product.rating ? (
            <div className="mt-1 flex items-center gap-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-medium text-foreground">{product.rating.toFixed(1)}</span>
              {product.reviewCount && (
                <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
              )}
            </div>
          ) : null}

          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Mobile-visible buy button */}
      <button
        onClick={handleAdd}
        className="btn-cta mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 text-[12px] sm:hidden"
        aria-label={`Adicionar ${product.title} à sacola`}
      >
        <ShoppingBag size={13} />
        Comprar
      </button>
    </motion.div>
  );
}

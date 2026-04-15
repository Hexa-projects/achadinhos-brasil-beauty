import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group w-44 shrink-0 sm:w-52"
    >
      <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative mb-2 overflow-hidden rounded-xl bg-muted">
          <img src={product.images[0]} alt={product.title} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-md bg-foreground/80 px-2 py-0.5 text-[10px] font-semibold text-card backdrop-blur-sm">{product.badge}</span>
          )}
          {product.discountPercentage && (
            <span className="absolute right-2 top-2 rounded-md bg-discount px-1.5 py-0.5 text-[10px] font-bold text-success-foreground">-{product.discountPercentage}%</span>
          )}
        </div>
        {product.brand && <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</p>}
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">{product.title}</h3>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-foreground">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-[11px] text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</span>
          )}
        </div>
      </Link>
      <button onClick={handleAdd} className="btn-cta btn-cta-pulse mt-2 flex h-9 w-full items-center justify-center gap-1.5 text-xs" aria-label={`Adicionar ${product.title} à sacola`}>
        <ShoppingBag size={14} />
        Comprar
      </button>
    </motion.div>
  );
}

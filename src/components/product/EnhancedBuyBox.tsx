import { Star, Shield, Truck, RefreshCw, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";
import type { NormalizedProduct } from "@/types/product";
import { ProductPrice } from "./ProductPrice";
import { formatCurrency, formatInstallments } from "@/utils/formatCurrency";
import { QuantitySelector } from "@/components/shared/QuantitySelector";

interface Props {
  product: NormalizedProduct;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAdd: () => void;
}

export function EnhancedBuyBox({ product, quantity, onQuantityChange, onAdd }: Props) {
  const savings =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0;

  return (
    <div className="space-y-5">
      {/* Brand + title */}
      <div>
        {product.brand && (
          <p className="editorial-eyebrow">{product.brand}</p>
        )}
        <h1 className="mt-1.5 text-balance text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
          {product.title}
        </h1>
        {product.subtitle && (
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            {product.subtitle}
          </p>
        )}
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-border"}
              />
            ))}
          </div>
          <span className="text-[12px] font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span className="text-[12px] text-muted-foreground">·</span>
          <a href="#avaliacoes" className="text-[12px] text-muted-foreground underline-offset-2 hover:underline">
            {product.reviewCount} avaliações
          </a>
        </div>
      )}

      {/* Price */}
      <div className="space-y-1.5">
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          discountPercentage={product.discountPercentage}
        />
        {savings > 0 && (
          <p className="text-[12px] font-medium text-discount">
            Você economiza {formatCurrency(savings)}
          </p>
        )}
        {product.price >= 30 && (
          <p className="text-[12px] text-muted-foreground">{formatInstallments(product.price)}</p>
        )}
      </div>

      {/* CTA desktop */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={onQuantityChange} />
          <button
            onClick={onAdd}
            className="btn-cta btn-cta-pulse flex h-12 flex-1 items-center justify-center gap-2 text-[13px] font-semibold"
          >
            <ShoppingBag size={15} />
            Adicionar à Sacola · {formatCurrency(product.price * quantity)}
          </button>
        </div>
      </div>

      {/* Trust list */}
      <ul className="space-y-2 rounded-2xl border border-border bg-warm/60 p-4">
        <li className="flex items-center gap-2.5 text-[12.5px] text-foreground">
          <Shield size={14} strokeWidth={1.7} className="shrink-0 text-primary" />
          Compra 100% segura — pagamento criptografado
        </li>
        <li className="flex items-center gap-2.5 text-[12.5px] text-foreground">
          <Truck size={14} strokeWidth={1.7} className="shrink-0 text-primary" />
          Entrega em 2–7 dias úteis com rastreio em tempo real
        </li>
        <li className="flex items-center gap-2.5 text-[12.5px] text-foreground">
          <RefreshCw size={14} strokeWidth={1.7} className="shrink-0 text-primary" />
          Trocas facilitadas em até 7 dias
        </li>
        <li className="flex items-center gap-2.5 text-[12.5px] text-foreground">
          <Sparkles size={14} strokeWidth={1.7} className="shrink-0 text-primary" />
          Produto curado e original — nota fiscal sempre
        </li>
      </ul>

      {/* Stock urgency */}
      {product.stock !== undefined && product.stock < 50 && (
        <div className="flex items-center gap-2 text-[12px] font-medium text-discount">
          <CheckCircle2 size={14} />
          Em estoque · {product.stock} unidades disponíveis
        </div>
      )}
    </div>
  );
}

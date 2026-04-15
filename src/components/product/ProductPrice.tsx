import { formatCurrency } from "@/utils/formatCurrency";

export function ProductPrice({ price, compareAtPrice, discountPercentage }: { price: number; compareAtPrice?: number | null; discountPercentage?: number | null }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="text-2xl font-bold tracking-tight text-foreground">{formatCurrency(price)}</span>
      {compareAtPrice && (
        <span className="text-sm text-muted-foreground line-through">{formatCurrency(compareAtPrice)}</span>
      )}
      {discountPercentage && (
        <span className="rounded-md bg-discount/10 px-1.5 py-0.5 text-xs font-semibold text-discount">-{discountPercentage}%</span>
      )}
    </div>
  );
}

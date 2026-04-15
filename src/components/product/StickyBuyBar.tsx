import { formatCurrency } from "@/utils/formatCurrency";
import { ShoppingBag } from "lucide-react";
import { QuantitySelector } from "@/components/shared/QuantitySelector";

interface Props {
  price: number;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAdd: () => void;
}

export function StickyBuyBar({ price, quantity, onQuantityChange, onAdd }: Props) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-30 border-t border-border bg-card/95 px-4 py-3 backdrop-blur-md safe-bottom md:hidden">
      <div className="flex items-center gap-3">
        <QuantitySelector value={quantity} onChange={onQuantityChange} />
        <button onClick={onAdd} className="btn-cta flex h-11 flex-1 items-center justify-center gap-2 text-sm font-semibold" aria-label="Adicionar à sacola">
          <ShoppingBag size={16} />
          Comprar · {formatCurrency(price * quantity)}
        </button>
      </div>
    </div>
  );
}

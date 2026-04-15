import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { EmptyState } from "@/components/shared/EmptyState";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="text-base font-bold">Sacola ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <EmptyState icon={<ShoppingBag size={28} className="text-muted-foreground" />} title="Sua sacola está vazia" description="Adicione produtos para continuar." actionLabel="Continuar comprando" actionTo="/" />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div key={item.product.id} layout exit={{ opacity: 0, x: 40 }} className="mb-4 flex gap-3">
                    <img src={item.product.images[0]} alt={item.product.title} className="h-20 w-20 shrink-0 rounded-lg bg-muted object-cover" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="line-clamp-1 text-sm font-medium text-foreground">{item.product.title}</p>
                        <p className="text-sm font-bold text-foreground">{formatCurrency(item.product.price)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.product.id, q)} />
                        <button onClick={() => removeItem(item.product.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label="Remover">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="border-t border-border px-4 py-4 safe-bottom">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-base font-bold text-foreground">{formatCurrency(totalPrice)}</span>
              </div>
              <Link to="/checkout" onClick={() => onOpenChange(false)} className="btn-cta flex h-12 w-full items-center justify-center text-sm font-semibold">
                Ir para Pagamento Seguro
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

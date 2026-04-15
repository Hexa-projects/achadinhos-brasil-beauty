import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useCartStore } from "@/stores/useCartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { EmptyState } from "@/components/shared/EmptyState";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { Shield, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Achadinhos Brasil" },
      { name: "description", content: "Finalize sua compra com segurança." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <EmptyState icon={<ShoppingBag size={28} className="text-muted-foreground" />} title="Sua sacola está vazia" description="Adicione produtos antes de finalizar a compra." actionLabel="Continuar comprando" actionTo="/" />
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    // TODO: call createCheckoutSession endpoint
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    window.location.href = "/checkout/sucesso?session_id=mock_session";
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto min-h-screen max-w-2xl px-4 pb-20 pt-4">
      <h1 className="mb-6 text-xl font-bold text-foreground">Resumo do Pedido</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3 rounded-xl border border-border bg-card p-3">
            <img src={item.product.images[0]} alt={item.product.title} className="h-20 w-20 shrink-0 rounded-lg bg-muted object-cover" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="line-clamp-1 text-sm font-medium text-foreground">{item.product.title}</p>
                <p className="text-sm font-bold text-foreground">{formatCurrency(item.product.price)}</p>
              </div>
              <div className="flex items-center justify-between">
                <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.product.id, q)} />
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remover"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-bold text-foreground">{formatCurrency(totalPrice)}</span></div>
        <div className="mt-1 flex justify-between text-sm"><span className="text-muted-foreground">Frete</span><span className="text-xs text-discount font-medium">Grátis</span></div>
        <div className="mt-3 border-t border-border pt-3 flex justify-between"><span className="font-semibold text-foreground">Total</span><span className="text-lg font-bold text-foreground">{formatCurrency(totalPrice)}</span></div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Shield size={14} className="text-primary" /> Pagamento seguro e criptografado
      </div>

      <button onClick={handleCheckout} disabled={loading} className="btn-cta mt-4 flex h-12 w-full items-center justify-center text-sm font-semibold disabled:opacity-60">
        {loading ? "Processando..." : "Ir para Pagamento Seguro"}
      </button>
    </motion.div>
  );
}

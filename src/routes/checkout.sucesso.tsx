import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Package } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/checkout/sucesso")({
  head: () => ({ meta: [{ title: "Pedido Confirmado — Achadinhos Brasil" }] }),
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-discount/10">
          <CheckCircle size={32} className="text-discount" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Pedido Recebido!</h1>
        <p className="mt-2 text-sm text-muted-foreground">Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link to="/conta/pedidos" className="btn-cta flex h-10 items-center justify-center gap-1.5 text-sm"><Package size={14} />Ver meus pedidos</Link>
          <Link to="/" className="flex h-10 items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-accent">Continuar comprando</Link>
        </div>
      </motion.div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/checkout/cancelado")({
  head: () => ({ meta: [{ title: "Pagamento Cancelado — Achadinhos Brasil" }] }),
  component: CheckoutCancelPage,
});

function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <XCircle size={32} className="text-destructive" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Pagamento não concluído</h1>
        <p className="mt-2 text-sm text-muted-foreground">Seu pagamento não foi finalizado. Seus itens continuam na sacola.</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link to="/checkout" className="btn-cta flex h-10 items-center justify-center text-sm">Tentar novamente</Link>
          <Link to="/" className="flex h-10 items-center justify-center rounded-xl border border-border text-sm font-medium text-foreground transition-colors hover:bg-accent">Continuar comprando</Link>
        </div>
      </motion.div>
    </div>
  );
}

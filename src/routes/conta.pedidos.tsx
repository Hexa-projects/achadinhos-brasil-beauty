import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/shared/EmptyState";
import { Package } from "lucide-react";

export const Route = createFileRoute("/conta/pedidos")({
  head: () => ({ meta: [{ title: "Meus Pedidos — Achadinhos Brasil" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  // TODO: fetch from Supabase
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto min-h-screen max-w-2xl px-4 pb-20 pt-4">
      <h1 className="mb-6 text-xl font-bold text-foreground">Meus Pedidos</h1>
      <EmptyState
        icon={<Package size={28} className="text-muted-foreground" />}
        title="Você ainda não fez pedidos"
        description="Quando você finalizar uma compra, seus pedidos aparecerão aqui."
        actionLabel="Começar a comprar"
        actionTo="/"
      />
    </motion.div>
  );
}

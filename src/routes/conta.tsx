import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, UserCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [{ title: "Minha Conta — Achadinhos Brasil" }] }),
  component: AccountPage,
});

const cards = [
  { to: "/conta/pedidos" as const, icon: Package, label: "Meus Pedidos", sub: "Acompanhe seus pedidos" },
  { to: "/conta/dados" as const, icon: UserCircle, label: "Meus Dados", sub: "Edite seu perfil" },
];

function AccountPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto min-h-screen max-w-md px-4 pb-20 pt-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">Minha Conta</h1>
      <div className="space-y-3">
        {cards.map(({ to, icon: Icon, label, sub }) => (
          <Link key={to} to={to} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary"><Icon size={20} className="text-primary" /></div>
            <div><p className="text-sm font-semibold text-foreground">{label}</p><p className="text-xs text-muted-foreground">{sub}</p></div>
          </Link>
        ))}
        <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-accent" onClick={() => { /* TODO: signOut */ }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10"><LogOut size={20} className="text-destructive" /></div>
          <div><p className="text-sm font-semibold text-foreground">Sair</p><p className="text-xs text-muted-foreground">Encerrar sessão</p></div>
        </button>
      </div>
    </motion.div>
  );
}

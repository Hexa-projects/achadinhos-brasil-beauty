import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/conta/dados")({
  head: () => ({ meta: [{ title: "Meus Dados — Achadinhos Brasil" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState("");
  const [email] = useState("usuario@email.com");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: updateProfile via Supabase
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Dados atualizados com sucesso!");
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto min-h-screen max-w-md px-4 pb-20 pt-4">
      <h1 className="mb-6 text-xl font-bold text-foreground">Meus Dados</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Nome completo</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">E-mail</label>
          <input value={email} readOnly className="h-11 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Telefone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(00) 00000-0000" className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground" />
        </div>
        <button type="submit" disabled={saving} className="btn-cta flex h-11 w-full items-center justify-center text-sm font-semibold disabled:opacity-60">
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </motion.div>
  );
}

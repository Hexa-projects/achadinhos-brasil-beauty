import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as string) || "login",
    returnTo: (search.returnTo as string) || "/",
  }),
  head: () => ({
    meta: [
      { title: "Entrar — Achadinhos Brasil" },
      { name: "description", content: "Faça login ou crie sua conta." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { tab, returnTo } = Route.useSearch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">(tab === "register" ? "register" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate with Supabase auth
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(activeTab === "login" ? "Login efetuado com sucesso!" : "Conta criada com sucesso!");
    setLoading(false);
    navigate({ to: returnTo as any });
  };

  const handleGoogle = async () => {
    setLoading(true);
    // TODO: supabase.auth.signInWithOAuth({ provider: 'google' })
    await new Promise((r) => setTimeout(r, 800));
    toast.info("Google OAuth: integração pendente");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <img src={logoSrc} alt="Achadinhos Brasil" className="mb-3 h-14 w-14 rounded-2xl object-cover" />
          <h1 className="text-lg font-bold text-foreground">Achadinhos Brasil</h1>
          <p className="text-xs text-muted-foreground">Sua loja de beleza premium</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-xl bg-secondary p-1">
          {(["login", "register"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${activeTab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {t === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {activeTab === "register" && (
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome (opcional)" className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground" />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-9 text-sm text-foreground outline-none transition-colors focus:border-primary placeholder:text-muted-foreground" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Mostrar senha">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="btn-cta flex h-11 w-full items-center justify-center text-sm font-semibold disabled:opacity-60">
            {loading ? "Aguarde..." : activeTab === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button onClick={handleGoogle} disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60">
          <svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar com Google
        </button>
      </motion.div>
    </div>
  );
}

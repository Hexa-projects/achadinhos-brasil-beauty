import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Shield, CreditCard, Truck } from "lucide-react";
import logoSrc from "@/assets/logo.png";

export function EditorialFooter() {
  return (
    <footer className="border-t border-border bg-card pb-24 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        {/* Top: brand + nav */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoSrc} alt="Achadinhos Brasil" className="h-10 w-10 rounded-xl object-cover" />
              <span className="font-display text-base font-semibold tracking-tight text-foreground">
                Achadinhos Brasil
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              Curadoria premium de health & beauty. Compra segura, seleção real,
              entrega com acompanhamento — feito no Brasil.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                aria-label="Instagram"
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Instagram size={15} />
              </a>
              <a
                aria-label="Email"
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">Loja</h3>
              <ul className="space-y-2.5 text-[13px] text-muted-foreground">
                <li><Link to="/" className="transition-colors hover:text-foreground">Início</Link></li>
                <li><Link to="/buscar" className="transition-colors hover:text-foreground">Buscar</Link></li>
                <li><Link to="/buscar" search={{ q: "Skincare" }} className="transition-colors hover:text-foreground">Skincare</Link></li>
                <li><Link to="/buscar" search={{ q: "Make" }} className="transition-colors hover:text-foreground">Make</Link></li>
                <li><Link to="/buscar" search={{ q: "Cabelos" }} className="transition-colors hover:text-foreground">Cabelos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">Conta</h3>
              <ul className="space-y-2.5 text-[13px] text-muted-foreground">
                <li><Link to="/conta" className="transition-colors hover:text-foreground">Minha Conta</Link></li>
                <li><Link to="/conta/pedidos" className="transition-colors hover:text-foreground">Meus Pedidos</Link></li>
                <li><Link to="/conta/dados" className="transition-colors hover:text-foreground">Meus Dados</Link></li>
                <li><Link to="/auth" className="transition-colors hover:text-foreground">Entrar</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">Ajuda</h3>
              <ul className="space-y-2.5 text-[13px] text-muted-foreground">
                <li><span className="cursor-default">Política de Privacidade</span></li>
                <li><span className="cursor-default">Termos de Uso</span></li>
                <li><span className="cursor-default">Trocas e Devoluções</span></li>
                <li><span className="cursor-default">Política de Frete</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-warm px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-[12px] text-foreground"><Shield size={14} className="text-primary" /> Site seguro</span>
            <span className="flex items-center gap-1.5 text-[12px] text-foreground"><CreditCard size={14} className="text-primary" /> Pagamento protegido</span>
            <span className="flex items-center gap-1.5 text-[12px] text-foreground"><Truck size={14} className="text-primary" /> Entrega rastreada</span>
          </div>
          <p className="text-[11px] text-muted-foreground">CNPJ 00.000.000/0001-00 · São Paulo, Brasil</p>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-5 text-center text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Achadinhos Brasil — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

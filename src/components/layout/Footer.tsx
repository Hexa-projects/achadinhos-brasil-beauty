import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-20 md:pb-8">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Achadinhos Brasil</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">Curadoria premium de produtos de health & beauty. Compra segura, seleção curada, entrega com acompanhamento.</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link to="/" className="transition-colors hover:text-foreground">Início</Link></li>
              <li><Link to="/buscar" className="transition-colors hover:text-foreground">Buscar</Link></li>
              <li><Link to="/conta" className="transition-colors hover:text-foreground">Minha Conta</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Ajuda</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><span className="cursor-default">Política de Privacidade</span></li>
              <li><span className="cursor-default">Termos de Uso</span></li>
              <li><span className="cursor-default">Trocas e Devoluções</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Achadinhos Brasil. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

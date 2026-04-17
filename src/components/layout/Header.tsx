import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import logoSrc from "@/assets/logo.png";

export function Header({ onSearchOpen, onCartOpen }: { onSearchOpen?: () => void; onCartOpen?: () => void }) {
  const totalItems = useCartStore((s) => s.totalItems());
  const hidden = useScrollDirection();

  return (
    <header className={`sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Início">
          <img src={logoSrc} alt="Achadinhos Brasil" className="h-9 w-9 rounded-xl object-cover" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
            Achadinhos<span className="hidden text-muted-foreground sm:inline"> Brasil</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/buscar" search={{ q: "Skincare" }} className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground">Skincare</Link>
          <Link to="/buscar" search={{ q: "Make" }} className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground">Make</Link>
          <Link to="/buscar" search={{ q: "Cabelos" }} className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground">Cabelos</Link>
          <Link to="/buscar" search={{ q: "Corpo" }} className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground">Corpo</Link>
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={onSearchOpen} className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Buscar">
            <Search size={19} strokeWidth={1.7} />
          </button>
          <button onClick={onCartOpen} className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Sacola">
            <ShoppingBag size={19} strokeWidth={1.7} />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

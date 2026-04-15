import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import logoSrc from "@/assets/logo.png";

export function Header({ onSearchOpen, onCartOpen }: { onSearchOpen?: () => void; onCartOpen?: () => void }) {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Início">
          <img src={logoSrc} alt="Achadinhos Brasil" className="h-9 w-9 rounded-lg object-cover" />
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">Achadinhos</span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={onSearchOpen} className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Buscar">
            <Search size={20} />
          </button>
          <button onClick={onCartOpen} className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label="Sacola">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

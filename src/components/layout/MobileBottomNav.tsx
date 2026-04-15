import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

const navItems = [
  { to: "/" as const, icon: Home, label: "Início" },
  { to: "/buscar" as const, icon: Search, label: "Buscar" },
  { to: "/checkout" as const, icon: ShoppingBag, label: "Sacola" },
  { to: "/conta" as const, icon: User, label: "Conta" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md safe-bottom md:hidden">
      <div className="flex h-14 items-center justify-around">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
          return (
            <Link key={to} to={to} className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} aria-label={label}>
              <span className="relative">
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                {label === "Sacola" && totalItems > 0 && (
                  <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">{totalItems > 9 ? "9+" : totalItems}</span>
                )}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

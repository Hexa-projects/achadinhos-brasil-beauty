import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { mockCollections } from "@/data/mockProducts";
import logoSrc from "@/assets/logo.png";

const NICHES = [
  { slug: "skincare", label: "Skincare" },
  { slug: "make", label: "Make" },
  { slug: "cabelos", label: "Cabelos" },
  { slug: "corpo", label: "Corpo & Bem-estar" },
] as const;

export function Header({ onSearchOpen, onCartOpen }: { onSearchOpen?: () => void; onCartOpen?: () => void }) {
  const totalItems = useCartStore((s) => s.totalItems());
  const hidden = useScrollDirection();
  const [hoveredNiche, setHoveredNiche] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="mx-auto flex h-15 max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent md:hidden" aria-label="Menu">
              <Menu size={20} strokeWidth={1.7} />
            </button>
            <Link to="/" className="flex items-center gap-2.5" aria-label="Início">
              <img src={logoSrc} alt="Achadinhos Brasil" className="h-9 w-9 rounded-xl object-cover" />
              <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                Achadinhos<span className="hidden text-muted-foreground sm:inline"> Brasil</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav with mega-menu */}
          <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHoveredNiche(null)}>
            {NICHES.map((n) => (
              <div key={n.slug} onMouseEnter={() => setHoveredNiche(n.slug)} className="relative">
                <Link
                  to="/nicho/$slug" params={{ slug: n.slug }}
                  className="inline-block px-3 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {n.label}
                </Link>
              </div>
            ))}
            <Link to="/kits" className="ml-1 px-3 py-2 text-[13px] font-medium text-primary hover:underline">Kits</Link>
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={onSearchOpen} className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Buscar">
              <Search size={19} strokeWidth={1.7} />
            </button>
            <button onClick={onCartOpen} className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Sacola">
              <ShoppingBag size={19} strokeWidth={1.7} />
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu desktop */}
        {hoveredNiche && (
          <div
            onMouseEnter={() => setHoveredNiche(hoveredNiche)}
            onMouseLeave={() => setHoveredNiche(null)}
            className="absolute inset-x-0 top-full hidden border-b border-border/70 bg-background/95 shadow-premium backdrop-blur-xl md:block"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8 px-4 py-8">
              <div>
                <p className="editorial-eyebrow">{NICHES.find((n) => n.slug === hoveredNiche)?.label}</p>
                <Link to="/nicho/$slug" params={{ slug: hoveredNiche }} className="mt-2 inline-flex items-center gap-1 text-base font-semibold text-foreground hover:text-primary">
                  Ver tudo de {NICHES.find((n) => n.slug === hoveredNiche)?.label} <ChevronRight size={14} />
                </Link>
              </div>
              <div className="col-span-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Coleções</p>
                <div className="grid grid-cols-2 gap-2">
                  {mockCollections
                    .filter((c) => c.niche === hoveredNiche || c.niche === "all")
                    .slice(0, 6)
                    .map((c) => (
                      <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }}
                        className="rounded-lg px-2 py-2 text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-foreground">
                        {c.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-background shadow-premium">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-display text-base font-semibold">Navegar</span>
              <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent">
                <X size={18} />
              </button>
            </div>
            <nav className="p-4">
              {NICHES.map((n) => (
                <div key={n.slug} className="mb-5">
                  <Link to="/nicho/$slug" params={{ slug: n.slug }} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between text-base font-semibold text-foreground">
                    {n.label} <ChevronRight size={16} />
                  </Link>
                  <div className="mt-2 space-y-1 border-l border-border pl-3">
                    {mockCollections
                      .filter((c) => c.niche === n.slug)
                      .slice(0, 4)
                      .map((c) => (
                        <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }} onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-foreground">
                          {c.title}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
              <Link to="/kits" onClick={() => setMobileOpen(false)} className="block border-t border-border pt-4 text-base font-semibold text-primary">
                Kits & Bundles →
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

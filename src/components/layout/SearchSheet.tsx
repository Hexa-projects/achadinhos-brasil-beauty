import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search, X } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { Link } from "@tanstack/react-router";
import { formatCurrency } from "@/utils/formatCurrency";

export function SearchSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.length >= 2
    ? mockProducts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.category?.toLowerCase().includes(query.toLowerCase()) || p.brand?.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-full p-0 sm:h-auto sm:max-h-[80vh]">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="sr-only">Buscar produtos</SheetTitle>
          <div className="flex items-center gap-2">
            <Search size={18} className="text-muted-foreground" />
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produtos..." className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            {query && <button onClick={() => setQuery("")} aria-label="Limpar"><X size={16} className="text-muted-foreground" /></button>}
          </div>
        </SheetHeader>
        <div className="overflow-y-auto px-4 py-3">
          {query.length < 2 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categorias</p>
              <div className="flex flex-wrap gap-2">
                {["Skincare", "Make", "Cabelos", "Corpo"].map((c) => (
                  <Link key={c} to="/buscar" search={{ q: c }} onClick={() => onOpenChange(false)} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent">{c}</Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Nenhum resultado para "{query}"</p>
          ) : (
            <div className="space-y-2">
              {results.map((p) => (
                <Link key={p.id} to="/produto/$slug" params={{ slug: p.slug }} onClick={() => onOpenChange(false)} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
                  <img src={p.images[0]} alt={p.title} className="h-12 w-12 rounded-lg bg-muted object-cover" />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-foreground">{p.title}</p>
                    <p className="text-xs font-semibold text-foreground">{formatCurrency(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

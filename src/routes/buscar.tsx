import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Buscar — Achadinhos Brasil" },
      { name: "description", content: "Encontre os melhores produtos de health & beauty." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q);

  const results = useMemo(() => {
    if (!query || query.length < 2) return mockProducts;
    const lower = query.toLowerCase();
    return mockProducts.filter((p) =>
      p.title.toLowerCase().includes(lower) ||
      p.category?.toLowerCase().includes(lower) ||
      p.brand?.toLowerCase().includes(lower)
    );
  }, [query]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-4">
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
        <Search size={18} className="text-muted-foreground" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produtos, marcas, categorias..." className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" autoFocus />
      </div>
      {results.length === 0 ? (
        <EmptyState title="Nenhum resultado encontrado" description={`Não encontramos produtos para "${query}".`} actionLabel="Ver todos" actionTo="/buscar" />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

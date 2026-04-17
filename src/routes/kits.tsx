import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { mockBundles, mockProducts } from "@/data/mockProducts";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/kits")({
  head: () => ({
    meta: [
      { title: "Kits & Bundles — Achadinhos Brasil" },
      { name: "description", content: "Kits curados de skincare, make, cabelos e bem-estar. Ritual completo com economia real." },
      { property: "og:title", content: "Kits & Bundles — Achadinhos Brasil" },
      { property: "og:description", content: "Kits curados com ritual completo e economia real." },
    ],
  }),
  component: KitsPage,
});

const NICHE_LABELS = { skincare: "Skincare", make: "Make", cabelos: "Cabelos", corpo: "Corpo & Bem-estar" } as const;

function KitsPage() {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddBundle = (productIds: string[], title: string) => {
    productIds.forEach((id) => {
      const p = mockProducts.find((x) => x.id === id);
      if (p) addItem(p);
    });
    toast.success(`${title} adicionado à sacola`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:pt-10">
      <motion.header
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs">
          <Sparkles size={12} className="text-primary" /> Curadoria em kit
        </div>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Kits & Bundles</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Rituais completos com economia real. Cada kit foi montado pela nossa editora para entregar resultado.</p>
      </motion.header>

      {(["skincare", "make", "cabelos", "corpo"] as const).map((niche) => {
        const bundles = mockBundles.filter((b) => b.niche === niche);
        return (
          <section key={niche} className="mb-12">
            <h2 className="mb-5 text-xl font-semibold text-ink">{NICHE_LABELS[niche]}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bundles.map((b) => {
                const products = b.productIds.map((id) => mockProducts.find((p) => p.id === id)).filter(Boolean) as typeof mockProducts;
                const totalOriginal = products.reduce((acc, p) => acc + p.price, 0);
                const savings = totalOriginal - b.bundlePrice;

                return (
                  <motion.article
                    key={b.id}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-premium"
                  >
                    <div className="relative">
                      <img src={b.image} alt={b.title} className="aspect-[4/3] w-full object-cover" />
                      {b.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold text-card backdrop-blur">{b.badge}</span>
                      )}
                      {savings > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-discount px-2 py-1 text-[10px] font-bold text-success-foreground">
                          Economize {formatCurrency(savings)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="editorial-eyebrow text-[10px]">{b.subtitle}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>

                      <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
                        {products.map((p) => (
                          <li key={p.id} className="flex items-start gap-1.5">
                            <span className="mt-0.5 text-primary">•</span>
                            <Link to="/produto/$slug" params={{ slug: p.slug }} className="hover:underline">{p.title}</Link>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-2xl font-semibold text-foreground">{formatCurrency(b.bundlePrice)}</span>
                        {totalOriginal > b.bundlePrice && (
                          <span className="text-xs text-muted-foreground line-through">{formatCurrency(totalOriginal)}</span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddBundle(b.productIds, b.title)}
                        className="btn-cta mt-4 flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold"
                      >
                        <ShoppingBag size={15} /> Adicionar kit à sacola
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

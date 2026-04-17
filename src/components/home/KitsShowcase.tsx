import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Gift } from "lucide-react";
import { mockBundles, mockProducts } from "@/data/mockProducts";
import { formatCurrency } from "@/utils/formatCurrency";

export function KitsShowcase() {
  // Pick top 3 bundles (one per niche when possible)
  const featured = ["skincare", "make", "cabelos"]
    .map((n) => mockBundles.find((b) => b.niche === n))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow">Curadoria em kit</p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Rituais completos com economia real
          </h2>
        </div>
        <Link to="/kits" className="hidden shrink-0 text-[13px] font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
          Ver todos os kits <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((b, i) => {
          const products = b.productIds
            .map((id) => mockProducts.find((p) => p.id === id))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          const totalOriginal = products.reduce((acc, p) => acc + p.price, 0);
          const savings = totalOriginal - b.bundlePrice;

          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/kits"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow duration-500 hover:shadow-premium"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold text-card backdrop-blur">
                    <Gift size={11} /> Kit
                  </span>
                  {savings > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-discount px-2 py-1 text-[10px] font-bold text-success-foreground shadow-soft">
                      -{formatCurrency(savings)}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="editorial-eyebrow text-[10px]">{b.subtitle}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{b.description}</p>

                  <div className="mt-auto flex items-baseline justify-between pt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-xl font-semibold text-foreground">{formatCurrency(b.bundlePrice)}</span>
                      {totalOriginal > b.bundlePrice && (
                        <span className="text-xs text-muted-foreground line-through">{formatCurrency(totalOriginal)}</span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Ver kit <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 text-center sm:hidden">
        <Link to="/kits" className="inline-flex items-center gap-1 text-[13px] font-medium text-primary">
          Ver todos os kits <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

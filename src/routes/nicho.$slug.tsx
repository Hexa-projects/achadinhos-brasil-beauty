import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockProducts, mockCollections } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

const NICHE_META: Record<string, { title: string; eyebrow: string; manifesto: string; niche: "skincare" | "make" | "cabelos" | "corpo" }> = {
  skincare: { title: "Skincare", eyebrow: "Curadoria de skincare", niche: "skincare",
    manifesto: "Rotinas science-backed, ativos premium e o melhor da K-beauty. Da limpeza ao FPS — tudo que sua pele precisa." },
  make: { title: "Make", eyebrow: "Make presença", niche: "make",
    manifesto: "Cores que entendem a pele brasileira. Do nude clean girl ao acabamento de salão." },
  cabelos: { title: "Cabelos", eyebrow: "Cabelos de alto impacto", niche: "cabelos",
    manifesto: "Reparação, crescimento, brilho e definição. Para todos os tipos e necessidades." },
  corpo: { title: "Corpo & Bem-estar", eyebrow: "Ritual sensorial", niche: "corpo",
    manifesto: "Banho premium, glow corporal e bem-estar de dentro pra fora." },
};

export const Route = createFileRoute("/nicho/$slug")({
  loader: ({ params }) => {
    const meta = NICHE_META[params.slug];
    if (!meta) throw notFound();
    return meta;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} — Achadinhos Brasil` },
      { name: "description", content: loaderData.manifesto },
      { property: "og:title", content: `${loaderData.title} — Achadinhos Brasil` },
      { property: "og:description", content: loaderData.manifesto },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Nicho não encontrado</h1>
      <Link to="/" className="mt-4 inline-block text-primary hover:underline">Voltar à home</Link>
    </div>
  ),
  component: NichePage,
});

function NichePage() {
  const meta = Route.useLoaderData();
  const products = mockProducts.filter((p) => p.niche === meta.niche);
  const hero = products.find((p) => p.isHero) ?? products[0];
  const collections = mockCollections.filter((c) => c.niche === meta.niche);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:pt-10">
      {/* Hero do nicho */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10"
      >
        <div>
          <p className="editorial-eyebrow">{meta.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{meta.title}</h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">{meta.manifesto}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {collections.slice(0, 4).map((c) => (
              <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent">
                {c.title}
              </Link>
            ))}
          </div>
        </div>
        {hero && (
          <Link to="/produto/$slug" params={{ slug: hero.slug }} className="group relative overflow-hidden rounded-3xl bg-warm shadow-premium">
            <img src={hero.images[0]} alt={hero.title} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-5">
              <p className="text-[10px] uppercase tracking-widest text-card/80">Hero product</p>
              <h3 className="font-display text-lg font-semibold text-card">{hero.title}</h3>
            </div>
          </Link>
        )}
      </motion.section>

      {/* Coleções do nicho */}
      {collections.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-ink">Coleções editoriais</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {collections.map((c) => (
              <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-soft">
                <p className="editorial-eyebrow text-[10px]">{c.eyebrow}</p>
                <h3 className="mt-1 font-display font-semibold text-foreground">{c.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">Explorar <ArrowRight size={12} /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Grid de produtos */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-ink">Todos os produtos · {products.length}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

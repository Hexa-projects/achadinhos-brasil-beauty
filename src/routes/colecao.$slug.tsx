import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockProducts, mockCollections } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/colecao/$slug")({
  loader: ({ params }) => {
    const collection = mockCollections.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return collection;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} — Achadinhos Brasil` },
      { name: "description", content: loaderData.manifesto },
      { property: "og:title", content: `${loaderData.title} — Achadinhos Brasil` },
      { property: "og:description", content: loaderData.manifesto },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Coleção não encontrada</h1>
      <Link to="/" className="mt-4 inline-block text-primary hover:underline">Voltar à home</Link>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const c = Route.useLoaderData();
  const products = c.productIds
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="pb-20">
      {/* Hero da coleção */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="relative mb-10 overflow-hidden bg-warm"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <p className="editorial-eyebrow">{c.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{c.title}</h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">{c.manifesto}</p>
            <p className="mt-4 text-sm text-foreground/70">{products.length} produtos selecionados</p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-premium">
            <img src={c.image} alt={c.title} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Footer } from "@/components/layout/Footer";
import heroImg from "@/assets/hero-beauty.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Achadinhos Brasil — Achados Premium de Health & Beauty" },
      { name: "description", content: "Curadoria premium de produtos de health & beauty. Compra segura, seleção curada, entrega com acompanhamento." },
      { property: "og:title", content: "Achadinhos Brasil — Achados Premium de Health & Beauty" },
      { property: "og:description", content: "Curadoria premium de produtos de health & beauty." },
    ],
  }),
  component: HomePage,
});

const trending = mockProducts.filter((p) => p.isTrending);
const skincare = mockProducts.filter((p) => p.category === "Skincare");
const categories = ["Skincare", "Make", "Cabelos", "Corpo", "Bem-estar"];

function HomePage() {
  return (
    <div className="pb-16 md:pb-0">
      {/* Hero */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative overflow-hidden">
        <img src={heroImg} alt="Produtos de beleza premium" className="h-56 w-full object-cover sm:h-72 md:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:pb-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Achados premium para sua<br />rotina de beleza
            </h1>
            <p className="mt-1.5 max-w-md text-xs text-muted-foreground sm:text-sm">
              Curadoria de produtos de health & beauty com compra segura e experiência impecável.
            </p>
            <Link to="/buscar" className="btn-cta mt-4 inline-flex h-10 items-center gap-1.5 px-5 text-sm font-semibold">
              Descobrir agora <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
        {/* Trust */}
        <TrustBadges />

        {/* Categories chips */}
        <div>
          <SectionHeading title="Categorias" />
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((c) => (
              <Link key={c} to="/buscar" search={{ q: c }} className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent">{c}</Link>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div>
          <SectionHeading title="Achadinhos da Semana" subtitle="Os produtos mais desejados" />
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:overflow-visible">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Skincare */}
        <div>
          <SectionHeading title="Queridinhos de Skincare" subtitle="Cuidados essenciais para sua pele" />
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 md:grid-cols-4 sm:overflow-visible">
            {skincare.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Shield, Truck, RefreshCw, ShoppingBag } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { mockReviews } from "@/data/mockProducts";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductInfoAccordion } from "@/components/product/ProductInfoAccordion";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useCartStore } from "@/stores/useCartStore";
import { formatCurrency, formatInstallments } from "@/utils/formatCurrency";
import { EmptyState } from "@/components/shared/EmptyState";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$slug")({
  head: ({ params }) => {
    const product = mockProducts.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: product ? `${product.title} — Achadinhos Brasil` : "Produto — Achadinhos Brasil" },
        { name: "description", content: product?.shortDescription || "" },
        { property: "og:title", content: product?.title || "Produto" },
        { property: "og:description", content: product?.shortDescription || "" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <EmptyState title="Produto não encontrado" actionLabel="Voltar à loja" actionTo="/" />,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = mockProducts.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <EmptyState title="Produto não encontrado" description="O produto que você procura não existe ou foi removido." actionLabel="Voltar à loja" actionTo="/" />
      </div>
    );
  }

  const reviews = mockReviews.filter((r) => r.productId === product.id);
  const crossSell = mockProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${product.title} adicionado à sacola`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-36 md:pb-8">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Gallery */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Info */}
          <div className="mt-4 space-y-4 md:mt-0">
            {product.brand && <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</p>}
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{product.title}</h1>
            {product.subtitle && <p className="text-sm text-muted-foreground">{product.subtitle}</p>}

            {product.rating && (
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-border"} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
              </div>
            )}

            <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} discountPercentage={product.discountPercentage} />
            {product.price >= 30 && <p className="text-xs text-muted-foreground">{formatInstallments(product.price)}</p>}

            {/* Trust line */}
            <div className="flex flex-wrap gap-4 rounded-xl bg-secondary p-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Shield size={14} className="text-primary" />Compra segura</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Truck size={14} className="text-primary" />Entrega acompanhada</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><RefreshCw size={14} className="text-primary" />Trocas facilitadas</span>
            </div>

            {/* Desktop buy button */}
            <div className="hidden md:block">
              <button onClick={handleAdd} className="btn-cta btn-cta-pulse flex h-12 w-full items-center justify-center gap-2 text-sm font-semibold">
                <ShoppingBag size={16} />
                Adicionar à Sacola · {formatCurrency(product.price * qty)}
              </button>
            </div>

            {product.shortDescription && <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>}

            <ProductInfoAccordion benefits={product.benefits} howToUse={product.howToUse} technicalSpecs={product.technicalSpecs} />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <ReviewsSection reviews={reviews} rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <div className="mt-8">
            <SectionHeading title="Você também pode gostar" />
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-4 sm:overflow-visible">
              {crossSell.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky buy bar mobile */}
      <StickyBuyBar price={product.price} quantity={qty} onQuantityChange={setQty} onAdd={handleAdd} />

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.shortDescription,
        image: product.images,
        brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
        offers: { "@type": "Offer", priceCurrency: "BRL", price: product.price, availability: "https://schema.org/InStock" },
        ...(product.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount } } : {}),
      }) }} />
    </motion.div>
  );
}

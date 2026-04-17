import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockProducts, mockReviews } from "@/data/mockProducts";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfoAccordion } from "@/components/product/ProductInfoAccordion";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";
import { EnhancedBuyBox } from "@/components/product/EnhancedBuyBox";
import { VisualBenefits } from "@/components/product/VisualBenefits";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useCartStore } from "@/stores/useCartStore";
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
        ...(product?.images[0] ? [{ property: "og:image", content: product.images[0] }] : []),
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-36 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Top: gallery + buy box */}
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <ProductGallery images={product.images} title={product.title} />
          <div className="mt-6 md:mt-0">
            <EnhancedBuyBox product={product} quantity={qty} onQuantityChange={setQty} onAdd={handleAdd} />
          </div>
        </div>

        {/* Visual benefits */}
        <div className="mt-12 sm:mt-16">
          <VisualBenefits benefits={product.benefits} />
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-3 md:gap-12">
            <div>
              <p className="editorial-eyebrow">Sobre o produto</p>
              <h2 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-ink">
                Feito para resultado real
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-[15px] leading-relaxed text-foreground">{product.description}</p>
              {product.shortDescription && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
              )}
            </div>
          </div>
        )}

        {/* Accordion: detalhes técnicos */}
        <div className="mt-12 sm:mt-16">
          <ProductInfoAccordion benefits={product.benefits} howToUse={product.howToUse} technicalSpecs={product.technicalSpecs} />
        </div>

        {/* Reviews */}
        <div id="avaliacoes" className="mt-12 scroll-mt-20 sm:mt-16">
          <ReviewsSection reviews={reviews} rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <SectionHeading
              eyebrow="Você também pode gostar"
              title="Combine sua rotina"
              subtitle="Selecionados a dedo para quem gosta deste produto."
            />
            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-5 sm:overflow-visible sm:px-0">
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

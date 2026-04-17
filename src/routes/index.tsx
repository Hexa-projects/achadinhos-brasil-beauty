import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { mockProducts } from "@/data/mockProducts";
import { HeroFlagshipBeauty } from "@/components/home/HeroFlagshipBeauty";
import { TrustRibbon } from "@/components/home/TrustRibbon";
import { CategoryShowcaseGrid } from "@/components/home/CategoryShowcaseGrid";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { EditorialCollectionSpotlight } from "@/components/home/EditorialCollectionSpotlight";
import { ComparisonBenefitsGrid } from "@/components/home/ComparisonBenefitsGrid";
import { TestimonialsBeautySection } from "@/components/home/TestimonialsBeautySection";
import { PremiumFAQ } from "@/components/home/PremiumFAQ";
import { KitsShowcase } from "@/components/home/KitsShowcase";
import { EditorialFooter } from "@/components/layout/EditorialFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Achadinhos Brasil — Curadoria Premium de Health & Beauty" },
      { name: "description", content: "Beauty marketplace brasileiro com curadoria editorial. Skincare, make, cabelos e bem-estar — compra segura, entrega acompanhada e seleção real." },
      { property: "og:title", content: "Achadinhos Brasil — Curadoria Premium de Health & Beauty" },
      { property: "og:description", content: "Beauty marketplace brasileiro com curadoria editorial." },
    ],
  }),
  component: HomePage,
});

const trending = mockProducts.filter((p) => p.isTrending);
const skincare = mockProducts.filter((p) => p.category === "Skincare");
const makeup = mockProducts.filter((p) => p.category === "Make");

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-16 md:pb-0"
    >
      {/* 1. Hero flagship */}
      <HeroFlagshipBeauty />

      {/* 2. Trust ribbon */}
      <TrustRibbon />

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:space-y-20 sm:py-16">
        {/* 3. Categories */}
        <CategoryShowcaseGrid />

        {/* 4. Trending */}
        <BestSellersCarousel
          eyebrow="Achadinhos da semana"
          title="O que está movimentando o Brasil"
          subtitle="A curadoria mais desejada agora — selecionada pela nossa editora."
          products={trending}
          ctaQuery="trending"
        />

        {/* 5. Editorial collection */}
        <EditorialCollectionSpotlight />

        {/* 6. Skincare vitrine */}
        <BestSellersCarousel
          eyebrow="Queridinhos de skincare"
          title="Cuidado essencial, resultado visível"
          subtitle="Os básicos que toda rotina precisa — com a textura certa para o clima brasileiro."
          products={skincare}
          ctaQuery="Skincare"
        />

        {/* 7. Differentiation */}
        <ComparisonBenefitsGrid />

        {/* 7b. Kits showcase */}
        <KitsShowcase />

        {/* 8. Make vitrine */}
        <BestSellersCarousel
          eyebrow="Make presença"
          title="Cores que entendem você"
          subtitle="Tons curados para a pele brasileira — do nude diário ao statement."
          products={makeup}
          ctaQuery="Make"
        />

        {/* 9. Social proof */}
        <TestimonialsBeautySection />

        {/* 10. FAQ */}
        <PremiumFAQ />
      </div>

      {/* Footer */}
      <EditorialFooter />
    </motion.div>
  );
}

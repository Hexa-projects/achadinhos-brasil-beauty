import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-flagship.jpg";

export function HeroFlagshipBeauty() {
  return (
    <section className="relative overflow-hidden bg-warm">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 pb-10 pt-6 sm:gap-8 md:grid-cols-12 md:gap-12 md:py-16">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 md:order-1 order-2"
        >
          <span className="editorial-eyebrow inline-flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary" />
            Edição de Verão · 2025
          </span>
          <h1 className="mt-3 text-balance text-[28px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-[44px] lg:text-5xl">
            Beleza curada,<br />
            <span className="italic font-light text-foreground/85">com confiança brasileira.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Achados premium de skincare, make e bem-estar — selecionados por quem entende.
            Compra segura, entrega acompanhada e curadoria real.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link
              to="/buscar"
              className="btn-cta inline-flex h-11 items-center gap-1.5 px-5 text-[13px] font-semibold"
            >
              Descobrir coleção <ArrowRight size={14} />
            </Link>
            <Link
              to="/buscar"
              search={{ q: "Skincare" }}
              className="btn-ghost-premium inline-flex h-11 items-center px-5 text-[13px]"
            >
              Ver Skincare
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-muted-foreground">
            <span>✓ Pagamento protegido</span>
            <span>✓ Curadoria premium</span>
            <span>✓ Trocas facilitadas</span>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7 md:order-2 order-1"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-editorial">
            <img
              src={heroImg}
              alt="Coleção editorial Achadinhos Brasil"
              width={1920}
              height={1280}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] md:aspect-[5/4]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-foreground/15 via-transparent to-transparent" />
          </div>
          {/* Floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-4 left-4 hidden rounded-2xl bg-card px-4 py-3 shadow-premium md:block"
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Curadoria</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">+ de 240 marcas selecionadas</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

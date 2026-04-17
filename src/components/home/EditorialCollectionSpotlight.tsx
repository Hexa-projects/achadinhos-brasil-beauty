import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import skincareImg from "@/assets/cat-skincare.jpg";

export function EditorialCollectionSpotlight() {
  return (
    <section>
      <div className="overflow-hidden rounded-3xl bg-warm shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 overflow-hidden md:order-2"
          >
            <img
              src={skincareImg}
              alt="Rotina essencial de skincare"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 flex flex-col justify-center gap-4 p-6 sm:p-10 md:order-1 md:p-12"
          >
            <p className="editorial-eyebrow">Coleção Editorial · Glow</p>
            <h2 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl md:text-[34px]">
              A rotina essencial<br />
              <span className="italic font-light text-foreground/75">para uma pele que respira luz.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Quatro passos simples — limpeza, antioxidante, hidratação e proteção — em uma seleção
              curada para iniciar (ou refinar) sua rotina diária.
            </p>
            <ul className="mt-1 space-y-1.5 text-sm text-foreground">
              <li className="flex items-baseline gap-2"><span className="text-primary">01</span> Água micelar suave</li>
              <li className="flex items-baseline gap-2"><span className="text-primary">02</span> Sérum de vitamina C</li>
              <li className="flex items-baseline gap-2"><span className="text-primary">03</span> Hidratante leve</li>
              <li className="flex items-baseline gap-2"><span className="text-primary">04</span> Protetor solar diário</li>
            </ul>
            <div className="pt-2">
              <Link
                to="/buscar"
                search={{ q: "Skincare" }}
                className="btn-cta inline-flex h-11 items-center gap-1.5 px-5 text-[13px] font-semibold"
              >
                Montar minha rotina <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

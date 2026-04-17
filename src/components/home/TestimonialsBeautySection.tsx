import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana T.",
    location: "São Paulo, SP",
    rating: 5,
    text: "Comprei o sérum de vitamina C e cheguei em 2 dias, embalado lindo. Minha pele mudou em 3 semanas — virei cliente fiel.",
    product: "Sérum Vitamina C Luminous",
  },
  {
    name: "Bianca R.",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Curadoria impecável. Não tenho que filtrar 500 produtos genéricos — quando vejo aqui, sei que vale.",
    product: "Paleta Nude Collection",
  },
  {
    name: "Letícia M.",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Atendimento foi atenção pura. Trocaram um produto sem burocracia e ainda mandaram um brinde. Cliente para sempre.",
    product: "Óleo Capilar Reparação",
  },
];

export function TestimonialsBeautySection() {
  return (
    <section>
      <div className="mb-6 max-w-xl">
        <p className="editorial-eyebrow">Quem comprou, conta</p>
        <h2 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
          A confiança vem de quem usa
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <Quote size={22} className="text-primary/30" />
            <blockquote className="text-[14px] leading-relaxed text-foreground">
              "{t.text}"
            </blockquote>
            <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.location}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{t.product}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

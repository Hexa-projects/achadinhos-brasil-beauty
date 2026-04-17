import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Truck, Heart } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Curadoria de verdade",
    text: "Cada produto é selecionado a mão. Nada de catálogo infinito — só o que vale a pena.",
  },
  {
    icon: ShieldCheck,
    title: "Autenticidade garantida",
    text: "Trabalhamos só com fornecedores oficiais. Nota fiscal e procedência sempre rastreáveis.",
  },
  {
    icon: Truck,
    title: "Entrega que dá orgulho",
    text: "Embalagem cuidadosa, rastreio em tempo real e prazo cumprido para todo o Brasil.",
  },
  {
    icon: Heart,
    title: "Atendimento humano",
    text: "Time brasileiro, em português, pronto para resolver. Sem chatbot que não entende.",
  },
];

export function ComparisonBenefitsGrid() {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-soft sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="editorial-eyebrow">Por que Achadinhos</p>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-[32px]">
          O cuidado de uma loja boutique<br />
          <span className="italic font-light text-foreground/75">com a confiança de um marketplace.</span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {benefits.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-background/60 p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm">
              <Icon size={18} strokeWidth={1.6} className="text-primary" />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

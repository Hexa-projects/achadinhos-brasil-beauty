import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import skincareImg from "@/assets/cat-skincare.jpg";
import makeImg from "@/assets/cat-make.jpg";
import cabelosImg from "@/assets/cat-cabelos.jpg";
import corpoImg from "@/assets/cat-corpo.jpg";

const categories = [
  { title: "Skincare", subtitle: "Rotinas que iluminam", image: skincareImg, query: "Skincare" },
  { title: "Make", subtitle: "Beleza com presença", image: makeImg, query: "Make" },
  { title: "Cabelos", subtitle: "Brilho e reparação", image: cabelosImg, query: "Cabelos" },
  { title: "Corpo & Bem-estar", subtitle: "Autocuidado diário", image: corpoImg, query: "Corpo" },
];

export function CategoryShowcaseGrid() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="editorial-eyebrow">Navegar por categoria</p>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Onde sua rotina começa
          </h2>
        </div>
        <Link to="/buscar" className="hidden shrink-0 text-[13px] font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
          Ver tudo <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/buscar"
              search={{ q: c.query }}
              className="group block overflow-hidden rounded-2xl bg-warm shadow-soft transition-all duration-500 hover:shadow-premium"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-[10px] uppercase tracking-widest text-card/80">{c.subtitle}</p>
                  <div className="mt-0.5 flex items-end justify-between">
                    <h3 className="font-display text-base font-semibold text-card sm:text-lg">{c.title}</h3>
                    <ArrowUpRight size={16} className="text-card transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

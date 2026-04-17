import { motion } from "framer-motion";
import { Sparkles, Clock, Droplet, Leaf } from "lucide-react";

interface Props {
  benefits?: string[];
}

const icons = [Sparkles, Droplet, Clock, Leaf];

export function VisualBenefits({ benefits }: Props) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section>
      <p className="editorial-eyebrow mb-3">Por que você vai amar</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3">
        {benefits.slice(0, 4).map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warm">
                <Icon size={16} strokeWidth={1.6} className="text-primary" />
              </div>
              <p className="mt-3 text-[13px] font-medium leading-snug text-foreground">{b}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

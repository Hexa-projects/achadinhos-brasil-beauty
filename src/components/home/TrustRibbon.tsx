import { Shield, Truck, Sparkles, RefreshCw, MessageCircle } from "lucide-react";

const items = [
  { icon: Shield, label: "Compra segura" },
  { icon: Truck, label: "Entrega acompanhada" },
  { icon: Sparkles, label: "Curadoria premium" },
  { icon: RefreshCw, label: "Trocas facilitadas" },
  { icon: MessageCircle, label: "Atendimento PT-BR" },
];

export function TrustRibbon() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 scrollbar-hide sm:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex shrink-0 items-center gap-2">
            <Icon size={15} strokeWidth={1.6} className="text-primary" />
            <span className="text-[12px] font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

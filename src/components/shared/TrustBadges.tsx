import { Shield, PackageCheck, Star } from "lucide-react";

const badges = [
  { icon: Shield, label: "Compra segura", sub: "Pagamento protegido" },
  { icon: Star, label: "Seleção curada", sub: "Produtos selecionados" },
  { icon: PackageCheck, label: "Pedido acompanhado", sub: "Rastreio em tempo real" },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <Icon size={20} className="text-primary" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold leading-tight text-foreground">{label}</span>
          <span className="hidden text-[10px] text-muted-foreground sm:block">{sub}</span>
        </div>
      ))}
    </div>
  );
}

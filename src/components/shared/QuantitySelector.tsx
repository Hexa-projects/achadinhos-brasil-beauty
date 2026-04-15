import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}
export function QuantitySelector({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center gap-0 rounded-lg border border-border">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40" disabled={value <= min} aria-label="Diminuir quantidade">
        <Minus size={14} />
      </button>
      <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-foreground">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40" disabled={value >= max} aria-label="Aumentar quantidade">
        <Plus size={14} />
      </button>
    </div>
  );
}

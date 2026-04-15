interface Props {
  title: string;
  subtitle?: string;
}
export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

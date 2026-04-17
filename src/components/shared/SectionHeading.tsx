interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}
export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
  return (
    <div className={`mb-5 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
      <h2 className="mt-1.5 text-balance text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

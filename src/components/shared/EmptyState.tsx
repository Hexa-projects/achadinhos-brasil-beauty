import { PackageOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}
export function EmptyState({ icon, title, description, actionLabel, actionTo }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon || <PackageOpen size={28} className="text-muted-foreground" />}
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-cta mt-5 inline-flex h-10 items-center px-5 text-sm">{actionLabel}</Link>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="w-44 shrink-0 space-y-2 sm:w-52">
      <LoadingSkeleton className="aspect-square w-full rounded-xl" />
      <LoadingSkeleton className="h-3 w-3/4" />
      <LoadingSkeleton className="h-3 w-1/2" />
      <LoadingSkeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
      <LoadingSkeleton className="aspect-square w-full rounded-2xl sm:aspect-[4/3]" />
      <LoadingSkeleton className="h-5 w-2/3" />
      <LoadingSkeleton className="h-4 w-1/3" />
      <LoadingSkeleton className="h-8 w-1/4" />
      <LoadingSkeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

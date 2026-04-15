import { Star } from "lucide-react";
import type { Review } from "@/types/product";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{review.authorName}</p>
          {review.verified && <span className="text-[10px] text-discount font-medium">✓ Compra verificada</span>}
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"} />
          ))}
        </div>
      </div>
      {review.title && <p className="text-sm font-medium text-foreground">{review.title}</p>}
      <p className="text-sm leading-relaxed text-muted-foreground">{review.content}</p>
    </div>
  );
}

export function ReviewsSection({ reviews, rating, count }: { reviews: Review[]; rating?: number; count?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-base font-bold text-foreground">Avaliações</h3>
        {rating && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
            {count && <span>({count})</span>}
          </div>
        )}
      </div>
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ainda sem avaliações para este produto.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      )}
    </div>
  );
}

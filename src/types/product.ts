export interface NormalizedProduct {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  subtitle?: string;
  description?: string;
  shortDescription?: string;
  images: string[];
  price: number;
  compareAtPrice?: number | null;
  discountPercentage?: number | null;
  currency: "BRL";
  category?: string;
  badge?: string;
  isTrending?: boolean;
  rating?: number;
  reviewCount?: number;
  benefits?: string[];
  howToUse?: string[];
  technicalSpecs?: Record<string, string>;
  stock?: number;
  source?: "supabase" | "droplinkfy" | "mock";
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title?: string;
  content: string;
  imageUrls?: string[];
  createdAt?: string;
  verified?: boolean;
}

export interface Profile {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface Order {
  id: string;
  userId?: string;
  createdAt: string;
  total: number;
  currency: "BRL";
  paymentStatus: "pending" | "paid" | "failed" | "canceled";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  stripeSessionId?: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface CartItem {
  product: NormalizedProduct;
  quantity: number;
}

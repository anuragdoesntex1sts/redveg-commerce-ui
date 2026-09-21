export type CategorySlug = "fish" | "chicken" | "mutton" | "prawns" | "seafood" | "combos";

export interface Category {
  id: CategorySlug;
  name: string;
  description: string;
  image: string;
  accent: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  mrp?: number;
  stock: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  description: string;
  shortDescription: string;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  deliveryMinutes: number;
  featured?: boolean;
  bestseller?: boolean;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export type OrderStatus =
  | "New"
  | "Confirmed"
  | "Processing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  mobile: string;
  address: string;
  pincode: string;
  placedAt: string;
  total: number;
  itemCount: number;
  source: "Instagram" | "Google" | "Direct" | "WhatsApp";
  status: OrderStatus;
  items: Array<{
    name: string;
    variant: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export type ProductCategory =
  | "All"
  | "Food & Beverages"
  | "Fashion & Apparel"
  | "Technology & Electronics"
  | "Services"
  | "Beauty & Cosmetics"
  | "Other";

/*
  Flexible variant model — deliberately NOT a fixed "size + color" shape,
  since a bow tie, a plate of Waakye, and a laptop repair service need
  genuinely different variant types (or none at all). Each product
  declares its own list of variant groups; no groups means "no options
  to choose, just add to cart."

  Example: a fashion item might have a "Color" group with 3 options.
  A food item might have a "Spice Level" group. A service has none.
*/
export interface VariantOption {
  id: string;
  label: string; // e.g. "Red", "Extra Spicy", "256GB"
  priceDelta?: number; // GHS added to base price when selected, can be negative
  swatch?: string; // hex color, only used for color-style groups
  inStock?: boolean; // defaults to true if omitted
}

export interface VariantGroup {
  id: string;
  label: string; // e.g. "Color", "Spice Level", "Storage"
  options: VariantOption[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  authorName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  price: number; // GHS, major units — base price before variant deltas
  compareAtPrice?: number;
  image: string; // primary/cover image, used in cards and as gallery[0] fallback
  images?: string[]; // full gallery; falls back to [image] if omitted
  description?: string; // longer-form detail page copy
  specs?: ProductSpec[]; // key-value spec sheet (e.g. Material, Wattage)
  variantGroups?: VariantGroup[]; // empty/omitted = no variants to choose
  reviews?: ProductReview[];
  category: Exclude<ProductCategory, "All">;
  vendorId: string;
  vendorName: string;
  rating?: number;
  reviewCount?: number;
  stock: number;
  tags?: string[];
  createdAt: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
  // Selected variant option ids, keyed by variant group id, e.g.
  // { color: "red", size: "m" }. Omitted/empty for products with no
  // variants. Two lines for the same product with different selections
  // are genuinely different cart lines, not merged.
  selectedVariants?: Record<string, string>;
}

export type UserRole = "shopper" | "vendor";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeName?: string;
  createdAt: string;
}

export interface VendorStats {
  totalSales: number;
  activeListings: number;
  ordersThisWeek: number;
  pendingOrders: number;
}

export type PaymentMethod = "mtn" | "telecel" | "airteltigo" | "card";

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  hall: string; // KNUST hall/hostel or off-campus address
  notes?: string;
}

export interface Order {
  id: string;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  delivery: DeliveryDetails;
  paymentMethod: PaymentMethod;
  status: "paid";
  createdAt: string;
}

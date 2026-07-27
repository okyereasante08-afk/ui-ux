export type ProductCategory =
  | "All"
  | "Food & Beverages"
  | "Fashion & Apparel"
  | "Technology & Electronics"
  | "Services"
  | "Beauty & Cosmetics"
  | "Other";

export interface Product {
  id: string;
  title: string;
  price: number; // GHS, major units
  compareAtPrice?: number;
  image: string;
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

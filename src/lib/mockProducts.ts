import { Product } from "@/types/marketplace";

// TODO: replace with real vendor listings once vendor registration ships
// server-side. Shape matches a future `products` table row so this can
// be swapped for a fetch call without touching consuming components.
export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Handmade Kente Bow Tie",
    price: 45,
    image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&q=80",
    category: "Fashion & Apparel",
    vendorId: "v1",
    vendorName: "Ama's Threads",
    rating: 4.8,
    reviewCount: 23,
    stock: 12,
    tags: ["handmade", "graduation"],
    createdAt: "2026-06-01",
  },
  {
    id: "p2",
    title: "Jollof & Grilled Chicken Combo",
    price: 25,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
    category: "Food & Beverages",
    vendorId: "v2",
    vendorName: "Hostel Kitchen",
    rating: 4.9,
    reviewCount: 108,
    stock: 40,
    tags: ["lunch", "bestseller"],
    createdAt: "2026-07-10",
  },
  {
    id: "p3",
    title: "USB-C Fast Charger (20W)",
    price: 60,
    compareAtPrice: 80,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
    category: "Technology & Electronics",
    vendorId: "v3",
    vendorName: "Circuit Corner",
    rating: 4.5,
    reviewCount: 61,
    stock: 8,
    tags: ["electronics", "sale"],
    createdAt: "2026-06-20",
  },
  {
    id: "p4",
    title: "Laptop Repair & Diagnostics",
    price: 100,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=600&q=80",
    category: "Services",
    vendorId: "v4",
    vendorName: "TechFix KNUST",
    rating: 4.7,
    reviewCount: 34,
    stock: 999,
    tags: ["repair", "same-day"],
    createdAt: "2026-05-15",
  },
  {
    id: "p5",
    title: "Shea Butter Body Cream (250ml)",
    price: 30,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    category: "Beauty & Cosmetics",
    vendorId: "v5",
    vendorName: "Naturals by Efya",
    rating: 4.9,
    reviewCount: 77,
    stock: 25,
    tags: ["skincare", "organic"],
    createdAt: "2026-07-01",
  },
  {
    id: "p6",
    title: "Engineering Drawing Set",
    price: 35,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    category: "Other",
    vendorId: "v6",
    vendorName: "Campus Supplies",
    rating: 4.3,
    reviewCount: 19,
    stock: 15,
    tags: ["stationery", "coe"],
    createdAt: "2026-06-11",
  },
  {
    id: "p7",
    title: "Ankara Tote Bag",
    price: 55,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    category: "Fashion & Apparel",
    vendorId: "v1",
    vendorName: "Ama's Threads",
    rating: 4.6,
    reviewCount: 14,
    stock: 9,
    tags: ["bags"],
    createdAt: "2026-07-05",
  },
  {
    id: "p8",
    title: "Waakye Special (Large)",
    price: 20,
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=80",
    category: "Food & Beverages",
    vendorId: "v2",
    vendorName: "Hostel Kitchen",
    rating: 4.8,
    reviewCount: 92,
    stock: 30,
    tags: ["lunch"],
    createdAt: "2026-07-15",
  },
];

export const featuredProductIds = ["p2", "p3", "p5", "p1"];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(mockProducts.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}

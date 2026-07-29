import { Product } from "@/types/marketplace";

/*
  TODO: replace with real vendor listings once vendor registration ships
  server-side. Shape matches a future `products` table row so this can
  be swapped for a fetch call without touching consuming components.

  Rich detail fields (description, specs, variantGroups, reviews) are
  filled in for every product below, tailored per category — fashion
  items get color variants, food items get spice/portion/protein
  variants, services and stationery get specs instead of variants since
  they're not genuinely variant-able. `images` currently mirrors the
  single `image` already set for each product; add more URLs to that
  array per product to populate a real gallery on the detail page.
*/
export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Handmade Kente Bow Tie",
    price: 45,
    image: "https://th.bing.com/th/id/OIP.DJgdkiW4t1xMdQxXIv76nAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Fashion & Apparel",
    vendorId: "v1",
    vendorName: "Ama's Threads",
    rating: 4.8,
    reviewCount: 23,
    stock: 12,
    tags: ["handmade", "graduation"],
    createdAt: "2026-06-01",
    description:
      "Hand-stitched in genuine Kente cloth by local weavers, finished with a matte clip-on clasp. A favorite for graduation, durbar, and formal wear — each strip is cut so the pattern lines up cleanly across the bow.",
    images: [
      "https://th.bing.com/th/id/OIP.DJgdkiW4t1xMdQxXIv76nAHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    specs: [
      { label: "Material", value: "100% cotton Kente cloth" },
      { label: "Closure", value: "Adjustable clip-on" },
      { label: "Width", value: "11.5 cm" },
      { label: "Care", value: "Spot clean only" },
    ],
    variantGroups: [
      {
        id: "color",
        label: "Pattern Color",
        options: [
          { id: "gold-black", label: "Gold & Black", swatch: "#C9A227" },
          { id: "red-green", label: "Red & Green", swatch: "#B23A2E" },
          { id: "blue-gold", label: "Blue & Gold", swatch: "#1E4C8A" },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Kojo A.",
        rating: 5,
        comment: "Wore this to my brother's graduation, got so many compliments. Stitching is solid.",
        createdAt: "2026-06-15",
      },
      {
        id: "r2",
        authorName: "Nana Yaa",
        rating: 4,
        comment: "Lovely quality, just wish there were more color options.",
        createdAt: "2026-07-02",
      },
    ],
  },
  {
    id: "p2",
    title: "Jollof & Grilled Chicken Combo",
    price: 25,
    image: "https://tse1.mm.bing.net/th/id/OIP.GAtPQF8wTyrfijCDPtUGCwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Food & Beverages",
    vendorId: "v2",
    vendorName: "Hostel Kitchen",
    rating: 4.9,
    reviewCount: 108,
    stock: 40,
    tags: ["lunch", "bestseller"],
    createdAt: "2026-07-10",
    description:
      "A hostel-kitchen favorite: smoky jollof rice cooked in a real coal pot, served with grilled chicken marinated overnight in local spices. Comes with a side of shito on request.",
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.GAtPQF8wTyrfijCDPtUGCwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    specs: [
      { label: "Prep time", value: "20–25 minutes" },
      { label: "Serves", value: "1 person (Regular), 1.5–2 (Large)" },
      { label: "Allergens", value: "Contains none of the top 9 allergens" },
    ],
    variantGroups: [
      {
        id: "spice",
        label: "Spice Level",
        options: [
          { id: "mild", label: "Mild" },
          { id: "regular", label: "Regular" },
          { id: "extra-hot", label: "Extra Hot" },
        ],
      },
      {
        id: "portion",
        label: "Portion Size",
        options: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 8 },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Efua M.",
        rating: 5,
        comment: "Best jollof on campus, no debate. The chicken is always juicy.",
        createdAt: "2026-07-12",
      },
    ],
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
    description:
      "20W USB-C PD fast charger — compact enough for a blazer pocket, powerful enough to take your phone from 0 to 50% in about half an hour. Includes over-current and over-heat protection.",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
    ],
    specs: [
      { label: "Output", value: "20W USB-C Power Delivery" },
      { label: "Input", value: "100–240V AC" },
      { label: "Ports", value: "1x USB-C" },
      { label: "Cable included", value: "No — brick only" },
    ],
    variantGroups: [
      {
        id: "cable",
        label: "Add a Cable?",
        options: [
          { id: "none", label: "No cable" },
          { id: "1m", label: "USB-C to Lightning, 1m", priceDelta: 15 },
          { id: "2m", label: "USB-C to Lightning, 2m", priceDelta: 22 },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Selorm K.",
        rating: 4,
        comment: "Does the job, charges fast. Bit bulky for a pocket but fine in a bag.",
        createdAt: "2026-06-28",
      },
      {
        id: "r2",
        authorName: "Abena O.",
        rating: 5,
        comment: "Been using it daily for a month, no issues at all.",
        createdAt: "2026-07-18",
      },
    ],
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
    description:
      "Full diagnostics and repair for laptops — hardware faults, slow performance, screen and keyboard issues, OS reinstalls. Free diagnosis; you only pay if you go ahead with the repair.",
    images: [
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=600&q=80",
    ],
    specs: [
      { label: "Turnaround", value: "Same-day for most issues" },
      { label: "Warranty on repair", value: "14 days" },
      { label: "Diagnosis", value: "Free, no obligation" },
      { label: "Pickup", value: "Drop-off at TechFix stand, KSB" },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Yaw B.",
        rating: 5,
        comment: "Fixed my keyboard same day, fair price. Explained exactly what was wrong.",
        createdAt: "2026-05-20",
      },
    ],
  },
  {
    id: "p5",
    title: "Shea Butter Body Cream (250ml)",
    price: 30,
    image: "https://tse2.mm.bing.net/th/id/OIP.JXHfuRbmc9d9ZpZaogfssgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Beauty & Cosmetics",
    vendorId: "v5",
    vendorName: "Naturals by Efya",
    rating: 4.9,
    reviewCount: 77,
    stock: 25,
    tags: ["skincare", "organic"],
    createdAt: "2026-07-01",
    description:
      "Whipped shea butter body cream, made in small batches from unrefined Northern Ghana shea. Deeply moisturizing without the greasy feel — absorbs fully within a few minutes.",
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.JXHfuRbmc9d9ZpZaogfssgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    specs: [
      { label: "Size", value: "250ml jar" },
      { label: "Ingredients", value: "Unrefined shea butter, coconut oil, vitamin E" },
      { label: "Skin type", value: "All skin types, including sensitive" },
    ],
    variantGroups: [
      {
        id: "scent",
        label: "Scent",
        options: [
          { id: "unscented", label: "Unscented" },
          { id: "lavender", label: "Lavender" },
          { id: "cocoa", label: "Cocoa" },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Adjoa P.",
        rating: 5,
        comment: "My skin has never felt this good. The lavender scent is subtle, not overpowering.",
        createdAt: "2026-07-08",
      },
      {
        id: "r2",
        authorName: "Linda T.",
        rating: 5,
        comment: "Repurchased three times already. Worth every cedi.",
        createdAt: "2026-07-20",
      },
    ],
  },
  {
    id: "p6",
    title: "Engineering Drawing Set",
    price: 35,
    image: "data:image/webp;base64,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",
    category: "Other",
    vendorId: "v6",
    vendorName: "Campus Supplies",
    rating: 4.3,
    reviewCount: 19,
    stock: 15,
    tags: ["stationery", "coe"],
    createdAt: "2026-06-11",
    description:
      "Complete engineering drawing set for first and second-year BME/Civil/Mechanical students — everything needed for technical drawing coursework in one case.",
    images: [
      "data:image/webp;base64,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",
    ],
    specs: [
      { label: "Contents", value: "Compass, dividers, scale ruler, set squares (2), protractor" },
      { label: "Case", value: "Hard plastic, zippered" },
      { label: "Recommended for", value: "COE/CE/ME first-year technical drawing" },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Kwabena F.",
        rating: 4,
        comment: "Good starter set, compass could be a bit sturdier but does the job.",
        createdAt: "2026-06-14",
      },
    ],
  },
  {
    id: "p7",
    title: "Ankara Tote Bag",
    price: 55,
    image: "data:image/webp;base64,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",
    category: "Fashion & Apparel",
    vendorId: "v1",
    vendorName: "Ama's Threads",
    rating: 4.6,
    reviewCount: 14,
    stock: 9,
    tags: ["bags"],
    createdAt: "2026-07-05",
    description:
      "Everyday tote in bold Ankara print, lined with sturdy cotton canvas and reinforced straps built to carry textbooks without stretching out.",
    images: [
      "data:image/webp;base64,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",
    ],
    specs: [
      { label: "Dimensions", value: "38cm x 32cm x 12cm" },
      { label: "Strap drop", value: "24cm" },
      { label: "Material", value: "Ankara cotton print, canvas lining" },
    ],
    variantGroups: [
      {
        id: "color",
        label: "Print",
        options: [
          { id: "orange-geo", label: "Orange Geometric", swatch: "#D9822B" },
          { id: "teal-floral", label: "Teal Floral", swatch: "#1E7A72" },
          { id: "purple-wax", label: "Purple Wax Print", swatch: "#6B3FA0" },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Akosua D.",
        rating: 5,
        comment: "Fits my laptop, 2 textbooks, and a water bottle with room to spare. Love the print.",
        createdAt: "2026-07-09",
      },
    ],
  },
  {
    id: "p8",
    title: "Waakye Special (Large)",
    price: 20,
    image: "https://th.bing.com/th/id/OIP.hA6AQv3lEJkKqp2JU5edBgHaGM?w=251&h=210&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "Food & Beverages",
    vendorId: "v2",
    vendorName: "Hostel Kitchen",
    rating: 4.8,
    reviewCount: 92,
    stock: 30,
    tags: ["lunch"],
    createdAt: "2026-07-15",
    description:
      "Classic waakye — beans and rice cooked with dried millet leaves for that signature reddish color — served with shito, gari, boiled egg, and your choice of protein.",
    images: [
      "https://th.bing.com/th/id/OIP.hA6AQv3lEJkKqp2JU5edBgHaGM?w=251&h=210&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    ],
    specs: [
      { label: "Includes", value: "Shito, gari, boiled egg" },
      { label: "Prep time", value: "10–15 minutes (pre-cooked, served fresh)" },
    ],
    variantGroups: [
      {
        id: "portion",
        label: "Portion Size",
        options: [
          { id: "regular", label: "Regular" },
          { id: "large", label: "Large", priceDelta: 6 },
        ],
      },
      {
        id: "protein",
        label: "Add Protein",
        options: [
          { id: "none", label: "No protein" },
          { id: "fish", label: "Fried Fish", priceDelta: 10 },
          { id: "chicken", label: "Grilled Chicken", priceDelta: 12 },
          { id: "beef", label: "Beef Stew", priceDelta: 10 },
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Mensah O.",
        rating: 5,
        comment: "Reminds me of home. The fried fish add-on is worth it every time.",
        createdAt: "2026-07-16",
      },
      {
        id: "r2",
        authorName: "Fiifi A.",
        rating: 4,
        comment: "Solid waakye, consistent quality. Portion is generous for the price.",
        createdAt: "2026-07-22",
      },
    ],
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

import { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import ProductGrid, { GridLayout } from "@/components/marketplace/ProductGrid";
import LayoutToggle from "@/components/marketplace/LayoutToggle";
import FeaturedSlider from "@/components/marketplace/FeaturedSlider";
import RelatedProducts from "@/components/marketplace/RelatedProducts";
import MiniCart from "@/components/marketplace/MiniCart";
import SearchOverlay from "@/components/marketplace/SearchOverlay";
import FloatingActions from "@/components/marketplace/FloatingActions";
import { mockProducts, featuredProductIds, getRelatedProducts } from "@/lib/mockProducts";
import { ProductCategory } from "@/types/marketplace";

/*
  Header, subhead, and category taxonomy verified via live fetch of
  acesknust.com/marketplace — categories are copied exactly (including
  the emoji), not invented.
*/

const categories: { emoji: string; label: ProductCategory }[] = [
  { emoji: "🏪", label: "All" },
  { emoji: "🍔", label: "Food & Beverages" },
  { emoji: "👗", label: "Fashion & Apparel" },
  { emoji: "💻", label: "Technology & Electronics" },
  { emoji: "🛠️", label: "Services" },
  { emoji: "💄", label: "Beauty & Cosmetics" },
  { emoji: "📦", label: "Other" },
];

export default function Marketplace() {
  const [active, setActive] = useState<ProductCategory>("All");
  const [layout, setLayout] = useState<GridLayout>("grid");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const featured = useMemo(
    () =>
      featuredProductIds
        .map((id) => mockProducts.find((p) => p.id === id))
        .filter((p): p is (typeof mockProducts)[number] => Boolean(p)),
    [],
  );

  const filtered = useMemo(
    () => (active === "All" ? mockProducts : mockProducts.filter((p) => p.category === active)),
    [active],
  );

  // Demo "Related Products" — keys off the first filtered item for now.
  // On a real product-detail page, pass the actual product being viewed.
  const related = filtered[0] ? getRelatedProducts(filtered[0]) : [];

  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      <PageHeader
        eyebrow="student marketplace"
        title="ACES Marketplace"
        description="Discover products & services from fellow KNUST engineering students."
      />

      {featured.length > 0 && (
        <div className="mb-6">
          <FeaturedSlider products={featured} />
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-2">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActive(cat.label)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              active === cat.label
                ? "bg-primary text-white"
                : "bg-foreground/5 text-foreground/60"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-foreground/40">
          {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
        </p>
        <LayoutToggle value={layout} onChange={setLayout} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No listings yet"
          description={`TODO: wire in real student listings for "${active}" once vendors register. Register/Login/Vendor Dashboard flows aren't built yet — separate, larger build.`}
        />
      ) : (
        <>
          <ProductGrid products={filtered} layout={layout} />
          <div className="mt-8">
            <RelatedProducts products={related} />
          </div>
        </>
      )}

      <FloatingActions onCartClick={() => setCartOpen(true)} onSearchClick={() => setSearchOpen(true)} />
      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

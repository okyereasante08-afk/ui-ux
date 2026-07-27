import { Product } from "@/types/marketplace";
import ProductCard from "@/components/marketplace/ProductCard";

export type GridLayout = "grid" | "list" | "masonry";

interface ProductGridProps {
  products: Product[];
  layout: GridLayout;
}

export default function ProductGrid({ products, layout }: ProductGridProps) {
  if (products.length === 0) return null;

  if (layout === "list") {
    return (
      <div className="flex flex-col gap-2.5">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} variant="list" index={i} />
        ))}
      </div>
    );
  }

  if (layout === "masonry") {
    // CSS columns give a true masonry effect without JS measurement or
    // extra deps — break-inside-avoid keeps each card intact.
    return (
      <div className="columns-2 gap-3 [&>*]:mb-3">
        {products.map((product, i) => (
          <div key={product.id} className="break-inside-avoid">
            <ProductCard product={product} variant="grid" index={i} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} variant="grid" index={i} />
      ))}
    </div>
  );
}

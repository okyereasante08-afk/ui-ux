import { motion } from "framer-motion";
import { Product } from "@/types/marketplace";
import ProductCard from "@/components/marketplace/ProductCard";

interface RelatedProductsProps {
  title?: string;
  products: Product[];
}

export default function RelatedProducts({
  title = "Frequently Bought Together",
  products,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-2">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-3 font-mono text-xs uppercase tracking-widest text-aces-blue/80"
      >
        {title}
      </motion.p>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-6 -mx-6">
        {products.map((product, i) => (
          <div key={product.id} className="w-36 shrink-0">
            <ProductCard product={product} variant="grid" index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

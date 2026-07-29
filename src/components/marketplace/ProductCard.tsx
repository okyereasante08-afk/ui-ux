import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Product } from "@/types/marketplace";
import { useCart, useWishlist } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import ProductImage from "@/components/marketplace/ProductImage";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list";
  index?: number;
}

export default function ProductCard({ product, variant = "grid", index = 0 }: ProductCardProps) {
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const goToDetail = () => navigate(`/marketplace/product/${product.id}`);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id, 1);
  };

  const motionProps = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay: Math.min(index * 0.05, 0.3) },
  };

  if (variant === "list") {
    return (
      <motion.div
        {...motionProps}
        onClick={goToDetail}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && goToDetail()}
        className="group flex cursor-pointer gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] p-3 transition-colors duration-300 hover:border-aces-blue/30"
      >
        <div className="relative h-24 w-24 shrink-0">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="h-24 w-24 rounded-md object-cover"
          />
          {onSale && (
            <span className="absolute left-1 top-1 rounded bg-aces-blue px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
              Sale
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <p className="truncate text-sm font-semibold text-board-white group-hover:text-aces-blue transition-colors">
              {product.title}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-foreground/40">
              {product.vendorName}
            </p>
            {product.rating && (
              <div className="mt-1 flex items-center gap-1 text-xs text-foreground/50">
                <Star className="h-3 w-3 fill-aces-blue text-aces-blue" />
                {product.rating.toFixed(1)}
                <span className="text-foreground/30">({product.reviewCount})</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-board-white">GHS {product.price}</span>
              {onSale && (
                <span className="text-xs text-foreground/30 line-through">
                  GHS {product.compareAtPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="rounded-full p-1.5 hover:bg-foreground/5"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    wishlisted ? "fill-aces-blue text-aces-blue" : "text-foreground/30",
                  )}
                />
              </button>
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className="rounded-full bg-aces-blue p-1.5 text-white active:scale-95 transition-transform"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // grid variant (default)
  return (
    <motion.div
      {...motionProps}
      onClick={goToDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetail()}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-foreground/10 bg-foreground/[0.03] transition-colors duration-300 hover:border-aces-blue/30"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-foreground/5">
        <ProductImage
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        {onSale && (
          <span className="absolute left-2 top-2 rounded bg-aces-blue px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
            Sale
          </span>
        )}
        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm active:scale-90 transition-transform"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wishlisted ? "fill-aces-blue text-aces-blue" : "text-foreground/50",
            )}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <p className="line-clamp-1 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          {product.vendorName}
        </p>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-board-white group-hover:text-aces-blue transition-colors">
          {product.title}
        </p>
        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-foreground/50">
            <Star className="h-3 w-3 fill-aces-blue text-aces-blue" />
            {product.rating.toFixed(1)}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-board-white">GHS {product.price}</span>
            {onSale && (
              <span className="text-[10px] text-foreground/30 line-through">
                {product.compareAtPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="rounded-full bg-aces-blue p-1.5 text-white active:scale-90 transition-transform"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

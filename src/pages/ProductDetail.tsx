import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Heart, Star, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import ProductImage from "@/components/marketplace/ProductImage";
import RelatedProducts from "@/components/marketplace/RelatedProducts";
import { getProductById, getRelatedProducts } from "@/lib/mockProducts";
import { useCart, useWishlist } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;

  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-circuit-navy px-6 text-center">
        <p className="text-sm font-semibold text-board-white">Product not found</p>
        <p className="text-sm text-foreground/50">This listing may have been removed.</p>
        <button
          onClick={() => navigate("/marketplace")}
          className="rounded-full bg-aces-blue px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const wishlisted = isWishlisted(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  // A variant group is "required" if it has options — the person must
  // pick one before adding to cart. Price updates live as selections
  // change, summing any priceDelta from each chosen option.
  const groups = product.variantGroups ?? [];
  const allGroupsSelected = groups.every((g) => selected[g.id]);
  const variantDelta = groups.reduce((sum, g) => {
    const optId = selected[g.id];
    const opt = g.options.find((o) => o.id === optId);
    return sum + (opt?.priceDelta ?? 0);
  }, 0);
  const unitPrice = product.price + variantDelta;

  const handleAddToCart = () => {
    if (!allGroupsSelected) return;
    add(product.id, quantity, groups.length > 0 ? selected : undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const descriptionLong = (product.description ?? "").length > 140;
  const descriptionShown =
    !descExpanded && descriptionLong
      ? product.description!.slice(0, 140).trimEnd() + "…"
      : product.description;

  return (
    <div className="min-h-screen bg-circuit-navy pb-32">
      {/* Header bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-circuit-navy/95 px-4 py-3 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60"
        >
          <ChevronLeft className="h-4 w-4 text-foreground/70" />
        </button>
        <button
          onClick={() => toggle(product.id)}
          aria-label="Toggle wishlist"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60"
        >
          <Heart className={cn("h-4 w-4", wishlisted ? "fill-aces-blue text-aces-blue" : "text-foreground/60")} />
        </button>
      </div>

      {/* Image gallery */}
      <div className="px-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-foreground/5">
          <ProductImage
            src={images[activeImage]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          {onSale && (
            <span className="absolute left-3 top-3 rounded bg-aces-blue px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
              Sale
            </span>
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto hide-scrollbar">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                  activeImage === i ? "border-aces-blue" : "border-transparent",
                )}
              >
                <ProductImage src={img} alt={`${product.title} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title / vendor / rating */}
      <div className="px-6 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-aces-blue/80">
          {product.vendorName}
        </p>
        <h1 className="mt-1 text-xl font-semibold leading-snug text-board-white">{product.title}</h1>

        {product.rating && (
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground/60">
            <Star className="h-3.5 w-3.5 fill-aces-blue text-aces-blue" />
            <span className="font-medium text-board-white">{product.rating.toFixed(1)}</span>
            <span className="text-foreground/40">({product.reviewCount} reviews)</span>
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-board-white">GHS {unitPrice.toFixed(2)}</span>
          {onSale && (
            <span className="text-sm text-foreground/40 line-through">GHS {product.compareAtPrice}</span>
          )}
          {variantDelta !== 0 && (
            <span className="font-mono text-xs text-foreground/40">
              (base GHS {product.price} {variantDelta > 0 ? "+" : ""}
              {variantDelta.toFixed(2)})
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-foreground/40">
          {product.stock > 10
            ? "In stock"
            : product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of stock"}
        </p>
      </div>

      {/* Variant groups */}
      {groups.length > 0 && (
        <div className="mt-5 flex flex-col gap-5 px-6">
          {groups.map((group) => (
            <div key={group.id}>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/50">
                {group.label}
                {!selected[group.id] && <span className="ml-1.5 text-aces-blue/70">· required</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => {
                  const active = selected[group.id] === opt.id;
                  const disabled = opt.inStock === false;
                  return (
                    <button
                      key={opt.id}
                      disabled={disabled}
                      onClick={() => setSelected((s) => ({ ...s, [group.id]: opt.id }))}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                        active
                          ? "border-aces-blue/50 bg-aces-blue/10 text-aces-blue"
                          : "border-border text-foreground/70 hover:border-aces-blue/30",
                        disabled && "cursor-not-allowed opacity-30",
                      )}
                    >
                      {opt.swatch && (
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                          style={{ backgroundColor: opt.swatch }}
                        />
                      )}
                      {opt.label}
                      {opt.priceDelta ? (
                        <span className="text-xs text-foreground/40">
                          ({opt.priceDelta > 0 ? "+" : ""}
                          {opt.priceDelta})
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div className="mt-5 flex items-center justify-between px-6">
        <p className="font-mono text-xs uppercase tracking-wider text-foreground/50">Quantity</p>
        <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="text-foreground/60"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center text-sm font-semibold text-board-white">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="text-foreground/60"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-6 px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-aces-blue/80">
            Description
          </p>
          <p className="text-sm leading-relaxed text-foreground/60">{descriptionShown}</p>
          {descriptionLong && (
            <button
              onClick={() => setDescExpanded((v) => !v)}
              className="mt-1 text-xs font-medium text-aces-blue"
            >
              {descExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* Specs */}
      {product.specs && product.specs.length > 0 && (
        <div className="mt-6 px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-aces-blue/80">
            Details
          </p>
          <div className="overflow-hidden rounded-lg border border-border">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-sm",
                  i % 2 === 0 ? "bg-foreground/[0.02]" : "",
                )}
              >
                <span className="text-foreground/50">{spec.label}</span>
                <span className="text-right text-board-white">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-6 px-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-aces-blue/80">
            Reviews ({product.reviews.length})
          </p>
          <div className="flex flex-col gap-3">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-border bg-foreground/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-board-white">{review.authorName}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < review.rating ? "fill-aces-blue text-aces-blue" : "text-foreground/15",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-foreground/60">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-8">
          <div className="px-6">
            <RelatedProducts title="You Might Also Like" products={related} />
          </div>
        </div>
      )}

      {/* Sticky add-to-cart bar */}
      <div className="fixed inset-x-0 bottom-16 z-20 border-t border-border bg-circuit-navy/95 px-4 py-3 backdrop-blur-sm">
        <button
          onClick={handleAddToCart}
          disabled={!allGroupsSelected || product.stock === 0}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors",
            justAdded ? "bg-green-600 text-white" : "bg-aces-blue text-white",
            (!allGroupsSelected || product.stock === 0) && "opacity-40",
          )}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Added to cart
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                {product.stock === 0
                  ? "Out of stock"
                  : !allGroupsSelected
                    ? "Select options"
                    : `Add to cart — GHS ${(unitPrice * quantity).toFixed(2)}`}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

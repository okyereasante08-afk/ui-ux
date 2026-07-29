import { CartLine, Product } from "@/types/marketplace";

/** Base price + sum of selected variant options' priceDelta for this line. */
export function getLineUnitPrice(product: Product, line: Pick<CartLine, "selectedVariants">): number {
  if (!line.selectedVariants || !product.variantGroups) return product.price;
  const delta = product.variantGroups.reduce((sum, group) => {
    const optId = line.selectedVariants?.[group.id];
    const opt = group.options.find((o) => o.id === optId);
    return sum + (opt?.priceDelta ?? 0);
  }, 0);
  return product.price + delta;
}

/** Human-readable summary of a line's selected variants, e.g. "Red · Large". Null if none. */
export function getLineVariantSummary(product: Product, line: Pick<CartLine, "selectedVariants">): string | null {
  if (!line.selectedVariants || !product.variantGroups) return null;
  const parts = product.variantGroups
    .map((group) => {
      const optId = line.selectedVariants?.[group.id];
      return group.options.find((o) => o.id === optId)?.label;
    })
    .filter((label): label is string => Boolean(label));
  return parts.length > 0 ? parts.join(" · ") : null;
}

/** Stable, unique key for a cart line — same product with different variants must not collide. */
export function getLineKey(line: Pick<CartLine, "productId" | "selectedVariants">): string {
  return `${line.productId}::${JSON.stringify(line.selectedVariants ?? {})}`;
}

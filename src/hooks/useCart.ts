import { useEffect, useState, useCallback } from "react";
import { CartLine } from "@/types/marketplace";
import {
  getCart,
  subscribeToCartChanges,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartCount,
  getWishlist,
  subscribeToWishlistChanges,
  toggleWishlist,
} from "@/lib/cart";

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  const refresh = useCallback(() => setLines(getCart()), []);

  useEffect(() => {
    refresh();
    return subscribeToCartChanges(refresh);
  }, [refresh]);

  return {
    lines,
    count: getCartCount(lines),
    add: addToCart,
    remove: removeFromCart,
    updateQuantity: updateCartQuantity,
    clear: clearCart,
  };
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);

  const refresh = useCallback(() => setIds(getWishlist()), []);

  useEffect(() => {
    refresh();
    return subscribeToWishlistChanges(refresh);
  }, [refresh]);

  return {
    ids,
    isWishlisted: (productId: string) => ids.includes(productId),
    toggle: toggleWishlist,
  };
}

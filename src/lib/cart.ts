import { CartLine } from "@/types/marketplace";

const CART_KEY = "aces_cart";
const WISHLIST_KEY = "aces_wishlist";
const CART_EVENT = "aces-cart-change";
const WISHLIST_EVENT = "aces-wishlist-change";

function isBrowser() {
  return typeof window !== "undefined";
}

// ---------- Cart ----------

/*
  Cart lines are matched by productId + selectedVariants together, not
  productId alone — "Kente Bow Tie in Red" and "Kente Bow Tie in Blue"
  are different lines that shouldn't merge their quantities. This key
  function is the single source of truth for "are these the same line."
*/
function lineKey(productId: string, selectedVariants?: Record<string, string>): string {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) return productId;
  const sorted = Object.entries(selectedVariants).sort(([a], [b]) => a.localeCompare(b));
  return `${productId}::${sorted.map(([k, v]) => `${k}=${v}`).join(",")}`;
}

export function getCart(): CartLine[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(lines: CartLine[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(productId: string, quantity = 1, selectedVariants?: Record<string, string>) {
  if (!isBrowser()) return;
  const lines = getCart();
  const key = lineKey(productId, selectedVariants);
  const existing = lines.find((l) => lineKey(l.productId, l.selectedVariants) === key);
  if (existing) {
    existing.quantity += quantity;
    saveCart([...lines]);
  } else {
    saveCart([...lines, { productId, quantity, selectedVariants }]);
  }
}

export function updateCartQuantity(
  productId: string,
  quantity: number,
  selectedVariants?: Record<string, string>,
) {
  if (!isBrowser()) return;
  const lines = getCart();
  const key = lineKey(productId, selectedVariants);
  if (quantity <= 0) {
    saveCart(lines.filter((l) => lineKey(l.productId, l.selectedVariants) !== key));
    return;
  }
  saveCart(
    lines.map((l) => (lineKey(l.productId, l.selectedVariants) === key ? { ...l, quantity } : l)),
  );
}

export function removeFromCart(productId: string, selectedVariants?: Record<string, string>) {
  if (!isBrowser()) return;
  const key = lineKey(productId, selectedVariants);
  saveCart(getCart().filter((l) => lineKey(l.productId, l.selectedVariants) !== key));
}

export function clearCart() {
  if (!isBrowser()) return;
  saveCart([]);
}

export function getCartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function subscribeToCartChanges(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(CART_EVENT, callback);
  return () => window.removeEventListener(CART_EVENT, callback);
}

// ---------- Wishlist ----------

export function getWishlist(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function toggleWishlist(productId: string): boolean {
  if (!isBrowser()) return false;
  const ids = getWishlist();
  const isWishlisted = ids.includes(productId);
  saveWishlist(isWishlisted ? ids.filter((id) => id !== productId) : [...ids, productId]);
  return !isWishlisted;
}

export function subscribeToWishlistChanges(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(WISHLIST_EVENT, callback);
  return () => window.removeEventListener(WISHLIST_EVENT, callback);
}

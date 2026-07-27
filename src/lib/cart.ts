import { CartLine } from "@/types/marketplace";

const CART_KEY = "aces_cart";
const WISHLIST_KEY = "aces_wishlist";
const CART_EVENT = "aces-cart-change";
const WISHLIST_EVENT = "aces-wishlist-change";

function isBrowser() {
  return typeof window !== "undefined";
}

// ---------- Cart ----------

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

export function addToCart(productId: string, quantity = 1) {
  if (!isBrowser()) return;
  const lines = getCart();
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity += quantity;
    saveCart([...lines]);
  } else {
    saveCart([...lines, { productId, quantity }]);
  }
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (!isBrowser()) return;
  const lines = getCart();
  if (quantity <= 0) {
    saveCart(lines.filter((l) => l.productId !== productId));
    return;
  }
  saveCart(lines.map((l) => (l.productId === productId ? { ...l, quantity } : l)));
}

export function removeFromCart(productId: string) {
  if (!isBrowser()) return;
  saveCart(getCart().filter((l) => l.productId !== productId));
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

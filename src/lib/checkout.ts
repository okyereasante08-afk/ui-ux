import { Order } from "@/types/marketplace";

const ORDERS_KEY = "aces_orders";
const ORDERS_EVENT = "aces-orders-change";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getOrders(): Order[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  if (!isBrowser()) return;
  const orders = getOrders();
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
  window.dispatchEvent(new Event(ORDERS_EVENT));
}

export function subscribeToOrderChanges(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  window.addEventListener(ORDERS_EVENT, callback);
  return () => window.removeEventListener(ORDERS_EVENT, callback);
}

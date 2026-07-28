import { CartLine, DeliveryDetails, Order, PaymentMethod } from "@/types/marketplace";
import { getProductById } from "@/lib/mockProducts";

const ORDERS_KEY = "aces_orders";
const DELIVERY_FEE = 5; // flat GHS mock delivery fee — change here if you add zones later

export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const product = getProductById(line.productId);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);
}

export function getDeliveryFee(): number {
  return DELIVERY_FEE;
}

export function calculateTotal(lines: CartLine[]): number {
  return calculateSubtotal(lines) + getDeliveryFee();
}

function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

export function getOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]): void {
  try {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // localStorage can throw in private-browsing / quota-exceeded cases — fail silently for the demo
  }
}

/**
 * Creates a mock order, persists it, and returns it.
 * Does NOT touch cart state — call cart.clear() separately after this resolves.
 */
export function createOrder(
  lines: CartLine[],
  delivery: DeliveryDetails,
  paymentMethod: PaymentMethod,
): Order {
  const subtotal = calculateSubtotal(lines);
  const deliveryFee = getDeliveryFee();

  const order: Order = {
    id: generateOrderId(),
    lines,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    delivery,
    paymentMethod,
    status: "paid",
    createdAt: new Date().toISOString(),
  };

  saveOrders([order, ...getOrders()]);
  return order;
}

/** Simulates a mobile-money STK push / card auth delay. */
export function simulatePaymentDelay(ms = 2200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
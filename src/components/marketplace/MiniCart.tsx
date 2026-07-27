import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/lib/mockProducts";

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export default function MiniCart({ open, onClose }: MiniCartProps) {
  const { lines, updateQuantity, remove } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = lines
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((entry) => entry.product);

  const subtotal = items.reduce(
    (sum, { line, product }) => sum + line.quantity * (product?.price ?? 0),
    0,
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60"
          />

          <motion.div
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex w-[85%] max-w-xs flex-col border-l border-border bg-card pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                cart ({items.length})
              </span>
              <button onClick={onClose} aria-label="Close cart">
                <X className="h-5 w-5 text-foreground/70" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-10 w-10 text-foreground/20" />
                  <p className="text-sm text-foreground/50">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(({ line, product }) => (
                    <div key={line.productId} className="flex gap-3">
                      <img
                        src={product!.image}
                        alt={product!.title}
                        className="h-16 w-16 shrink-0 rounded-md object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-2 text-sm font-medium text-board-white">
                            {product!.title}
                          </p>
                          <button
                            onClick={() => remove(line.productId)}
                            aria-label="Remove item"
                            className="shrink-0 text-foreground/40 hover:text-aces-blue"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-board-white">
                            GHS {(product!.price * line.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                            <button
                              onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3 text-foreground/60" />
                            </button>
                            <span className="w-4 text-center text-xs font-semibold text-board-white">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3 text-foreground/60" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Subtotal
                  </span>
                  <span className="text-base font-bold text-board-white">
                    GHS {subtotal.toFixed(2)}
                  </span>
                </div>
                <button className="w-full rounded-full bg-aces-blue py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

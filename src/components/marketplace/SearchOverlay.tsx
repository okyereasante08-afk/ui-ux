import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, X } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";
import { Product } from "@/types/marketplace";
import ProductImage from "@/components/marketplace/ProductImage";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

const RECENT_KEY = "aces_recent_searches";

export default function SearchOverlay({ open, onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      try {
        const raw = window.localStorage.getItem(RECENT_KEY);
        setRecent(raw ? JSON.parse(raw) : []);
      } catch {
        setRecent([]);
      }
    } else {
      setQuery("");
    }
  }, [open]);

  const results: Product[] =
    query.trim().length > 0
      ? mockProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.vendorName.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  const commitSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    setRecent(updated);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSelect = (product: Product) => {
    commitSearch(query);
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate(`/marketplace/product/${product.id}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-circuit-navy"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-3">
            <button onClick={onClose} aria-label="Close search" className="p-1">
              <ArrowLeft className="h-5 w-5 text-foreground/60" />
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-foreground/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
                placeholder="Search products, vendors, categories..."
                className="w-full bg-transparent text-sm text-board-white outline-none placeholder:text-foreground/40"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-foreground/40" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {query.trim().length === 0 ? (
              recent.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-foreground/40">
                    Recent searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-foreground/70 hover:border-aces-blue/40 hover:text-aces-blue"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ) : results.length === 0 ? (
              <p className="pt-8 text-center text-sm text-foreground/40">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-foreground/5"
                  >
                    <div className="h-11 w-11 shrink-0">
                      <ProductImage
                        src={product.image}
                        alt={product.title}
                        className="h-11 w-11 rounded-md object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-board-white">{product.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                        {product.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-board-white">GHS {product.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

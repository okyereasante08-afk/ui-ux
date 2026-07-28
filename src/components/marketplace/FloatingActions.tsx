import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface FloatingActionsProps {
  onCartClick: () => void;
  onSearchClick: () => void;
}

/*
  Page-local floating controls, not part of the global BottomNav — the
  existing nav (Home/About/Events + More drawer) already has a Commerce
  group pointing here, so duplicating Cart/Search there would be
  redundant. These sit above the existing bottom nav's height so they
  don't get covered by it.

  The account button is the fix for "I can't find how to reach
  login/vendor-dashboard" — previously those routes existed but nothing
  in the UI pointed at them. Logged-out -> /login. Logged-in vendor ->
  /vendor-dashboard directly, since that's the page a vendor actually
  wants from here.
*/
export default function FloatingActions({ onCartClick, onSearchClick }: FloatingActionsProps) {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-4 z-20 flex flex-col gap-2">
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        onClick={() => navigate(user?.role === "vendor" ? "/vendor-dashboard" : "/login")}
        aria-label={user ? `Account: ${user.name}` : "Log in"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground/70 shadow-lg backdrop-blur-sm transition-colors hover:border-aces-blue/40 hover:text-aces-blue"
      >
        {user ? (
          <span className="font-mono text-xs font-bold text-aces-blue">
            {user.name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <User className="h-4 w-4" />
        )}
      </motion.button>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        onClick={onSearchClick}
        aria-label="Search marketplace"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground/70 shadow-lg backdrop-blur-sm transition-colors hover:border-aces-blue/40 hover:text-aces-blue"
      >
        <Search className="h-4 w-4" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        onClick={onCartClick}
        aria-label="Open cart"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-aces-blue text-white shadow-lg"
      >
        <ShoppingBag className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-circuit-navy bg-white px-1 font-mono text-[9px] font-bold text-aces-blue">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </motion.button>
    </div>
  );
}

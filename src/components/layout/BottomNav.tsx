import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, Calendar, Info, Grid3x3, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Primary destinations get a bottom-nav slot. Everything else (7 more
// real pages now exist) lives behind "More" — a bottom nav can't fit
// 10 destinations without becoming unusable.
const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: Info, label: "About", path: "/about" },
];

const moreLinks = [
  { label: "Executives", path: "/executives" },
  { label: "Department Officials", path: "/department" },
  { label: "Gallery", path: "/gallery" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Scholarships", path: "/scholarships" },
  { label: "Courses", path: "/courses" },
  { label: "ACES Shop", path: "/shop" },
];

export default function BottomNav() {
  const [hidden, setHidden] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setHidden(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const isMoreActive = moreLinks.some((l) => l.path === location.pathname);

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-black/60"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-white/10 bg-[#0f1a2e] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                more // pages
              </span>
              <button onClick={() => setMoreOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 px-5 pb-6 pt-2">
              {moreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "rounded-lg border border-white/10 px-4 py-3 text-sm",
                    location.pathname === link.path
                      ? "text-trace-cyan border-trace-cyan/40"
                      : "text-white/70",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={{ y: hidden ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-30 bg-circuit-navy/95 backdrop-blur-lg border-t border-white/5"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center w-16 h-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-trace-cyan"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  size={22}
                  className={cn("transition-colors duration-200", isActive ? "text-trace-cyan" : "text-white/40")}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={cn("mt-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-200", isActive ? "text-trace-cyan" : "text-white/40")}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={() => setMoreOpen(true)}
            className="relative flex flex-col items-center justify-center w-16 h-full"
          >
            {isMoreActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-trace-cyan"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Grid3x3
              size={22}
              className={cn("transition-colors duration-200", isMoreActive ? "text-trace-cyan" : "text-white/40")}
              strokeWidth={isMoreActive ? 2.5 : 1.5}
            />
            <span className={cn("mt-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-200", isMoreActive ? "text-trace-cyan" : "text-white/40")}>
              More
            </span>
          </button>
        </div>
      </motion.nav>
    </>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, Calendar, Info, Menu, X, Users, GraduationCap, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useMoreMenu } from "@/hooks/useMoreMenu";

// Exactly 3 primary destinations + a menu toggle — everything else lives
// in the grouped "More" sidebar rather than crowding the bottom bar.
const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Info, label: "About", path: "/about" },
  { icon: Calendar, label: "Events", path: "/events" },
];

// Grouped by what a student is actually trying to do, not by page type.
const moreGroups = [
  {
    label: "People",
    icon: Users,
    links: [
      { label: "Executives", path: "/executives" },
      { label: "Department Officials", path: "/department" },
      { label: "Gallery", path: "/gallery" },
    ],
  },
  {
    label: "Academics",
    icon: GraduationCap,
    links: [
      { label: "Courses", path: "/courses" },
      { label: "Scholarships", path: "/scholarships" },
    ],
  },
  {
    label: "Commerce",
    icon: ShoppingBag,
    links: [
      { label: "Marketplace", path: "/marketplace" },
      { label: "ACES Shop", path: "/shop" },
    ],
  },
];

export default function BottomNav() {
  const [hidden, setHidden] = useState(false);
  const { isOpen: moreOpen, open: openMore, close: closeMore } = useMoreMenu();
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
    closeMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isMoreActive = moreGroups.some((g) => g.links.some((l) => l.path === location.pathname));

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMore}
            className="fixed inset-0 z-40 bg-black/60"
          />
        )}
      </AnimatePresence>

      {/* More sidebar — slides in from the right, grouped by task */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[85%] max-w-xs border-l border-border bg-card pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                menu
              </span>
              <button onClick={closeMore} aria-label="Close menu">
                <X className="h-5 w-5 text-foreground/70" />
              </button>
            </div>

            <div className="px-5 pb-4">
              <ThemeToggle className="w-full justify-center" />
            </div>

            <nav className="flex flex-col gap-6 px-5 pb-8">
              {moreGroups.map((group) => (
                <div key={group.label}>
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                    <group.icon size={14} />
                    <span className="font-mono text-[11px] uppercase tracking-widest">
                      {group.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {group.links.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={closeMore}
                          className={cn(
                            "rounded-lg border px-4 py-3 text-sm transition-colors",
                            isActive
                              ? "border-aces-blue/40 text-aces-blue bg-aces-blue/5"
                              : "border-border text-foreground/80 hover:border-aces-blue/30",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={{ y: hidden ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-30 bg-circuit-navy/95 backdrop-blur-lg border-t border-foreground/5"
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
                    className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-aces-blue"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  size={22}
                  className={cn("transition-colors duration-200", isActive ? "text-aces-blue" : "text-board-white/40")}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={cn("mt-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-200", isActive ? "text-aces-blue" : "text-board-white/40")}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          <button
            onClick={openMore}
            className="relative flex flex-col items-center justify-center w-16 h-full"
          >
            {isMoreActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-aces-blue"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Menu
              size={22}
              className={cn("transition-colors duration-200", isMoreActive || moreOpen ? "text-aces-blue" : "text-board-white/40")}
              strokeWidth={isMoreActive ? 2.5 : 1.5}
            />
            <span className={cn("mt-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-200", isMoreActive || moreOpen ? "text-aces-blue" : "text-board-white/40")}>
              More
            </span>
          </button>
        </div>
      </motion.nav>
    </>
  );
}

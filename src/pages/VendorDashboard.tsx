import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Package, DollarSign, Clock, TrendingUp } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { VendorStats } from "@/types/marketplace";

// TODO: replace with a real query scoped to the logged-in vendor's id
// once vendor listings/orders exist server-side.
const mockStats: VendorStats = {
  totalSales: 1240,
  activeListings: 6,
  ordersThisWeek: 14,
  pendingOrders: 3,
};

export default function VendorDashboardPage() {
  const { user, isLoading } = useAuth();

  // While localStorage hasn't been read yet, render nothing rather than
  // flashing a "not authorized" state during hydration.
  if (isLoading) {
    return <div className="min-h-screen bg-circuit-navy" />;
  }

  if (!user || user.role !== "vendor") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-circuit-navy px-6 text-center">
        <Package className="h-10 w-10 text-foreground/20" />
        <div>
          <p className="text-sm font-semibold text-board-white">Vendor access only</p>
          <p className="mt-1 text-sm text-foreground/50">
            Log in with a vendor account to view your dashboard.
          </p>
        </div>
        <Link
          to="/login"
          className="rounded-full bg-aces-blue px-5 py-2.5 text-sm font-semibold text-white"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      <PageHeader
        eyebrow={user.storeName ?? "your store"}
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description="Here's how your store is performing."
      />

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={DollarSign} label="Total Sales" value={`GHS ${mockStats.totalSales.toLocaleString()}`} index={0} />
        <StatCard icon={Package} label="Active Listings" value={mockStats.activeListings} index={1} />
        <StatCard icon={TrendingUp} label="Orders This Week" value={mockStats.ordersThisWeek} index={2} />
        <StatCard icon={Clock} label="Pending Orders" value={mockStats.pendingOrders} index={3} />
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-aces-blue py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]">
        <Plus className="h-4 w-4" />
        Add Product
      </button>

      <div className="mt-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-aces-blue/80">
          Recent Orders
        </p>
        <EmptyState
          title="No orders yet"
          description="TODO: wire in real order history once checkout is built."
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: typeof DollarSign;
  label: string;
  value: string | number;
  index: number;
}

function StatCard({ icon: Icon, label, value, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4"
    >
      <Icon className="h-4 w-4 text-aces-blue" />
      <p className="mt-2 text-lg font-bold text-board-white">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">{label}</p>
    </motion.div>
  );
}

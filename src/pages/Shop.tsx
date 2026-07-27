import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { ShoppingBag } from "lucide-react";

/*
  Header + empty-state copy verified via live fetch of
  acesknust.com/shop — the live site literally says "No products
  available at the moment," used here verbatim rather than inventing
  a product catalog for an org's own real store that has none yet.
*/

export default function Shop() {
  return (
    <div className="min-h-screen bg-circuit-navy px-8 pb-24">
      <PageHeader
        eyebrow="shop // merchandise"
        title="ACES Merchandise"
        description="Rep your department with premium, verified gear. Designed for engineers, by engineers."
      />
      <EmptyState
        icon={<ShoppingBag className="h-6 w-6" />}
        title="No products available at the moment"
        description="Check back soon — merch is on its way."
      />
    </div>
  );
}

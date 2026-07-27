import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

/*
  Header, subhead, and category taxonomy verified via live fetch of
  acesknust.com/marketplace — categories are copied exactly (including
  the emoji), not invented. No real product listings were visible in
  that fetch (page showed a loading state). Register/Login/Vendor
  Dashboard sub-flows are genuinely out of scope for this pass — this
  is the browse view only.
*/

const categories = [
  { emoji: "🏪", label: "All" },
  { emoji: "🍔", label: "Food & Beverages" },
  { emoji: "👗", label: "Fashion & Apparel" },
  { emoji: "💻", label: "Technology & Electronics" },
  { emoji: "🛠️", label: "Services" },
  { emoji: "💄", label: "Beauty & Cosmetics" },
  { emoji: "📦", label: "Other" },
];

export default function Marketplace() {
  const [active, setActive] = useState("All");

  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="student marketplace"
        title="ACES Marketplace"
        description="Discover products & services from fellow KNUST engineering students."
      />

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActive(cat.label)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              active === cat.label
                ? "bg-primary text-white"
                : "bg-foreground/5 text-foreground/60"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <EmptyState
        title="No listings yet"
        description={`TODO: wire in real student listings for "${active}" once vendors register. Register/Login/Vendor Dashboard flows aren't built yet — separate, larger build.`}
      />
    </div>
  );
}

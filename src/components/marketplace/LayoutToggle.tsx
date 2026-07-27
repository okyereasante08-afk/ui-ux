import { LayoutGrid, List, LayoutDashboard } from "lucide-react";
import { GridLayout } from "@/components/marketplace/ProductGrid";
import { cn } from "@/lib/utils";

interface LayoutToggleProps {
  value: GridLayout;
  onChange: (layout: GridLayout) => void;
}

const options: { value: GridLayout; icon: typeof LayoutGrid; label: string }[] = [
  { value: "grid", icon: LayoutGrid, label: "Grid" },
  { value: "list", icon: List, label: "List" },
  { value: "masonry", icon: LayoutDashboard, label: "Masonry" },
];

export default function LayoutToggle({ value, onChange }: LayoutToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={active}
            className={cn(
              "flex items-center justify-center rounded-full p-1.5 transition-colors",
              active ? "bg-aces-blue text-white" : "text-foreground/40 hover:text-aces-blue",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}

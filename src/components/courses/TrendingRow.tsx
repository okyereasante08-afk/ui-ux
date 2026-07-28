import { Flame } from "lucide-react";
import { type Resource } from "./types";
import ResourceCard from "./ResourceCard";

interface TrendingRowProps {
  resources: Resource[];
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
  onPreview: (r: Resource) => void;
}

export default function TrendingRow({ resources, bookmarks, onToggleBookmark, onPreview }: TrendingRowProps) {
  if (resources.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Flame className="h-4 w-4 text-aces-blue" />
        <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80">
          trending this week
        </p>
      </div>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-8 px-8 pb-1">
        {resources.map((r, i) => (
          <ResourceCard
            key={r.id}
            resource={r}
            index={i}
            compact
            isBookmarked={bookmarks.has(r.id)}
            onToggleBookmark={() => onToggleBookmark(r.id)}
            onPreview={() => onPreview(r)}
          />
        ))}
      </div>
    </div>
  );
}

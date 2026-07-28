import { Search, SlidersHorizontal, Bookmark, ChevronDown } from "lucide-react";
import { type ResourceType, resourceTypeLabels, years, semesters } from "./types";
import { cn } from "@/lib/utils";

interface CourseOption {
  code: string;
  name: string;
}

interface FilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeType: ResourceType | "all";
  onTypeChange: (t: ResourceType | "all") => void;
  year: string;
  onYearChange: (y: string) => void;
  semester: string;
  onSemesterChange: (s: string) => void;
  course: string;
  onCourseChange: (c: string) => void;
  courseOptions: CourseOption[];
  showBookmarkedOnly: boolean;
  onToggleBookmarkedOnly: () => void;
}

const typeOptions: (ResourceType | "all")[] = ["all", "past-questions", "slides", "handouts", "assignments", "textbooks"];

export default function FilterBar({
  query, onQueryChange,
  activeType, onTypeChange,
  year, onYearChange,
  semester, onSemesterChange,
  course, onCourseChange,
  courseOptions,
  showBookmarkedOnly, onToggleBookmarkedOnly,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Global search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/35" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          type="text"
          placeholder="Search by title or course code — e.g. COE 251"
          className="w-full rounded-full border border-foreground/10 bg-foreground/[0.03] py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-aces-blue/40"
        />
      </div>

      {/* Resource type chips */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-8 px-8">
        {typeOptions.map((t) => (
          <button
            key={t}
            onClick={() => onTypeChange(t)}
            className={cn(
              "flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              activeType === t
                ? "border-aces-blue bg-aces-blue text-white"
                : "border-foreground/10 text-foreground/60 hover:border-aces-blue/30",
            )}
          >
            {t === "all" ? "All Types" : resourceTypeLabels[t]}
          </button>
        ))}
      </div>

      {/* Year / Semester / Course selects + bookmark filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-foreground/30 flex-shrink-0" />

        <div className="relative flex-1 min-w-0">
          <select
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-foreground/10 bg-foreground/[0.03] py-2 pl-3 pr-7 text-xs text-foreground/80 focus:outline-none focus:border-aces-blue/40"
          >
            <option value="all">All Years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/30 pointer-events-none" />
        </div>

        <div className="relative flex-1 min-w-0">
          <select
            value={semester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-foreground/10 bg-foreground/[0.03] py-2 pl-3 pr-7 text-xs text-foreground/80 focus:outline-none focus:border-aces-blue/40"
          >
            <option value="all">All Sems</option>
            {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/30 pointer-events-none" />
        </div>

        <div className="relative flex-1 min-w-0">
          <select
            value={course}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full appearance-none rounded-lg border border-foreground/10 bg-foreground/[0.03] py-2 pl-3 pr-7 text-xs text-foreground/80 focus:outline-none focus:border-aces-blue/40"
          >
            <option value="all">All Courses</option>
            {courseOptions.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/30 pointer-events-none" />
        </div>

        <button
          onClick={onToggleBookmarkedOnly}
          aria-pressed={showBookmarkedOnly}
          aria-label="Show bookmarked only"
          className={cn(
            "flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
            showBookmarkedOnly
              ? "border-aces-blue bg-aces-blue/10 text-aces-blue"
              : "border-foreground/10 text-foreground/40 hover:text-foreground/70",
          )}
        >
          <Bookmark className="h-3.5 w-3.5" fill={showBookmarkedOnly ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

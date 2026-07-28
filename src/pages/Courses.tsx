import { useState, useEffect, useMemo, useCallback } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import FilterBar from "@/components/courses/FilterBar";
import ResourceCard from "@/components/courses/ResourceCard";
import ResourceSkeleton from "@/components/courses/ResourceSkeleton";
import PreviewModal from "@/components/courses/PreviewModal";
import TrendingRow from "@/components/courses/TrendingRow";
import ContributionCTA from "@/components/courses/ContributionCTA";
import { type Resource, type ResourceType, placeholderResources } from "@/components/courses/types";

/*
  Header copy verified via live fetch of acesknust.com/courses
  (real meta description: "Download lecture slides, past questions, and
  study materials for Computer Engineering courses at KNUST"). No real
  resource listings were visible in that fetch.

  PLACEHOLDER DATA (see components/courses/types.ts) — course codes,
  file sizes, download counts, and dates are all illustrative, to
  preview the library's search/filter/preview/bookmark design. Swap for
  a real resource feed before ship — loadResources() below is the one
  place to point at a real API.

  Error state isn't randomly triggered against this placeholder data
  (that'd be bad UX for a page that "works"), but it's fully wired: flip
  FORCE_ERROR_FOR_PREVIEW to true to see it, or point loadResources() at
  a real fetch that can actually fail.
*/
const FORCE_ERROR_FOR_PREVIEW = false;
const BOOKMARKS_KEY = "aces-course-bookmarks";

type LoadState = "loading" | "error" | "success";

export default function Courses() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");
  const [year, setYear] = useState("all");
  const [semester, setSemester] = useState("all");
  const [course, setCourse] = useState("all");
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [previewResource, setPreviewResource] = useState<Resource | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BOOKMARKS_KEY);
      if (stored) setBookmarks(new Set(JSON.parse(stored)));
    } catch {
      // localStorage unavailable — bookmarks just won't persist
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try {
        window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const loadResources = useCallback(() => {
    setLoadState("loading");
    const t = setTimeout(() => {
      setLoadState(FORCE_ERROR_FOR_PREVIEW ? "error" : "success");
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => loadResources(), [loadResources]);

  const courseOptions = useMemo(() => {
    const map = new Map<string, string>();
    placeholderResources.forEach((r) => map.set(r.courseCode, r.courseName));
    return [...map.entries()].map(([code, name]) => ({ code, name }));
  }, []);

  const trending = useMemo(
    () => [...placeholderResources].sort((a, b) => b.downloads - a.downloads).slice(0, 5),
    [],
  );

  const isBrowsingUnfiltered =
    !query && activeType === "all" && year === "all" && semester === "all" && course === "all" && !showBookmarkedOnly;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return placeholderResources.filter((r) => {
      if (showBookmarkedOnly && !bookmarks.has(r.id)) return false;
      if (activeType !== "all" && r.type !== activeType) return false;
      if (year !== "all" && r.year !== year) return false;
      if (semester !== "all" && r.semester !== semester) return false;
      if (course !== "all" && r.courseCode !== course) return false;
      if (q) {
        const haystack = `${r.title} ${r.courseCode} ${r.courseName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeType, year, semester, course, showBookmarkedOnly, bookmarks]);

  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="courses // resources"
        title="Course Materials"
        description="Access comprehensive course materials, resources, and study guides for your academic program."
      />

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        activeType={activeType}
        onTypeChange={setActiveType}
        year={year}
        onYearChange={setYear}
        semester={semester}
        onSemesterChange={setSemester}
        course={course}
        onCourseChange={setCourse}
        courseOptions={courseOptions}
        showBookmarkedOnly={showBookmarkedOnly}
        onToggleBookmarkedOnly={() => setShowBookmarkedOnly((v) => !v)}
      />

      <div className="mt-8">
        {loadState === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <ResourceSkeleton key={i} />)}
          </div>
        )}

        {loadState === "error" && (
          <EmptyState
            icon={<AlertTriangle className="h-8 w-8" />}
            title="Failed to load resources"
            description="Something went wrong fetching the resource library. Check your connection and try again."
            action={
              <button
                onClick={loadResources}
                className="flex items-center gap-2 rounded-full bg-aces-blue px-5 py-2 text-sm font-medium text-white hover:bg-aces-blue/90 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try Again
              </button>
            }
          />
        )}

        {loadState === "success" && (
          <>
            {isBrowsingUnfiltered && (
              <TrendingRow
                resources={trending}
                bookmarks={bookmarks}
                onToggleBookmark={toggleBookmark}
                onPreview={setPreviewResource}
              />
            )}

            {filtered.length === 0 ? (
              <EmptyState
                title={showBookmarkedOnly ? "No bookmarks yet" : "No resources match your filters"}
                description={
                  showBookmarkedOnly
                    ? "Tap the bookmark icon on any resource to save it here."
                    : "Try adjusting your search or filters."
                }
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((r, i) => (
                  <ResourceCard
                    key={r.id}
                    resource={r}
                    index={i}
                    isBookmarked={bookmarks.has(r.id)}
                    onToggleBookmark={() => toggleBookmark(r.id)}
                    onPreview={() => setPreviewResource(r)}
                  />
                ))}
              </div>
            )}

            <ContributionCTA />
          </>
        )}
      </div>

      <PreviewModal resource={previewResource} onClose={() => setPreviewResource(null)} />
    </div>
  );
}

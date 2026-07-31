import { motion } from "framer-motion";
import { FileText, FileArchive, Presentation, Bookmark, Eye, FileQuestion, ClipboardList, BookOpen } from "lucide-react";
import { type Resource, resourceTypeLabels, formatFileSize, formatDateAdded } from "./types";
import DownloadButton from "./DownloadButton";
import { cn } from "@/lib/utils";

const formatIcons = {
  pdf: FileText,
  zip: FileArchive,
  docx: FileText,
  pptx: Presentation,
};

const typeIcons = {
  "past-questions": FileQuestion,
  slides: Presentation,
  handouts: FileText,
  assignments: ClipboardList,
  textbooks: BookOpen,
};

interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPreview: () => void;
  index?: number;
  compact?: boolean;
}

export default function ResourceCard({
  resource,
  isBookmarked,
  onToggleBookmark,
  onPreview,
  index = 0,
  compact = false,
}: ResourceCardProps) {
  const FormatIcon = formatIcons[resource.format];
  const TypeIcon = typeIcons[resource.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={cn(
        "rounded-xl border border-foreground/10 bg-card p-4",
        compact && "snap-center shrink-0 w-[72vw] max-w-[260px]",
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aces-blue/10 text-aces-blue">
            <FormatIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-aces-blue/80">
              {resource.courseCode}
            </p>
            <p className="flex items-center gap-1 text-[10px] text-foreground/40">
              <TypeIcon className="h-3 w-3" />
              {resourceTypeLabels[resource.type]}
            </p>
          </div>
        </div>
        <button
          onClick={onToggleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={isBookmarked}
          className={cn(
            "flex-shrink-0 transition-colors",
            isBookmarked ? "text-aces-blue" : "text-foreground/25 hover:text-foreground/50",
          )}
        >
          <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="font-heading text-sm font-bold text-board-white leading-snug mb-1">
        {resource.title}
      </h3>
      <p className="text-xs text-foreground/50 mb-3">{resource.courseName}</p>

      <div className="flex items-center gap-3 text-[11px] text-foreground/40 mb-4">
        <span className="uppercase font-mono">{resource.format}</span>
        <span>·</span>
        <span>{formatFileSize(resource.sizeKB)}</span>
        <span>·</span>
        <span>{formatDateAdded(resource.dateAdded)}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPreview}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-foreground/10 py-2 text-xs font-medium text-foreground/70 hover:border-aces-blue/30 hover:text-aces-blue transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
        <DownloadButton sizeKB={resource.sizeKB} className="flex-1" />
      </div>
    </motion.div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import { type Resource, resourceTypeLabels, formatFileSize, formatDateAdded } from "./types";

interface PreviewModalProps {
  resource: Resource | null;
  onClose: () => void;
}

export default function PreviewModal({ resource, onClose }: PreviewModalProps) {
  return (
    <AnimatePresence>
      {resource && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70"
          />
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="pointer-events-auto w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-aces-blue/20 bg-card shadow-2xl overflow-hidden max-h-[88vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/10">
                <p className="font-mono text-[11px] uppercase tracking-widest text-aces-blue">
                  preview
                </p>
                <button onClick={onClose} aria-label="Close preview" className="text-foreground/50 hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mock document preview — swap for a real embedded viewer
                  (e.g. PDF iframe) once actual files are uploaded */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-foreground/15 bg-foreground/[0.02] py-14 mb-5">
                  <FileText className="h-12 w-12 text-foreground/15 mb-3" strokeWidth={1} />
                  <p className="text-xs text-foreground/40 max-w-[220px] text-center leading-relaxed">
                    Document preview isn't wired up yet — this will show the
                    real file once uploads are live.
                  </p>
                </div>

                <h3 className="font-heading text-base font-bold text-board-white mb-1">
                  {resource?.title}
                </h3>
                <p className="text-xs text-foreground/50 mb-3">
                  {resource?.courseCode} · {resource?.courseName}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-foreground/40 mb-5">
                  <span>{resource && resourceTypeLabels[resource.type]}</span>
                  <span>·</span>
                  <span className="uppercase font-mono">{resource?.format}</span>
                  <span>·</span>
                  <span>{resource && formatFileSize(resource.sizeKB)}</span>
                  <span>·</span>
                  <span>{resource && formatDateAdded(resource.dateAdded)}</span>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-aces-blue py-2.5 text-sm font-medium text-white hover:bg-aces-blue/90 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

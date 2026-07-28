export default function ResourceSkeleton() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-card p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-9 w-9 rounded-lg bg-foreground/10" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-16 rounded bg-foreground/10" />
          <div className="h-2 w-20 rounded bg-foreground/5" />
        </div>
      </div>
      <div className="h-3.5 w-4/5 rounded bg-foreground/10 mb-2" />
      <div className="h-3 w-3/5 rounded bg-foreground/5 mb-4" />
      <div className="h-2.5 w-2/3 rounded bg-foreground/5 mb-4" />
      <div className="flex gap-2">
        <div className="h-8 flex-1 rounded-lg bg-foreground/5" />
        <div className="h-8 flex-1 rounded-lg bg-foreground/5" />
      </div>
    </div>
  );
}

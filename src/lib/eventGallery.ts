// Vite's import.meta.glob scans this path pattern AT BUILD TIME and
// bundles whatever it finds. That's the whole trick: to add photos to
// an event, just drop image files into src/assets/events/<slug>/ and
// rebuild (or save, in dev) — nothing here needs to change, ever.
//
// To add a brand NEW event: add one entry to src/data/events.ts (id,
// title, description), then create src/assets/events/<that-same-id>/
// and drop photos in. The folder name MUST match the event's `id`.
const modules = import.meta.glob<string>(
  "/src/assets/events/*/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

const bySlug: Record<string, string[]> = {};

for (const path in modules) {
  // path looks like /src/assets/events/hangout/photo-1.png
  const match = path.match(/\/assets\/events\/([^/]+)\//);
  const slug = match?.[1];
  if (!slug) continue;
  if (!bySlug[slug]) bySlug[slug] = [];
  bySlug[slug].push(modules[path]);
}

// Sort so ordering is stable and predictable (alphabetical by filename)
// rather than whatever order the filesystem happens to return.
for (const slug in bySlug) {
  bySlug[slug].sort();
}

export function getEventGallery(slug: string): string[] {
  return bySlug[slug] ?? [];
}

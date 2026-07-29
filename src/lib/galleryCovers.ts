// Same trick as src/lib/eventGallery.ts: Vite scans this path at build
// time. To add a cover photo for an album, drop a file into
// src/assets/gallery/ named exactly <slug>.<ext> — e.g. codefest.jpg
// for the album with slug "codefest". No code needs to change.
const modules = import.meta.glob<string>(
  "/src/assets/gallery/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

const bySlug: Record<string, string> = {};

for (const path in modules) {
  // path looks like /src/assets/gallery/codefest.jpg
  const match = path.match(/\/assets\/gallery\/([^/.]+)\./);
  const slug = match?.[1];
  if (slug) bySlug[slug] = modules[path];
}

export function getAlbumCover(slug: string): string | undefined {
  return bySlug[slug];
}

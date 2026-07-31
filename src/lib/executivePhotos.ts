// Same trick as eventGallery.ts / galleryCovers.ts: Vite scans this
// path at build time. To add a photo for an executive, drop a file
// into src/assets/executives/ named exactly <id>.<ext> — matching that
// person's `id` in src/pages/Executives.tsx. No code needs to change.
const modules = import.meta.glob<string>(
  "/src/assets/executives/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

const byId: Record<string, string> = {};

for (const path in modules) {
  // path looks like /src/assets/executives/president.jpg
  const match = path.match(/\/assets\/executives\/([^/.]+)\./);
  const id = match?.[1];
  if (id) byId[id] = modules[path];
}

export function getExecutivePhoto(id: string): string | undefined {
  return byId[id];
}

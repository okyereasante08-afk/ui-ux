// Same trick as executivePhotos.ts / eventGallery.ts / galleryCovers.ts:
// Vite scans this path at build time. To add a photo for a department
// official, drop a file into src/assets/officials/ named exactly
// <id>.<ext> — matching that person's `id` in src/pages/Staff.tsx.
const modules = import.meta.glob<string>(
  "/src/assets/officials/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

const byId: Record<string, string> = {};

for (const path in modules) {
  const match = path.match(/\/assets\/officials\/([^/.]+)\./);
  const id = match?.[1];
  if (id) byId[id] = modules[path];
}

export function getOfficialPhoto(id: string): string | undefined {
  return byId[id];
}

import PageHeader from "@/components/ui/PageHeader";
import { OrbitGallery, type OrbitItem } from "@/components/ui/OrbitGallery";
import { getAlbumCover } from "@/lib/galleryCovers";

/*
  Real find via live fetch of acesknust.com/gallery: this isn't an
  in-app image grid at all — it's an index of links out to external
  photo albums (Pixieset, Google Drive, Telegram). Album names/links
  below are copied verbatim from the live site, not invented.

  Cover photos are optional and auto-discovered — drop a file named
  <slug>.jpg into src/assets/gallery/ (see galleryCovers.ts) and it'll
  appear on that album's tile. Until then, tiles show the album title
  as a placeholder and are still fully clickable.
*/

const albums = [
  { slug: "codefest", title: "CODEFEST", url: "https://Acesworks.pixieset.com/codefest/" },
  { slug: "cbet-dinner", title: "Nocte Memminisse | CBET Dinner and Excellence Awards", url: "https://drive.google.com/drive/folders/1-7r1f4S3YR8NjzcKWv3NZV5eSxIJcTtR" },
  { slug: "rep-aces", title: "REP ACES", url: "https://simondelali.pixieset.com/acesphotoshoot-1/" },
  { slug: "aces-week", title: "ACES Week", url: "https://Acesworks.pixieset.com/acesweek/" },
  { slug: "field-trip", title: "FIELD TRIP", url: "https://Acesworks.pixieset.com/fieldtrip/" },
  { slug: "orientation", title: "Orientation", url: "https://Acesworks.pixieset.com/orientation/" },
  { slug: "medtech-rave", title: "MedTech Rave", url: "https://Acesworks.pixieset.com/medtechrave/" },
  { slug: "ladies-meetup", title: "Ladies Meetup", url: "https://Acesworks.pixieset.com/ladiesmeetup/" },
];

const items: OrbitItem[] = albums.map((album) => ({
  id: album.slug,
  src: getAlbumCover(album.slug),
  href: album.url,
  label: album.title,
}));

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="gallery // albums"
        title="ACES Gallery"
        description="Explore the rich tapestry of moments and achievements within our department through a curated collection of images. Drag the ring to spin, tap an album to open it."
      />

      <OrbitGallery items={items} />

      <a
        href="https://t.me/+Is6U_pngOmYyMjM0"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 block text-center font-mono text-xs text-aces-blue/80 hover:underline"
      >
        full telegram gallery →
      </a>
    </div>
  );
}

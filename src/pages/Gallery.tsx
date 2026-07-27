import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

/*
  Real find via live fetch of acesknust.com/gallery: this isn't an
  in-app image grid at all — it's an index of links out to external
  photo albums (Pixieset, Google Drive, Telegram). Album names/links
  below are copied verbatim from the live site, not invented.
*/

const albums = [
  { title: "CODEFEST", url: "https://Acesworks.pixieset.com/codefest/" },
  { title: "Nocte Memminisse | CBET Dinner and Excellence Awards", url: "https://drive.google.com/drive/folders/1-7r1f4S3YR8NjzcKWv3NZV5eSxIJcTtR" },
  { title: "REP ACES", url: "https://simondelali.pixieset.com/acesphotoshoot-1/" },
  { title: "ACES Week", url: "https://Acesworks.pixieset.com/acesweek/" },
  { title: "FIELD TRIP", url: "https://Acesworks.pixieset.com/fieldtrip/" },
  { title: "Orientation", url: "https://Acesworks.pixieset.com/orientation/" },
  { title: "MedTech Rave", url: "https://Acesworks.pixieset.com/medtechrave/" },
  { title: "Ladies Meetup", url: "https://Acesworks.pixieset.com/ladiesmeetup/" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background px-8 pb-24">
      <PageHeader
        eyebrow="gallery // albums"
        title="ACES Gallery"
        description="Explore the rich tapestry of moments and achievements within our department through a curated collection of images."
      />

      <div className="grid gap-3">
        {albums.map((album, i) => (
          <motion.a
            key={album.title}
            href={album.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-4 hover:border-aces-blue/30 transition-colors"
          >
            <span className="text-sm font-medium text-foreground">{album.title}</span>
            <ExternalLink className="h-4 w-4 text-aces-blue/60 shrink-0" />
          </motion.a>
        ))}
      </div>

      <a
        href="https://t.me/+Is6U_pngOmYyMjM0"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block text-center font-mono text-xs text-aces-blue/80 hover:underline"
      >
        full telegram gallery →
      </a>
    </div>
  );
}

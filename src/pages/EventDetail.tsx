import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { upcomingEvents, pastEvents } from "@/data/events";
import { getEventGallery } from "@/lib/eventGallery";
import { OrbitGallery } from "@/components/ui/OrbitGallery";

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = [...upcomingEvents, ...pastEvents].find((e) => e.id === slug);

  if (!event) return <Navigate to="/events" replace />;

  const gallery = getEventGallery(event.id);

  return (
    <div className="min-h-screen bg-background px-8 pb-24 pt-24 md:pt-28">
      <Link
        to="/events"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All events
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs text-aces-blue uppercase tracking-widest mb-2">
          event // {event.id}
        </p>
        <h1 className="font-heading text-3xl font-extrabold text-foreground mb-3">
          {event.title}
        </h1>
        <p className="text-sm font-medium text-foreground/60 leading-relaxed max-w-xl mb-10">
          {event.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4">
          gallery // {gallery.length} photo{gallery.length === 1 ? "" : "s"}
        </p>
        <OrbitGallery images={gallery} />
      </motion.div>
    </div>
  );
}

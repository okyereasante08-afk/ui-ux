import { useMotionValue, motion, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

const ITEM_SIZE = 160;

interface OrbitGalleryProps {
  images: string[];
}

export function OrbitGallery({ images }: OrbitGalleryProps) {
  const rotateY = useMotionValue(0);
  const count = images.length;
  const angleStep = count > 0 ? 360 / count : 0;
  // Standard even-spacing formula so cards on the ring don't overlap —
  // radius grows automatically as more photos get added to the folder.
  const radius = count > 1 ? Math.round(ITEM_SIZE / 2 / Math.tan(Math.PI / count)) : 0;

  function step(direction: 1 | -1) {
    animate(rotateY, rotateY.get() + direction * angleStep, {
      type: "spring",
      stiffness: 200,
      damping: 24,
    });
  }

  function handleDrag(_: unknown, info: { delta: { x: number } }) {
    rotateY.set(rotateY.get() + info.delta.x * 0.4);
  }

  function handleDragEnd(_: unknown, info: { velocity: { x: number } }) {
    animate(rotateY, rotateY.get() + info.velocity.x * 0.06, {
      type: "inertia",
      power: 0.6,
      timeConstant: 300,
      restDelta: 0.5,
    });
  }

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/15 py-16 text-center">
        <ImageOff className="h-6 w-6 text-foreground/30" />
        <p className="text-sm text-foreground/50">No photos yet</p>
        <p className="text-xs text-foreground/30 max-w-[220px]">
          Drop images into this event's folder in <code>src/assets/events/</code> and they'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex items-center justify-center touch-none select-none"
        style={{ perspective: 1000, height: ITEM_SIZE + 40, width: "100%" }}
      >
        <motion.div
          drag="x"
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            transformStyle: "preserve-3d",
            rotateY,
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 overflow-hidden rounded-xl border border-foreground/10 shadow-lg"
              style={{
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          ))}
        </motion.div>
      </div>

      {count > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => step(-1)}
            aria-label="Rotate left"
            className="rounded-full border border-foreground/10 p-2 hover:border-aces-blue/40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-foreground/60" />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">
            drag to spin
          </p>
          <button
            onClick={() => step(1)}
            aria-label="Rotate right"
            className="rounded-full border border-foreground/10 p-2 hover:border-aces-blue/40 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-foreground/60" />
          </button>
        </div>
      )}
    </div>
  );
}

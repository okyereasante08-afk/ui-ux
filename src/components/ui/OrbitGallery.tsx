import { useMotionValue, motion, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

const ITEM_SIZE = 160;

export interface OrbitItem {
  id: string;
  src?: string; // optional — tiles without a photo yet show a text placeholder
  href?: string; // optional — makes the tile a clickable link (e.g. external album)
  label?: string; // optional — caption overlay, e.g. album title
}

interface OrbitGalleryProps {
  items: OrbitItem[];
}

export function OrbitGallery({ items }: OrbitGalleryProps) {
  const rotateY = useMotionValue(0);
  const count = items.length;
  const angleStep = count > 0 ? 360 / count : 0;
  // Standard even-spacing formula so tiles on the ring don't overlap —
  // radius grows automatically as more items get added.
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
        <p className="text-sm text-foreground/50">Nothing here yet</p>
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
          dragConstraints={{ left: 0, right: 0 }}
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
          {items.map((item, i) => {
            const Tile = (
              <div className="relative h-full w-full">
                {item.src ? (
                  <img src={item.src} alt={item.label ?? ""} className="h-full w-full object-cover" draggable={false} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-foreground/5 p-3 text-center">
                    <span className="text-[11px] font-medium leading-tight text-foreground/50">
                      {item.label}
                    </span>
                  </div>
                )}
                {item.src && item.label && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                    <span className="line-clamp-2 text-[10px] font-medium leading-tight text-white">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={item.id}
                className="absolute inset-0 overflow-hidden rounded-xl border border-foreground/10 shadow-lg"
                style={{
                  transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full"
                    // Dragging the ring shouldn't accidentally fire a
                    // navigation — only a real (non-drag) click should.
                    onClick={(e) => {
                      if (Math.abs(rotateY.getVelocity()) > 50) e.preventDefault();
                    }}
                  >
                    {Tile}
                  </a>
                ) : (
                  Tile
                )}
              </div>
            );
          })}
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

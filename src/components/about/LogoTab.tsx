import { useState } from "react";
import LogoTrace from "./LogoTrace";

export default function LogoTab() {
  const [playKey, setPlayKey] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <button
        onClick={() => setPlayKey((k) => k + 1)}
        aria-label="Replay logo animation"
        className="mb-6"
      >
        <LogoTrace key={playKey} size={160} />
      </button>
      <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80 mb-2">
        aces // knust
      </p>
      <p className="text-sm text-foreground/50 max-w-xs">
        Tap the mark to replay the trace.
      </p>
    </div>
  );
}

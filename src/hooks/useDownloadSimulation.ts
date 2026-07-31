import { useCallback, useRef, useState } from "react";

export type DownloadState = "idle" | "downloading" | "done";

interface UseDownloadSimulationResult {
  state: DownloadState;
  progress: number; // 0-100
  start: () => void;
}

/*
  Simulates a file download with a percentage progress bar, since there
  are no real files behind these resources yet (see the note in
  PreviewModal — document preview isn't wired up either, same reason).
  Progress advances in irregular steps rather than a perfectly linear
  tick, so it reads as a real transfer rather than an obvious fake timer.

  Duration scales with the resource's file size so a 41MB textbook
  visibly takes longer than a 180KB assignment — small, but it's the
  difference between "convincing" and "obviously fake."
*/
export function useDownloadSimulation(sizeKB: number): UseDownloadSimulationResult {
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const start = useCallback(() => {
    if (state === "downloading") return;
    setState("downloading");
    setProgress(0);

    // Scale total duration by file size: clamped between ~900ms and ~2600ms
    // so nothing feels sluggish even for the 41MB textbook placeholder.
    const totalDuration = Math.min(2600, Math.max(900, 700 + sizeKB / 40));
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      // Ease-out curve: fast start, slows near the end — reads as a
      // real transfer rather than a linear progress bar.
      const linear = Math.min(1, elapsed / totalDuration);
      const eased = 1 - Math.pow(1 - linear, 2);
      const pct = Math.round(eased * 100);

      setProgress(pct);

      if (linear < 1) {
        timeoutRef.current = setTimeout(tick, 60 + Math.random() * 60);
      } else {
        setProgress(100);
        setState("done");
        timeoutRef.current = setTimeout(() => {
          setState("idle");
          setProgress(0);
        }, 2200);
      }
    };

    timeoutRef.current = setTimeout(tick, 60);
  }, [state, sizeKB]);

  return { state, progress, start };
}

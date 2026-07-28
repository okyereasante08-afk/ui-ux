import { Upload } from "lucide-react";

export default function ContributionCTA() {
  return (
    <div className="mt-10 rounded-2xl border border-aces-blue/20 bg-gradient-to-br from-aces-blue/10 to-transparent p-6 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-aces-blue/15 text-aces-blue">
        <Upload className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-base font-bold text-board-white mb-1.5">
        Got materials to share?
      </h3>
      <p className="text-sm text-foreground/55 max-w-xs mx-auto mb-4 leading-relaxed">
        Missing past questions or slides for your course? Help other
        students by contributing what you have.
      </p>
      <button className="rounded-full bg-aces-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-aces-blue/90 transition-colors">
        Submit a Resource
      </button>
    </div>
  );
}

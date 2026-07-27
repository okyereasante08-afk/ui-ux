import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-foreground/10 px-6 py-16 text-center"
    >
      {icon && <div className="text-aces-blue/60">{icon}</div>}
      <div className="space-y-1">
        <p className="font-medium text-white">{title}</p>
        {description && <p className="text-sm text-foreground/50">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}

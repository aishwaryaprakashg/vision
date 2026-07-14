import { motion } from "framer-motion";
import { pct } from "@/utils/format";

export function ConfidenceBar({
  value,
  label,
  index = 0,
}: {
  value: number;
  label: string;
  index?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 truncate pr-2">{label}</span>
        <span className="font-mono text-slate-400">{pct(value)}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(2, value * 100)}%` }}
          transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

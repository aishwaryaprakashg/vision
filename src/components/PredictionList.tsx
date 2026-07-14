import { motion } from "framer-motion";
import { pct } from "@/utils/format";
import type { Prediction } from "@/types";

interface PredictionListProps {
  predictions: Prediction[];
}

export function PredictionList({ predictions }: PredictionListProps) {
  return (
    <div className="space-y-3">
      {predictions.map((p, i) => (
        <PredictionRow key={`${p.className}-${i}`} prediction={p} rank={i + 1} top={i === 0} />
      ))}
    </div>
  );
}

function PredictionRow({
  prediction,
  rank,
  top,
}: {
  prediction: Prediction;
  rank: number;
  top: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.07, duration: 0.4 }}
      className={`rounded-xl p-3 transition-colors ${
        top
          ? "bg-gradient-to-r from-brand-500/15 to-accent-500/5 border border-brand-400/30"
          : "bg-white/[0.02] border border-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
            top
              ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white"
              : "bg-white/5 text-slate-400"
          }`}
          aria-label={`Rank ${rank}`}
        >
          {rank}
        </span>
        <span className={`flex-1 truncate text-sm ${top ? "text-white font-semibold" : "text-slate-300"}`}>
          {prediction.className}
        </span>
        <span className={`font-mono text-xs ${top ? "text-brand-300" : "text-slate-400"}`}>
          {pct(prediction.probability)}
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            top
              ? "bg-gradient-to-r from-brand-500 to-accent-400"
              : "bg-gradient-to-r from-slate-500 to-slate-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(2, prediction.probability * 100)}%` }}
          transition={{ duration: 0.7, delay: rank * 0.07, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

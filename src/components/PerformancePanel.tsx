import { motion } from "framer-motion";
import { BarChart3, Clock, Gauge, Timer, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { formatMs } from "@/utils/format";

interface PerformancePanelProps {
  modelLoadMs: number;
  classificationMs: number;
  ocrMs: number;
  totalMs: number;
}

export function PerformancePanel({
  modelLoadMs,
  classificationMs,
  ocrMs,
  totalMs,
}: PerformancePanelProps) {
  const metrics = [
    { icon: Zap, label: "Model Load", value: modelLoadMs, color: "from-brand-500 to-brand-400" },
    { icon: Gauge, label: "Inference", value: classificationMs, color: "from-accent-500 to-accent-400" },
    { icon: Clock, label: "OCR", value: ocrMs, color: "from-violet-500 to-violet-400" },
    { icon: Timer, label: "Total", value: totalMs, color: "from-emerald-500 to-emerald-400" },
  ];
  const max = Math.max(modelLoadMs, classificationMs, ocrMs, totalMs, 1);

  return (
    <GlassCard strong bordered className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={16} className="text-brand-300" />
        <h3 className="font-display font-semibold text-white text-sm">Performance</h3>
        <span className="ml-auto text-[10px] text-slate-500 font-mono">measured on-device</span>
      </div>

      <div className="space-y-4">
        {metrics.map((m, i) => (
          <div key={m.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-2 text-slate-300">
                <m.icon size={13} className="text-slate-400" />
                {m.label}
              </span>
              <span className="font-mono text-slate-400">{formatMs(m.value)}</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(3, (m.value / max) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass p-2.5 text-center"
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wide">{m.label}</div>
            <div className="text-sm font-semibold text-white mt-0.5 font-mono">{formatMs(m.value)}</div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

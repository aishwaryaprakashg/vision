import { motion } from "framer-motion";
import { Brain, HelpCircle, Lightbulb, Tag } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { formatMs, pct } from "@/utils/format";
import type { AnalysisResult } from "@/types";

export function AiInsightsCard({ result }: { result: AnalysisResult }) {
  const label = result.topPrediction.className;
  const insight = `This image most closely matches the learned visual patterns of a ${label}.`;

  return (
    <GlassCard strong bordered className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={16} className="text-amber-300" />
        <h3 className="font-display font-semibold text-white text-sm">AI Insights</h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass p-4 mb-4"
      >
        <p className="text-sm text-slate-200 leading-relaxed">{insight}</p>
        <p className="text-xs text-slate-500 mt-2">
          Confidence: <span className="text-brand-300 font-mono">{pct(result.topPrediction.probability)}</span>
          {" · "}Category: <span className="text-brand-300">{result.category}</span>
          {" · "}Processed in <span className="text-brand-300 font-mono">{formatMs(result.totalMs)}</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <InsightStat icon={Tag} label="Prediction" value={label} />
        <InsightStat icon={Brain} label="Confidence" value={pct(result.topPrediction.probability)} />
        <InsightStat icon={Tag} label="Category" value={result.category} />
        <InsightStat icon={Brain} label="Model" value="MobileNet v2" />
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={14} className="text-brand-300" />
          <span className="text-xs font-semibold text-white uppercase tracking-wide">
            How was this predicted?
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          MobileNet is a convolutional neural network pre-trained on millions of
          labeled images. When you upload an image, TensorFlow.js passes it
          through the network's layers, which compare learned visual features —
          edges, textures, shapes, and color patterns — against its trained
          categories. The category with the closest feature match receives the
          highest confidence score. This is pattern matching, not human-like
          reasoning — the model does not "understand" the image, it recognizes
          statistical similarities to what it was trained on.
        </p>
      </div>
    </GlassCard>
  );
}

function InsightStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="glass p-2.5 text-center">
      <Icon size={13} className="mx-auto text-brand-300 mb-1" />
      <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="text-xs font-semibold text-white mt-0.5 truncate" title={value}>
        {value}
      </div>
    </div>
  );
}

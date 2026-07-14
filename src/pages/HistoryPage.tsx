import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Download,
  FileClock,
  FileText,
  Gauge,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { useHistory } from "@/hooks/useHistory";
import {
  buildReport,
  downloadText,
  formatBytes,
  formatDate,
  formatMs,
  pct,
} from "@/utils/format";
import type { AnalysisResult } from "@/types";

export default function HistoryPage() {
  const { items, remove, clear } = useHistory();
  const [active, setActive] = useState<AnalysisResult | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display font-bold text-white text-2xl">Analysis History</h2>
          <p className="text-sm text-slate-400 mt-1">
            {items.length} saved {items.length === 1 ? "analysis" : "analyses"} · stored locally in your browser
          </p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="btn-ghost text-sm">
            <Trash2 size={14} /> Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <FileClock size={28} className="text-slate-500" />
          </div>
          <p className="text-white font-medium">No history yet</p>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Analyses you run on the dashboard will be saved here automatically —
            entirely in your browser's LocalStorage.
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassCard
                  className="p-4 h-full group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                  onClick={() => setActive(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(item);
                    }
                  }}
                  aria-label={`Open report for ${item.topPrediction.className}`}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 bg-ink-900 shrink-0">
                      <img
                        src={item.imageDataUrl}
                        alt={item.topPrediction.className}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white truncate">
                        {item.topPrediction.className}
                      </div>
                      <div className="text-xs text-brand-300 font-mono mt-0.5">
                        {pct(item.topPrediction.probability)} · {item.category}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5">
                        <Clock size={11} />
                        {formatDate(item.uploadedAt)}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <Gauge size={11} />
                        {formatMs(item.totalMs)} · {formatBytes(item.fileSize)}
                      </div>
                    </div>
                  </div>

                  {item.extractedText && (
                    <div className="mt-3 glass p-2.5 text-xs text-slate-300 font-mono line-clamp-2 max-h-12 overflow-hidden">
                      {item.extractedText}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(item);
                      }}
                      className="btn-ghost text-xs flex-1"
                    >
                      <FileText size={13} /> View Report
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadText(`visionai-report-${item.id}.txt`, buildReport(item));
                      }}
                      className="btn-ghost text-xs px-2.5"
                      aria-label="Download report"
                    >
                      <Download size={13} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(item.id);
                      }}
                      className="btn-ghost text-xs px-2.5 text-red-300 hover:text-red-200"
                      aria-label="Delete entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ReportModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}

function ReportModal({ item, onClose }: { item: AnalysisResult | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Analysis report"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-white text-lg">Analysis Report</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-ink-900 shrink-0">
                <img src={item.imageDataUrl} alt={item.topPrediction.className} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-white">{item.topPrediction.className}</div>
                <div className="text-sm text-brand-300 font-mono">{pct(item.topPrediction.probability)} · {item.category}</div>
                <div className="text-xs text-slate-500 mt-1">{item.imageName} · {formatBytes(item.fileSize)}</div>
                <div className="text-xs text-slate-500">{formatDate(item.uploadedAt)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="glass p-3 space-y-1.5 text-sm">
                <Row label="Prediction" value={item.topPrediction.className} />
                <Row label="Confidence" value={pct(item.topPrediction.probability)} />
                <Row label="Category" value={item.category} />
              </div>
              <div className="glass p-3 space-y-1.5 text-sm">
                <Row label="Resolution" value={`${item.width}×${item.height}px`} />
                <Row label="Classification" value={formatMs(item.classificationMs)} />
                <Row label="Total" value={formatMs(item.totalMs)} />
              </div>
            </div>

            <div className="glass p-3 mb-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
                Top Predictions
              </div>
              <div className="space-y-1.5 text-xs">
                {item.predictions.map((p, i) => (
                  <div key={p.className} className="flex items-center justify-between">
                    <span className="text-slate-300 truncate pr-2">
                      <span className="text-slate-500 font-mono mr-2">{i + 1}.</span>
                      {p.className}
                    </span>
                    <span className="font-mono text-slate-400">{pct(p.probability)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-3 mb-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
                OCR Result
              </div>
              {item.extractedText ? (
                <div className="text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {item.extractedText}
                </div>
              ) : (
                <div className="text-sm text-slate-500">No readable text detected</div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => downloadText(`visionai-report-${item.id}.txt`, buildReport(item))}
                className="btn-primary text-sm flex-1"
              >
                <Download size={15} /> Download TXT
              </button>
              <button onClick={onClose} className="btn-ghost text-sm">
                Close
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-center text-[11px] text-slate-500 leading-relaxed">
              Generated locally using TensorFlow.js MobileNet. No image data was
              transmitted to any external server.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium text-right truncate">{value}</span>
    </div>
  );
}

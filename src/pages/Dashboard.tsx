import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Brain,
  Calendar,
  Clock,
  Copy,
  Cpu,
  Download,
  FileImage,
  FileText,
  Gauge,
  Image as ImageIcon,
  Layers,
  Lock,
  Palette,
  RotateCcw,
  ScanEye,
  Shield,
  Sparkles,
  Tag,
  Upload,
  WifiOff,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { CopyButton } from "@/components/CopyButton";
import { AnalysisSkeleton } from "@/components/Skeleton";
import { PrivacyCards } from "@/components/StatusCards";
import { PredictionList } from "@/components/PredictionList";
import { AiInsightsCard } from "@/components/AiInsightsCard";
import { ModelStatusCard } from "@/components/ModelStatusCard";
import { PerformancePanel } from "@/components/PerformancePanel";
import { useAnalysis } from "@/hooks/useAnalysis";
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

const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export default function Dashboard() {
  const { analyze, reset, loading, stage, progress, error, result } = useAnalysis();
  const { add } = useHistory();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setUploadError(null);
      if (!ACCEPTED.includes(file.type)) {
        setUploadError("Unsupported file type. Please upload a PNG, JPG, JPEG, or WEBP image.");
        return;
      }
      if (file.size === 0) {
        setUploadError("This file appears to be empty.");
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => setUploadError("Could not read this file. Please try another image.");
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        try {
          const res = await analyze(file, dataUrl);
          add(res);
        } catch {
          /* error surfaced via hook */
        }
      };
      reader.readAsDataURL(file);
    },
    [analyze, add]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onPick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onNew = () => {
    setPreview(null);
    setUploadError(null);
    reset();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <PrivacyCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload + Preview */}
        <div className="space-y-4">
          <UploadArea
            dragOver={dragOver}
            setDragOver={setDragOver}
            onDrop={onDrop}
            onPick={onPick}
            inputRef={inputRef}
            disabled={loading}
            uploadError={uploadError}
          />
          {preview && (
            <ImagePreviewCard
              preview={preview}
              result={result}
              onNew={onNew}
              loading={loading}
            />
          )}
        </div>

        {/* Analysis */}
        <div className="space-y-4">
          <AnalysisCard
            loading={loading}
            stage={stage}
            progress={progress}
            error={error}
            result={result}
          />
          <ModelStatusCard />
        </div>
      </div>

      {result && (
        <>
          <AiInsightsCard result={result} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OcrCard text={result.extractedText} ms={result.ocrMs} confidence={result.ocrConfidence} />
            <ImageInfoCard result={result} />
            <PaletteCard palette={result.palette} />
          </div>
          <PerformancePanel
            modelLoadMs={result.modelLoadMs}
            classificationMs={result.classificationMs}
            ocrMs={result.ocrMs}
            totalMs={result.totalMs}
          />
          <ReportCard result={result} />
        </>
      )}
    </div>
  );
}

/* ---------- Upload Area ---------- */

function UploadArea({
  dragOver,
  setDragOver,
  onDrop,
  onPick,
  inputRef,
  disabled,
  uploadError,
}: {
  dragOver: boolean;
  setDragOver: (v: boolean) => void;
  onDrop: (e: React.DragEvent) => void;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  disabled: boolean;
  uploadError: string | null;
}) {
  return (
    <GlassCard strong bordered className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Upload size={16} className="text-brand-300" />
        <h2 className="font-display font-semibold text-white">Upload Image</h2>
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        aria-label="Upload image by clicking or dragging a file"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 text-center cursor-pointer focus-visible:outline-brand-400 ${
          dragOver
            ? "border-brand-400 bg-brand-500/10 scale-[1.01]"
            : "border-white/10 bg-white/[0.02] hover:border-white/20"
        } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <motion.div
          animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
          className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-white/10 flex items-center justify-center mb-4"
        >
          <ScanEye size={28} className="text-brand-200" />
        </motion.div>
        <p className="text-white font-medium">Drag & drop an image here</p>
        <p className="text-sm text-slate-400 mt-1">or click to browse · PNG, JPG, JPEG, WEBP</p>
        <button
          onClick={() => inputRef.current?.click()}
          className="btn-primary mt-5"
          disabled={disabled}
        >
          <Upload size={15} /> Choose Image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          onChange={onPick}
          className="hidden"
        />
      </div>
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200"
            role="alert"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{uploadError}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

/* ---------- Image Preview ---------- */

function ImagePreviewCard({
  preview,
  result,
  onNew,
  loading,
}: {
  preview: string;
  result: AnalysisResult | null;
  onNew: () => void;
  loading: boolean;
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ImageIcon size={16} className="text-brand-300" />
          <h3 className="font-display font-semibold text-white text-sm">Image Preview</h3>
        </div>
        <button onClick={onNew} className="btn-ghost text-xs px-3 py-1.5" aria-label="Start a new analysis">
          <RotateCcw size={13} /> New
        </button>
      </div>
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-ink-900">
        <img src={preview} alt="Uploaded preview" className="w-full h-auto max-h-[360px] object-contain" />
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 mx-auto rounded-full border-2 border-brand-400/30 border-t-brand-400"
                />
                <div className="mt-3 text-xs text-slate-300">Analyzing on-device…</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {result && (
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <FileImage size={13} />
          <span className="truncate">{result.imageName}</span>
          <span className="text-slate-600">·</span>
          <span>{formatBytes(result.fileSize)}</span>
        </div>
      )}
    </GlassCard>
  );
}

/* ---------- Analysis Card ---------- */

function AnalysisCard({
  loading,
  stage,
  progress,
  error,
  result,
}: {
  loading: boolean;
  stage: string;
  progress: number;
  error: string | null;
  result: AnalysisResult | null;
}) {
  return (
    <GlassCard strong bordered className="p-6 min-h-[300px]">
      <div className="flex items-center gap-2 mb-4">
        <Brain size={16} className="text-brand-300" />
        <h2 className="font-display font-semibold text-white">AI Analysis</h2>
        <span className="ml-auto chip">
          <Cpu size={11} className="text-emerald-400" />
          MobileNet v2
        </span>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <StageIndicator stage={stage} />
            <div className="h-2 rounded-full bg-white/5 overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 to-accent-400"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <AnalysisSkeleton />
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-10"
            role="alert"
          >
            <AlertCircle size={36} className="text-red-400 mb-3" />
            <p className="text-white font-medium">Analysis failed</p>
            <p className="text-sm text-slate-400 mt-1 max-w-xs">{error}</p>
          </motion.div>
        )}

        {!loading && !error && !result && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-slate-500" />
            </div>
            <p className="text-white font-medium">No analysis yet</p>
            <p className="text-sm text-slate-400 mt-1 max-w-xs">
              Upload an image to see on-device classification, OCR, and palette
              extraction appear here.
            </p>
          </motion.div>
        )}

        {!loading && !error && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="glass p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Tag size={12} className="text-brand-300" />
                Top prediction
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-white text-lg"
              >
                {result.topPrediction.className}
              </motion.div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.topPrediction.probability * 100}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <span className="font-mono text-sm text-brand-300">
                  {pct(result.topPrediction.probability)}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-3 flex items-center gap-2">
                <Layers size={12} className="text-brand-300" />
                Top 5 predictions
              </div>
              <PredictionList predictions={result.predictions} />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <Stat icon={Tag} label="Category" value={result.category} />
              <Stat icon={Gauge} label="Classify" value={formatMs(result.classificationMs)} />
              <Stat icon={Clock} label="Total" value={formatMs(result.totalMs)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function StageIndicator({ stage }: { stage: string }) {
  const labels: Record<string, string> = {
    model: "Loading MobileNet model…",
    classify: "Running classification…",
    ocr: "Extracting text (OCR)…",
    palette: "Computing color palette…",
    done: "Done",
    idle: "Idle",
    error: "Error",
  };
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300" aria-live="polite">
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-brand-400"
      />
      {labels[stage] ?? "Working…"}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="glass p-3 text-center">
      <Icon size={14} className="mx-auto text-brand-300 mb-1" />
      <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="text-sm font-semibold text-white mt-0.5 truncate">{value}</div>
    </div>
  );
}

/* ---------- OCR Card ---------- */

function OcrCard({
  text,
  ms,
  confidence,
}: {
  text: string;
  ms: number;
  confidence: number;
}) {
  const hasText = text && text.trim().length > 0;
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-brand-300" />
          <h3 className="font-display font-semibold text-white text-sm">Extracted Text</h3>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          Tesseract.js · {formatMs(ms)} · {Math.round(confidence)}%
        </span>
      </div>
      <AnimatePresence mode="wait">
        {hasText ? (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="glass p-3 max-h-40 overflow-auto text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
              {text}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <CopyButton text={text} />
              <button
                onClick={() => downloadText("visionai-ocr.txt", text)}
                className="btn-ghost text-xs"
              >
                <Download size={13} /> TXT
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3"
            >
              <FileText size={26} className="text-slate-500" />
            </motion.div>
            <p className="text-sm text-slate-300 font-medium">No readable text detected</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px] leading-relaxed">
              This image doesn't contain recognizable text, or the text was too
              faint for on-device OCR.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

/* ---------- Image Info Card ---------- */

function ImageInfoCard({ result }: { result: AnalysisResult }) {
  const rows = [
    { icon: ImageIcon, label: "Resolution", value: `${result.width} × ${result.height}px` },
    { icon: FileImage, label: "File size", value: formatBytes(result.fileSize) },
    { icon: Tag, label: "Type", value: result.fileType },
    { icon: Calendar, label: "Uploaded", value: formatDate(result.uploadedAt) },
  ];
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <FileImage size={16} className="text-brand-300" />
        <h3 className="font-display font-semibold text-white text-sm">Image Information</h3>
      </div>
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <r.icon size={13} className="text-slate-500" />
              {r.label}
            </span>
            <span className="text-white font-medium font-mono text-xs">{r.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ---------- Palette Card ---------- */

function PaletteCard({ palette }: { palette: { hex: string; share: number }[] }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Palette size={16} className="text-brand-300" />
        <h3 className="font-display font-semibold text-white text-sm">Dominant Colors</h3>
      </div>
      {palette.length ? (
        <div className="space-y-2">
          {palette.map((c) => (
            <div key={c.hex} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg border border-white/10 shrink-0"
                style={{ background: c.hex }}
              />
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: c.hex }}
                  initial={{ width: 0 }}
                  animate={{ width: `${c.share * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 w-14 text-right">
                {Math.round(c.share * 100)}%
              </span>
              <span className="text-xs font-mono text-slate-500 w-16 text-right">{c.hex}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-slate-400 py-6 text-center">No palette available</div>
      )}
    </GlassCard>
  );
}

/* ---------- Report Card ---------- */

function ReportCard({ result }: { result: AnalysisResult }) {
  const report = buildReport(result);
  return (
    <GlassCard strong bordered className="p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-emerald-400" />
          <h2 className="font-display font-semibold text-white text-lg">AI Analysis Report</h2>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={report} label="Copy report" />
          <button
            onClick={() => downloadText(`visionai-report-${result.id}.txt`, report)}
            className="btn-primary text-sm"
          >
            <Download size={15} /> Download TXT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-4 space-y-2 text-sm">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-1">
            Classification
          </div>
          <Row label="Prediction" value={result.topPrediction.className} />
          <Row label="Confidence" value={pct(result.topPrediction.probability)} />
          <Row label="Category" value={result.category} />
          <Row label="Model" value="MobileNet v2" />
        </div>
        <div className="glass p-4 space-y-2 text-sm">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-1">
            Image &amp; Performance
          </div>
          <Row label="Image" value={`${result.width}×${result.height}px · ${formatBytes(result.fileSize)}`} />
          <Row label="Classification time" value={formatMs(result.classificationMs)} />
          <Row label="OCR time" value={formatMs(result.ocrMs)} />
          <Row label="Total processing" value={formatMs(result.totalMs)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="glass p-4">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
            Top Predictions
          </div>
          <div className="space-y-1.5 text-xs">
            {result.predictions.map((p, i) => (
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
        <div className="glass p-4">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold mb-2">
            Dominant Colors
          </div>
          <div className="flex flex-wrap gap-2">
            {result.palette.map((c) => (
              <div key={c.hex} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ background: c.hex }}
                />
                <span className="text-xs font-mono text-slate-400">{c.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <StatusPill icon={WifiOff} label="Network" value="Offline" good />
        <StatusPill icon={Cpu} label="Local AI" value="Active" good />
        <StatusPill icon={Lock} label="Cloud calls" value="0" good />
        <StatusPill icon={Shield} label="Privacy" value="100%" good />
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 text-center text-xs text-slate-500 leading-relaxed">
        Generated locally using TensorFlow.js MobileNet. No image data was
        transmitted to any external server.
      </div>
    </GlassCard>
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

function StatusPill({
  icon: Icon,
  label,
  value,
  good,
}: {
  icon: typeof Shield;
  label: string;
  value: string;
  good?: boolean;
}) {
  return (
    <div className="glass p-3 flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-emerald-400" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
        <div className={`text-sm font-semibold ${good ? "text-emerald-300" : "text-white"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

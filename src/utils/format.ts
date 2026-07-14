import type { AnalysisResult, Prediction } from "@/types";

export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function pct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/** Derive a broad category from a MobileNet class name (which is a WordNet synset path). */
export function deriveCategory(className: string): string {
  const lower = className.toLowerCase();
  if (/(dog|cat|bird|fish|insect|animal|horse|rabbit|hamster|snake|lizard|turtle)/.test(lower))
    return "Animal";
  if (/(car|truck|bus|motorcycle|bicycle|vehicle|ambulance|taxi|sports car)/.test(lower))
    return "Vehicle";
  if (/(food|fruit|banana|apple|orange|sandwich|pizza|cake|dessert|vegetable)/.test(lower))
    return "Food";
  if (/(person|man|woman|boy|girl|human)/.test(lower)) return "Person";
  if (/(building|house|castle|church|bridge|tower|skyscraper|barn|stadium)/.test(lower))
    return "Architecture";
  if (/(tree|flower|plant|leaf|grass|garden|cactus|palm)/.test(lower)) return "Nature";
  if (/(phone|laptop|monitor|keyboard|mouse|camera|television|printer|speaker)/.test(lower))
    return "Electronics";
  if (/(shirt|jacket|dress|pants|shoe|hat|glasses|suit|jean)/.test(lower))
    return "Clothing";
  if (/(sky|mountain|beach|ocean|sea|lake|valley|canyon|cliff|coast)/.test(lower))
    return "Landscape";
  return "Object";
}

export function topPrediction(predictions: Prediction[]): Prediction {
  return predictions[0] ?? { className: "Unknown", probability: 0 };
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function buildReport(r: AnalysisResult): string {
  const lines: string[] = [];
  lines.push("=".repeat(60));
  lines.push("  VisionAI Studio — On-Device Analysis Report");
  lines.push("=".repeat(60));
  lines.push("");
  lines.push("IMAGE INFORMATION");
  lines.push("-".repeat(60));
  lines.push(`  File:         ${r.imageName}`);
  lines.push(`  Type:         ${r.fileType}`);
  lines.push(`  Size:         ${formatBytes(r.fileSize)}`);
  lines.push(`  Resolution:   ${r.width} x ${r.height}px`);
  lines.push(`  Uploaded:     ${r.uploadedAt}`);
  lines.push("");
  lines.push("CLASSIFICATION (MobileNet v2, on-device)");
  lines.push("-".repeat(60));
  lines.push(`  Prediction:   ${r.topPrediction.className}`);
  lines.push(`  Confidence:   ${pct(r.topPrediction.probability)}`);
  lines.push(`  Category:     ${r.category}`);
  lines.push("");
  lines.push("  Top Predictions:");
  r.predictions.forEach((p, i) => {
    lines.push(`    ${i + 1}. ${p.className} — ${pct(p.probability)}`);
  });
  lines.push("");
  lines.push("OCR RESULT (Tesseract.js, on-device)");
  lines.push("-".repeat(60));
  lines.push(r.extractedText || "  (No readable text detected in image)");
  lines.push("");
  lines.push("DOMINANT COLORS");
  lines.push("-".repeat(60));
  if (r.palette.length) {
    r.palette.forEach((c) => {
      lines.push(`  ${c.hex}  (${Math.round(c.share * 100)}%)`);
    });
  } else {
    lines.push("  (No palette available)");
  }
  lines.push("");
  lines.push("PERFORMANCE");
  lines.push("-".repeat(60));
  lines.push(`  Model load time:    ${formatMs(r.modelLoadMs)}`);
  lines.push(`  Classification time: ${formatMs(r.classificationMs)}`);
  lines.push(`  OCR time:           ${formatMs(r.ocrMs)}`);
  lines.push(`  Total processing:   ${formatMs(r.totalMs)}`);
  lines.push("");
  lines.push("PRIVACY");
  lines.push("-".repeat(60));
  lines.push(`  Local AI status:   Active (100% on-device)`);
  lines.push(`  Cloud AI calls:    0`);
  lines.push(`  Network usage:     Offline`);
  lines.push(`  Privacy score:     ${r.privacyScore}%`);
  lines.push("");
  lines.push("=".repeat(60));
  lines.push("Generated locally using TensorFlow.js MobileNet.");
  lines.push("No image data was transmitted to any external server.");
  lines.push("=".repeat(60));
  return lines.join("\n");
}

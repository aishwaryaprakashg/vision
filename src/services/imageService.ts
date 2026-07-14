import Tesseract from "tesseract.js";
import type { ColorSwatch } from "@/types";

export interface OcrResult {
  text: string;
  ms: number;
  confidence: number;
  hasText: boolean;
}

/**
 * Extract text from an image using Tesseract.js entirely in the browser.
 * Loads worker + language data from a CDN on first use, then reuses the worker.
 * Filters out low-confidence garbage so callers never see random characters.
 */
let workerPromise: Promise<Tesseract.Worker> | null = null;

async function getWorker(): Promise<Tesseract.Worker> {
  if (!workerPromise) {
    workerPromise = Tesseract.createWorker("eng", 1, {
      logger: () => {},
    });
  }
  return workerPromise;
}

const MIN_CONFIDENCE = 40;
const MIN_WORD_LENGTH = 2;

function isMeaningfulText(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  // Require at least one alphabetic token of >= 2 chars.
  const words = trimmed.split(/\s+/).filter((w) => /[A-Za-z]{2,}/.test(w));
  if (words.length === 0) return false;
  // If the text is mostly non-alphanumeric noise, reject it.
  const letters = (trimmed.match(/[A-Za-z]/g) ?? []).length;
  const total = trimmed.replace(/\s/g, "").length || 1;
  return letters / total >= 0.45 && words.length >= 1;
}

export async function runOcr(
  source: string | HTMLCanvasElement | HTMLImageElement
): Promise<OcrResult> {
  const worker = await getWorker();
  const start = performance.now();
  const { data } = await worker.recognize(source);
  const ms = performance.now() - start;
  const confidence = (data as { confidence?: number }).confidence ?? 0;
  const raw = (data.text ?? "").trim();
  const hasText = confidence >= MIN_CONFIDENCE && isMeaningfulText(raw);
  return {
    text: hasText ? raw : "",
    ms,
    confidence,
    hasText,
  };
}

/** Quantize an image to a small palette using a simple color-frequency bucketing. */
export function extractPalette(
  img: HTMLImageElement,
  maxColors = 6
): ColorSwatch[] {
  const canvas = document.createElement("canvas");
  const w = 64;
  const ar = img.naturalHeight / img.naturalWidth || 1;
  const h = Math.max(1, Math.round(w * ar));
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, w, h);
  let pixels: Uint8ClampedArray;
  try {
    pixels = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return [];
  }
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
  const step = 16; // quantize each channel to 16 levels
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    if (a < 125) continue;
    const qr = Math.round(r / step) * step;
    const qg = Math.round(g / step) * step;
    const qb = Math.round(b / step) * step;
    const key = `${qr},${qg},${qb}`;
    const cur = buckets.get(key);
    if (cur) {
      cur.count++;
    } else {
      buckets.set(key, { count: 1, r: qr, g: qg, b: qb });
    }
  }
  const total = [...buckets.values()].reduce((s, b) => s + b.count, 0) || 1;
  const sorted = [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, maxColors);
  return sorted.map((b) => {
    const hex = `#${[b.r, b.g, b.b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")}`;
    return {
      hex,
      rgb: [b.r, b.g, b.b],
      share: b.count / total,
    };
  });
}

export function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

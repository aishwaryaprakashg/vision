import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import type { Prediction } from "@/types";

let modelPromise: Promise<mobilenet.MobileNet> | null = null;
let modelLoadMs = 0;
let activeBackend = "cpu";

export async function loadModel(): Promise<mobilenet.MobileNet> {
  if (!modelPromise) {
    const start = performance.now();
    // Set the backend to WebGL for GPU acceleration when available.
    try {
      await tf.setBackend("webgl");
    } catch {
      await tf.setBackend("cpu");
    }
    await tf.ready();
    activeBackend = tf.getBackend();
    modelPromise = mobilenet.load({ version: 2, alpha: 1.0 });
    await modelPromise;
    modelLoadMs = performance.now() - start;
  }
  return modelPromise;
}

export async function classifyImage(
  img: HTMLImageElement,
  topk = 5
): Promise<{ predictions: Prediction[]; ms: number }> {
  const model = await loadModel();
  const start = performance.now();
  const raw = await model.classify(img, topk);
  const ms = performance.now() - start;
  const predictions: Prediction[] = raw.map((p) => ({
    className: p.className,
    probability: p.probability,
  }));
  return { predictions, ms };
}

export function getModelLoadMs(): number {
  return modelLoadMs;
}

export function getBackend(): string {
  return activeBackend;
}

export function modelStatus(): "loading" | "ready" | "idle" {
  return modelPromise ? "loading" : "idle";
}

/** Approximate model size for MobileNet v2 alpha 1.0 (~16 MB of weights). */
export const MODEL_SIZE_MB = 16;


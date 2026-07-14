import { useCallback, useState } from "react";
import type { AnalysisResult, ColorSwatch, Prediction } from "@/types";
import { classifyImage, getModelLoadMs, loadModel } from "@/services/mobilenetService";
import {
  extractPalette,
  loadImageElement,
  runOcr,
} from "@/services/imageService";
import { deriveCategory, topPrediction, uid } from "@/utils/format";

type Stage = "idle" | "model" | "classify" | "ocr" | "palette" | "done" | "error";

export interface AnalysisState {
  loading: boolean;
  stage: Stage;
  progress: number;
  error: string | null;
  result: AnalysisResult | null;
}

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    stage: "idle",
    progress: 0,
    error: null,
    result: null,
  });

  const analyze = useCallback(
    async (file: File, dataUrl: string): Promise<AnalysisResult> => {
      setState({ loading: true, stage: "model", progress: 8, error: null, result: null });
      try {
        // 1. Warm up model
        await loadModel();
        const modelLoadMs = getModelLoadMs();
        setState((s) => ({ ...s, stage: "classify", progress: 25 }));

        // 2. Load image element
        const img = await loadImageElement(dataUrl);

        // 3. Classification
        const { predictions, ms: classificationMs } = await classifyImage(img, 5);
        const preds: Prediction[] = predictions;
        const top = topPrediction(preds);
        const category = deriveCategory(top.className);
        setState((s) => ({ ...s, stage: "ocr", progress: 55 }));

        // 4. OCR (runs in parallel-ish; do after classify to keep UI responsive)
        let extractedText = "";
        let ocrMs = 0;
        let ocrConfidence = 0;
        try {
          const ocr = await runOcr(dataUrl);
          extractedText = ocr.text;
          ocrMs = ocr.ms;
          ocrConfidence = ocr.confidence;
        } catch (e) {
          console.warn("OCR failed", e);
        }
        setState((s) => ({ ...s, stage: "palette", progress: 80 }));

        // 5. Palette
        let palette: ColorSwatch[] = [];
        try {
          palette = extractPalette(img, 6);
        } catch (e) {
          console.warn("Palette failed", e);
        }

        const totalMs = classificationMs + ocrMs;
        const result: AnalysisResult = {
          id: uid(),
          imageName: file.name,
          imageDataUrl: dataUrl,
          fileType: file.type || "image/*",
          fileSize: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          uploadedAt: new Date().toISOString(),
          predictions: preds,
          topPrediction: top,
          category,
          extractedText,
          palette,
          classificationMs,
          ocrMs,
          ocrConfidence,
          modelLoadMs,
          totalMs,
          privacyScore: 100,
        };

        setState({
          loading: false,
          stage: "done",
          progress: 100,
          error: null,
          result,
        });
        return result;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Analysis failed";
        setState({ loading: false, stage: "error", progress: 0, error: msg, result: null });
        throw e;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ loading: false, stage: "idle", progress: 0, error: null, result: null });
  }, []);

  return { ...state, analyze, reset };
}

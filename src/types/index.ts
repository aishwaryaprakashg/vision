export interface Prediction {
  className: string;
  probability: number;
}

export interface ColorSwatch {
  hex: string;
  rgb: [number, number, number];
  share: number;
}

export interface AnalysisResult {
  id: string;
  imageName: string;
  imageDataUrl: string;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  uploadedAt: string;
  predictions: Prediction[];
  topPrediction: Prediction;
  category: string;
  extractedText: string;
  palette: ColorSwatch[];
  classificationMs: number;
  ocrMs: number;
  ocrConfidence: number;
  modelLoadMs: number;
  totalMs: number;
  privacyScore: number;
}

export interface PrivacyStat {
  label: string;
  value: string;
  hint: string;
  status: "good" | "neutral";
}

export type Theme = "dark" | "light";

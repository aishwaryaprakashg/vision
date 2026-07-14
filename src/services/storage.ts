import type { AnalysisResult } from "@/types";

const KEY = "visionai.history.v1";
const MAX_ITEMS = 50;

export function loadHistory(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AnalysisResult[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: AnalysisResult[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch (err) {
    // localStorage may be full from accumulated data URLs; drop oldest and retry once.
    if (items.length > 5) {
      try {
        localStorage.setItem(KEY, JSON.stringify(items.slice(0, Math.floor(items.length / 2))));
      } catch {
        /* give up silently */
      }
    }
    console.warn("History save failed", err);
  }
}

export function addHistory(item: AnalysisResult): AnalysisResult[] {
  const items = [item, ...loadHistory()].slice(0, MAX_ITEMS);
  save(items);
  return items;
}

export function removeHistory(id: string): AnalysisResult[] {
  const items = loadHistory().filter((i) => i.id !== id);
  save(items);
  return items;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

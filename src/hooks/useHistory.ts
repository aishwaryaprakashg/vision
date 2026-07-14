import { useCallback, useEffect, useState } from "react";
import type { AnalysisResult } from "@/types";
import {
  addHistory,
  clearHistory,
  loadHistory,
  removeHistory,
} from "@/services/storage";

export function useHistory() {
  const [items, setItems] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const add = useCallback((item: AnalysisResult) => {
    setItems(addHistory(item));
  }, []);

  const remove = useCallback((id: string) => {
    setItems(removeHistory(id));
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setItems([]);
  }, []);

  return { items, add, remove, clear };
}

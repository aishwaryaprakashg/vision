import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/types";

const KEY = "visionai.theme";

function getInitial(): Theme {
  const saved = localStorage.getItem(KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggle };
}

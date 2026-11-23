import { useEffect, useState } from "react";
import { isTheme, readStoredTheme, type Theme } from "../const/themes";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The selection still works for this visit when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" && isTheme(event.newValue)) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return {
    theme,
    setTheme,
  };
}

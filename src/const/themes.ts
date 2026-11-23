export const THEMES = [
  { value: "latte", label: "Latte (jasny)" },
  { value: "espresso", label: "Espresso (ciemny)" },
] as const;

export type Theme = (typeof THEMES)[number]["value"];

export function isTheme(value: unknown): value is Theme {
  return THEMES.some((theme) => theme.value === value);
}

function mapLegacyTheme(value: unknown): Theme | null {
  if (value === "day") return "latte";
  if (value === "night" || value === "cyberpunk") return "espresso";
  return null;
}

export function readStoredTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (isTheme(saved)) return saved;
    return mapLegacyTheme(saved) ?? "latte";
  } catch {
    return "latte";
  }
}

export const PATHS = {
  HOME: "/",
  BOOKS: "/books",
  LEGO: "/lego",
  MODELS: "/models",
  WASGIJ: "/wasgij",
} as const;

/** Links shown in the top navigation, in this order. */
export const NAV_ITEMS = [
  { label: "Books", path: PATHS.BOOKS },
  { label: "LEGO", path: PATHS.LEGO },
  { label: "Models", path: PATHS.MODELS },
  { label: "Wasgij", path: PATHS.WASGIJ },
] as const;

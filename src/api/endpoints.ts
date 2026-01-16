export const ENDPOINTS = {
  health: "/health",
  files: "/files",
  books: "/files/books",
  coins: "/files/coins",
  lego: "/files/lego",
  wasgij: "/files/wasgij",
  paperModels: "/files/paperModels",
} as const;

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

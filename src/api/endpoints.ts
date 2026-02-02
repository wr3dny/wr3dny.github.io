export const ENDPOINTS = {
  health: "/health",
  files: "/files",
  books: "/files/books",
  fileMeta: (key: string) => `/meta/files/${key}`,
  lego: "/files/lego",
  wasgij: "/files/wasgij",
  paperModels: "/files/paperModels",
} as const;

import type { CSSProperties } from "react";

export type CellValue = string | number | boolean | null;
export type TableRow = Record<string, CellValue>;

export interface TableColumn {
  key: string;
  label: string;
  width?: CSSProperties["width"];
}

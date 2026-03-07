export type CellValue = string | number | boolean | null;

export const useToCellValue = () => {
  const toCellValue = (v: unknown): CellValue => {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v;
    return String(v);
  };

  return { toCellValue };
};

import { type Book, useBooksQuery } from "../../api/queries/useBooksQuery.ts";
import { CustomTable } from "../../components/Table/CustomTable.tsx";
import { useFileMetaQuery } from "../../api/queries/useFileMetaQuery.ts";

import styles from "./Books.module.css";

type CellValue = string | number | boolean | null;
type TableRow = Record<string, CellValue>;

const toCellValue = (v: unknown): CellValue => {
  if (v === null) return "";
  if (v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v;

  return String(v);
};

export const Books = () => {
  const { data: books } = useBooksQuery();
  const { data: meta } = useFileMetaQuery("books");

  if (!books || books.length === 0) {
    return <p className={styles.noFound}>No books found</p>;
  }

  if (!meta) {
    const keys = Object.keys(books[0] as Book);
    const rows: TableRow[] = books.map((book) => {
      const record = book as Record<string, unknown>;
      const row: TableRow = {};
      for (const key of keys) row[key] = toCellValue(record[key]);
      return row;
    });

    return <CustomTable caption="Books" columns={keys} rows={rows} />;
  }

  const columns: string[] = ["ID", ...meta.fields.map(([, label]) => label)];
  const idKey = meta.idKey || "id";

  const rows: TableRow[] = books.map((book) => {
    const record = book as Record<string, unknown>;
    const row: TableRow = { ID: toCellValue(record[idKey]) };

    for (const [fieldKey, label] of meta.fields) {
      row[label] = toCellValue(record[fieldKey]);
    }

    return row;
  });

  return (
    <CustomTable
      caption={meta.label ?? "Books"}
      columns={columns}
      rows={rows}
    />
  );
};

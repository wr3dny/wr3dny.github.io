import { type Book, useBooksQuery } from "../../api/queries/useBooksQuery.ts";
import {
  type CellValue,
  CustomTable,
} from "../../components/Table/CustomTable.tsx";
import { useFileMetaQuery } from "../../api/queries/useFileMetaQuery.ts";

import styles from "./Books.module.css";
import { useToCellValue } from "../../hooks/useToCellValue .ts";

type TableRow = Record<string, CellValue>;

export const Books = () => {
  const { data: books } = useBooksQuery();
  const { data: meta } = useFileMetaQuery("books");
  const { toCellValue } = useToCellValue();

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

    return <CustomTable columns={keys} rows={rows} />;
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

  return <CustomTable columns={columns} rows={rows} />;
};

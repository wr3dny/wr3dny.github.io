import {
  CustomTable,
  type TableRow,
} from "../../components/Table/CustomTable.tsx";
import { useFileMetaQuery } from "../../api/queries/useFileMetaQuery.ts";
import { useToCellValue } from "../../hooks/useToCellValue .ts";
import styles from "../Books/Books.module.css";
import {
  type PaperModel,
  usePaperModelQuery,
} from "../../api/queries/usePaperModelQuery.ts";

export const Models = () => {
  const { data: models } = usePaperModelQuery();
  const { data: meta } = useFileMetaQuery("paperModels");
  const { toCellValue } = useToCellValue();

  if (!models || models.length === 0) {
    return <p className={styles.noFound}>No books found</p>;
  }

  if (!meta) {
    const keys = Object.keys(models[0] as PaperModel);
    const rows: TableRow[] = models.map((model) => {
      const record = model as Record<string, unknown>;
      const row: TableRow = {};
      for (const key of keys) row[key] = toCellValue(record[key]);
      return row;
    });

    return <CustomTable columns={keys} rows={rows} />;
  }

  const columns: string[] = ["ID", ...meta.fields.map(([, label]) => label)];
  const idKey = meta.idKey || "id";

  const rows: TableRow[] = models.map((model) => {
    const record = model as Record<string, unknown>;
    const row: TableRow = { ID: toCellValue(record[idKey]) };

    for (const [fieldKey, label] of meta.fields) {
      row[label] = toCellValue(record[fieldKey]);
    }

    return row;
  });

  return (
    <div className={styles.wrapper}>
      <CustomTable columns={columns} rows={rows} />;
    </div>
  );
};

import { useFileMetaQuery } from "../api/queries/useFileMetaQuery.ts";

interface Props {
  fileName: string;
}
export const useDataToTableTransformer = ({ fileName }: Props) => {
  const { data: meta } = useFileMetaQuery(fileName);

  return meta;
};

// const columns: string[] = ["ID", ...meta.fields.map(([, label]) => label)];
// const idKey = meta.idKey || "id";
//
// const rows: TableRow[] = books.map((book) => {
//   const record = book as Record<string, unknown>;
//   const row: TableRow = { ID: toCellValue(record[idKey]) };
//
//   for (const [fieldKey, label] of meta.fields) {
//     row[label] = toCellValue(record[fieldKey]);
//   }
//
//   return row;
// });

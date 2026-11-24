import type { Key } from "react";
import clsx from "clsx";
import type { TableColumn, TableRow } from "../../types/table";
import styles from "./CustomTable.module.css";

interface Props {
  columns: ReadonlyArray<TableColumn>;
  rows: ReadonlyArray<TableRow>;
  rowKeys?: ReadonlyArray<Key>;
  className?: string;
}

export const CustomTable = ({ columns, rows, rowKeys, className }: Props) => {
  const hasFixedWidths = columns.some((column) => column.width !== undefined);

  return (
    <table className={clsx(styles.table, className)}>
      {hasFixedWidths && (
        <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: column.width }} />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" className={styles.thead}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={rowKeys?.[index] ?? index}>
            {columns.map((column) => (
              <td key={column.key}>{String(row[column.key] ?? "")}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

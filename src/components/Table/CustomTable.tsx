import styles from "./CustomTable.module.css";

export type CellValue = string | number | boolean | null;
export type TableRow = Record<string, CellValue>;

interface Props {
  columns: string[];
  rows: TableRow[];
}

export const CustomTable = ({ columns, rows }: Props) => {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          {columns.map((column) => (
            <th key={column} className={styles.thead}>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column}>{row[column] ?? ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export type CellValue = string | number | boolean | null;
export type TableRow = Record<string, CellValue>;

interface Props {
  caption: string;
  columns: string[];
  rows: TableRow[];
}

export const CustomTable = ({ caption, columns, rows }: Props) => {
  return (
    <table>
      <caption>{caption}</caption>

      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
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

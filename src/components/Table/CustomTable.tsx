export type CellValue = string | number | boolean | null;
export type TableRow = Record<string, CellValue>;

interface Props {
  caption: string;
  columns: CellValue[];

  cellsData: string | number;
}

export const Table = ({ caption }: Props) => {
  return (
    <table>
      <caption>{caption}</caption>

      <thead>
        <tr>
          <th>Header 1</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </tbody>
    </table>
  );
};

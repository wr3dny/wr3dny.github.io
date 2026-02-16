// import { CustomTable, type TableRow } from "../Table/CustomTable.tsx";
//
// interface Props {
//   columns: string[];
//   rows: TableRow[];
// }
//
// export const PageWithTable = ({ columns, rows }: Props) => {
//   return (
//     <div>
//       <CustomTable columns={columns} rows={rows} />
//     </div>
//   );
// };

interface Props {
  name: string;
}

export const PageWithTable = ({ name }: Props) => {
  return <div>{name}</div>;
};

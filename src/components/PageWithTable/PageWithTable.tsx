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

import styles from "./PageWithTable.module.css";

interface Props {
  name: string;
}

export const PageWithTable = ({ name }: Props) => {
  return <div className={styles.wrapper}>{name}</div>;
};

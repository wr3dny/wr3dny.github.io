import { CustomTable, type TableRow } from "../Table/CustomTable.tsx";

import styles from "./PageWithTable.module.scss";

interface Props {
  caption: string;
  columns: string[];
  rows: TableRow[];
}

export const PageWithTable = ({ caption, columns, rows }: Props) => {
  return (
    <div className={styles.wrapper}>
      <CustomTable caption={caption} columns={columns} rows={rows} />
    </div>
  );
};

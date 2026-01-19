import styles from "./Books.module.css";
import { useBooksQuery } from "../../api/queries/useBooksQuery.ts";
import { CustomTable } from "../../components/Table/CustomTable.tsx";

export type Book = {
  id: number;
  title: string;
  translatedTitle?: string | null;
  author: string;
  series?: string | null;
  numberInSeries?: number | null;
  format: string;
};

export const Books = () => {
  const { data } = useBooksQuery();

  if (!data || data.length === 0) {
    return <p className={styles.noFOund}>No books found</p>;
  }

  const columns = Object.keys(data[0]);

  return <CustomTable caption="Books" columns={columns} rows={data} />;
};

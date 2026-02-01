import styles from "./Books.module.css";
import { useBooksQuery } from "../../api/queries/useBooksQuery.ts";
import { CustomTable } from "../../components/Table/CustomTable.tsx";

export type Book = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  originalTitle: string | null;
  worldHero: string | null;
  numberInSeries: number | null;
  subSeries: string | null;
  numberInSubSeries: string | null;
};

export const Books = () => {
  const { data } = useBooksQuery();

  if (!data || data.length === 0) {
    return <p className={styles.noFOund}>No books found</p>;
  }

  const columns = Object.keys(data[0]);

  return <CustomTable caption="Books" columns={columns} rows={data} />;
};

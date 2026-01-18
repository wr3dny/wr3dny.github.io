import styles from "./Books.module.css";
import { useBooksQuery } from "../../api/queries/useBooksQuery.ts";

type Book = {
  title: string;
  author: string;
  series: string | null;
  subSeries: string | null;
  seriesNb: number | null;
  subSeriesNb: number | null;
  format: string | null;
};

const labels: Record<keyof Book, string> = {
  title: "Title",
  author: "Author",
  series: "Series",
  subSeries: "Sub-Series",
  seriesNb: "Series #",
  subSeriesNb: "Sub-Series #",
  format: "Format",
};

export const Books = () => {
  const { data } = useBooksQuery();

  if (data?.length === 0) return <p>No books found</p>;

  console.log("data", data, labels);

  return (
    <table className={styles.all}>
      <thead>
        <tr className={styles.headRow}>ole</tr>
      </thead>
      {/*<tbody>*/}
      {/*  {data.map((book) => (*/}
      {/*    <tr key={book.title}>*/}
      {/*      {data.map((col) => (*/}
      {/*        <td key={col}>{book[col]}</td>*/}
      {/*      ))}*/}
      {/*    </tr>*/}
      {/*  ))}*/}
      {/*</tbody>*/}
    </table>
  );
};

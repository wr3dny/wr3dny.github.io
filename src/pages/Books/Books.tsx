type Book = {
  title: string;
  author: string;
  series: string;
  subSeries: string;
  seriesNb: number | null;
  subSeriesNb: number | null;
  format: string;
};

const booksList: Book[] = [
  {
    title: "Book 1",
    author: "John Doe",
    series: "One series",
    subSeries: "none",
    seriesNb: 1,
    subSeriesNb: 1,
    format: "digital",
  },
  {
    title: "Another Book 1",
    author: "Jane Doe",
    series: "",
    subSeries: "",
    seriesNb: null,
    subSeriesNb: null,
    format: "paper",
  },
];

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
  if (booksList.length === 0) return <p>No books found</p>;
  const columns = Object.keys(booksList[0]) as (keyof Book)[];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{labels[col]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {booksList.map((book) => (
          <tr key={book.title}>
            {columns.map((col) => (
              <td key={col}>{book[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

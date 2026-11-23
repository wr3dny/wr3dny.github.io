import { useMemo, useState } from "react";
import { useJson } from "../../hooks/useJson";
import { BOOK_LANGUAGES, type Book } from "../../types/collection";
import { matchesTerms } from "../../utils/search";
import styles from "./Books.module.css";

/** Short code of a language for the phone: polish -> PL (unknown ones as written). */
const languageCode = (language: string) => BOOK_LANGUAGES[language] ?? language;

/** Everything the search box looks through, including language names and codes. */
const searchValues = (book: Book) => [
  book.title,
  book.author,
  book.originalTitle,
  book.worldHero,
  book.numberInSeries,
  book.subSeries,
  book.numberInSubSeries,
  ...book.editions.flatMap((edition) => [
    edition.language,
    languageCode(edition.language),
    ...edition.formats,
  ]),
];

/** Second line under the author: original title, series and cycle. */
const describeSeries = (book: Book) =>
  [
    book.originalTitle && `Oryg.: ${book.originalTitle}`,
    book.worldHero &&
      `${book.worldHero}${book.numberInSeries ? ` #${book.numberInSeries}` : ""}`,
    !book.worldHero && book.numberInSeries && `Nr ${book.numberInSeries}`,
    book.subSeries &&
      `${book.subSeries}${book.numberInSubSeries ? ` #${book.numberInSubSeries}` : ""}`,
  ]
    .filter(Boolean)
    .join(" · ");

export const Books = () => {
  const { data, error, isLoading } = useJson<Book[]>("books.json");
  const [search, setSearch] = useState("");

  const books = useMemo(() => data ?? [], [data]);
  const matches = useMemo(
    () => books.filter((book) => matchesTerms(searchValues(book), search)),
    [books, search],
  );

  if (isLoading) {
    return (
      <p className={styles.message} role="status">
        Ładowanie książek…
      </p>
    );
  }
  if (error) {
    return (
      <p className={styles.error} role="alert">
        Nie udało się pobrać książek.
      </p>
    );
  }

  return (
    <section className={styles.wrapper} aria-labelledby="books-heading">
      <h1 id="books-heading">Książki</h1>

      {/* Stays at the top of the screen while you scroll the list. */}
      <div className={styles.search}>
        <label>
          <span className={styles.searchLabel}>
            Czy mam tę książkę? Wpisz tytuł, autora lub serię
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="np. pilipiuk kuzynki"
            enterKeyHint="search"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
        </label>
        <p className={styles.count} role="status">
          {search.trim() ? `Znaleziono ${matches.length} z ` : "Razem: "}
          {books.length} książek
        </p>
      </div>

      {matches.length ? (
        <ul className={styles.list}>
          {matches.map((book) => {
            const series = describeSeries(book);
            return (
              <li key={book.id} className={styles.item}>
                <p className={styles.title}>{book.title}</p>
                <p className={styles.author}>{book.author}</p>
                {series && <p className={styles.series}>{series}</p>}
                <ul className={styles.editions} aria-label="Wersje i formaty">
                  {book.editions.map((edition) => (
                    <li key={edition.language} className={styles.edition}>
                      <span className={styles.language} title={edition.language}>
                        {languageCode(edition.language)}
                      </span>{" "}
                      {edition.formats.join(", ")}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.empty} role="status">
          <strong>Nie masz tej książki w kolekcji.</strong>
          <p>
            Brak wyników dla „{search.trim()}”. Sprawdź pisownię albo wpisz
            samo nazwisko autora.
          </p>
        </div>
      )}
    </section>
  );
};

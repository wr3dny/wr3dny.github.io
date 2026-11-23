import { matchesTerms } from "../../utils/search";
import { useId, useMemo, useState } from "react";
import { CustomTable } from "../Table/CustomTable";
import type { TableColumn, TableRow } from "../../types/table";
import styles from "./PageWithTable.module.css";

export type OwnershipFilter = "all" | "owned" | "notOwned";

export interface GroupedTableRow {
  id: string | number;
  year: number;
  owned: boolean;
  cells: TableRow;
}

interface Props {
  columns: ReadonlyArray<TableColumn>;
  rows: ReadonlyArray<GroupedTableRow>;
}

export const PageWithTable = ({ columns, rows }: Props) => {
  const [ownership, setOwnership] = useState<OwnershipFilter>("all");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const yearHintId = useId();

  const groupedRows = useMemo(() => {
    const filteredRows = rows.filter((row) => {
      const matchesOwnership =
        ownership === "all" ||
        (ownership === "owned" ? row.owned === true : row.owned === false);
      const matchesYear = year.length !== 4 || row.year === Number(year);

      const matchesSearch = matchesTerms(Object.values(row.cells), search);
      return matchesOwnership && matchesYear && matchesSearch;
    });

    const groups = filteredRows.reduce<Map<number, GroupedTableRow[]>>(
      (groups, row) => {
        const rowsForYear = groups.get(row.year) ?? [];
        rowsForYear.push(row);
        groups.set(row.year, rowsForYear);
        return groups;
      },
      new Map(),
    );
    return Array.from(groups.entries()).sort(([left], [right]) => left - right);
  }, [ownership, rows, year, search]);

  const handleYearChange = (value: string) => {
    setYear(value.replace(/\D/g, "").slice(0, 4));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <label className={styles.field}>
          <span>Posiadanie</span>
          <select
            value={ownership}
            onChange={(event) => {
              const value = event.target.value;
              if (
                value === "all" ||
                value === "owned" ||
                value === "notOwned"
              ) {
                setOwnership(value);
              }
            }}
          >
            <option value="all">Wszystkie</option>
            <option value="owned">Posiadane</option>
            <option value="notOwned">Nieposiadane</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Rocznik</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            value={year}
            placeholder="np. 1987"
            aria-describedby={yearHintId}
            onChange={(event) => handleYearChange(event.target.value)}
          />
          <small id={yearHintId}>
            {year.length > 0 && year.length < 4 ? "Wpisz pełne 4 cyfry" : " "}
          </small>
        </label>
        <label className={styles.field}>
          <span>Szukaj modelu</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Numer, tytuł, skala…" />
        </label>
      </div>
      <p role="status">Wyświetlono {groupedRows.reduce((total, [, items]) => total + items.length, 0)} z {rows.length} modeli.</p>

      {groupedRows.length === 0 ? (
        <p className={styles.noResults}>Nie znaleziono modeli.</p>
      ) : (
        groupedRows.map(([groupYear, yearRows]) => (
          <section className={styles.yearGroup} key={groupYear}>
            <h2 className={styles.yearHeading}>{groupYear}</h2>
            <div
              className={styles.tableScroll}
              role="region"
              aria-label={`Modele z roku ${groupYear}`}
              tabIndex={0}
            >
              <CustomTable
                columns={columns}
                rows={yearRows.map((row) => row.cells)}
                rowKeys={yearRows.map((row) => row.id)}
                className={styles.modelTable}
              />
            </div>
          </section>
        ))
      )}
    </section>
  );
};

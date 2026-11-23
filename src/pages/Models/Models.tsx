import { useMemo } from "react";
import {
  PageWithTable,
  type GroupedTableRow,
} from "../../components/PageWithTable/PageWithTable";
import { useJson } from "../../hooks/useJson";
import type { PaperModel } from "../../types/collection";
import type { TableColumn } from "../../types/table";

const COLUMNS: TableColumn[] = [
  { key: "number", label: "Numer", width: "7.5rem" },
  { key: "scale", label: "Skala", width: "7.5rem" },
  { key: "title", label: "Tytuł" },
];

export const Models = () => {
  const { data, error, isLoading } = useJson<PaperModel[]>("paperModels.json");

  const rows = useMemo<GroupedTableRow[]>(
    () =>
      (data ?? []).map((model) => ({
        id: model.id,
        year: model.year,
        owned: model.owned,
        cells: {
          number: model.number,
          scale: model.scale,
          title: model.title,
        },
      })),
    [data],
  );

  if (isLoading) return <p role="status">Ładowanie modeli…</p>;
  if (error) {
    return (
      <p role="alert">Nie udało się pobrać modeli. Spróbuj odświeżyć stronę.</p>
    );
  }

  return <PageWithTable columns={COLUMNS} rows={rows} />;
};

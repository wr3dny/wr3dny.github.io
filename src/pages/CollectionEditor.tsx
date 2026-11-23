// Local editor for books.json and paperModels.json. Available only in
// `npm run dev` (see router.tsx). It edits a copy in the browser; nothing is
// saved until you export the JSON and replace the file in public/data.
import { useEffect, useMemo, useState } from "react";
import { BOOK_FORMATS, BOOK_LANGUAGES, type Edition } from "../types/collection";
import {
  COLLECTIONS,
  createRecord,
  validateRecords,
  type CollectionName,
  type CollectionRecord,
  type FieldDef,
  type RecordValue,
} from "../utils/collection";
import { matchesTerms } from "../utils/search";
import styles from "./CollectionEditor.module.css";

const MAX_LISTED = 100;

type FieldInputProps = {
  field: FieldDef;
  value: RecordValue | undefined;
  onChange: (value: RecordValue) => void;
};

/**
 * The language versions of a book. Each version has a language and the
 * formats owned in that language, e.g. polish: paperback + english: ebook.
 */
const EditionsInput = ({
  editions,
  onChange,
}: {
  editions: Edition[];
  onChange: (value: Edition[]) => void;
}) => {
  const update = (index: number, change: Partial<Edition>) =>
    onChange(
      editions.map((edition, i) => (i === index ? { ...edition, ...change } : edition)),
    );

  return (
    <div className={styles.editions}>
      <datalist id="book-languages">
        {Object.keys(BOOK_LANGUAGES).map((language) => (
          <option key={language} value={language} />
        ))}
      </datalist>
      {editions.map((edition, index) => (
        <fieldset key={index}>
          <legend>Wersja {index + 1}</legend>
          <label>
            Język (wersja {index + 1})
            <input
              list="book-languages"
              value={edition.language}
              onChange={(event) => update(index, { language: event.target.value })}
            />
          </label>
          <div className={styles.formats}>
            {BOOK_FORMATS.map((format) => (
              <label key={format} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={edition.formats.includes(format)}
                  onChange={(event) =>
                    update(index, {
                      formats: BOOK_FORMATS.filter((item) =>
                        item === format
                          ? event.target.checked
                          : edition.formats.includes(item),
                      ),
                    })
                  }
                />
                {format}
              </label>
            ))}
          </div>
          <button
            type="button"
            disabled={editions.length < 2}
            onClick={() => onChange(editions.filter((_, i) => i !== index))}
          >
            Usuń wersję {index + 1}
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...editions, { language: "", formats: ["paperback"] }])
        }
      >
        Dodaj wersję językową
      </button>
    </div>
  );
};

/** The right input for one field: editions, yes/no select, number or text. */
const FieldInput = ({ field, value, onChange }: FieldInputProps) => {
  const { key, kind, required, min } = field;

  if (kind === "editions") {
    return (
      <EditionsInput
        editions={Array.isArray(value) ? (value as Edition[]) : []}
        onChange={onChange}
      />
    );
  }

  if (kind === "boolean") {
    return (
      <label>
        {key}
        <select
          value={String(value)}
          onChange={(event) => onChange(event.target.value === "true")}
        >
          <option value="false">Nie</option>
          <option value="true">Tak</option>
        </select>
      </label>
    );
  }

  const isNumber = kind === "integer";
  return (
    <label>
      {key}
      <input
        type={isNumber ? "number" : "text"}
        min={isNumber ? min : undefined}
        readOnly={key === "id"}
        value={String(value ?? "")}
        onChange={(event) => {
          const text = event.target.value;
          if (isNumber) onChange(text === "" ? null : Number(text));
          else onChange(text === "" && !required ? null : text);
        }}
      />
    </label>
  );
};

export function CollectionEditor() {
  const [name, setName] = useState<CollectionName>("books");
  const [items, setItems] = useState<CollectionRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false); // changes not exported yet
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  const collection = COLLECTIONS[name];

  // Load the project file whenever the collection changes or "Wczytaj ponownie" is used.
  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadFailed(false);
    setItems([]);
    setSelectedId(null);

    fetch(`${import.meta.env.BASE_URL}data/${name}.json`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return (await response.json()) as unknown;
      })
      .then((data) => {
        const problems = validateRecords(data, name);
        if (problems.length) throw new Error(problems.slice(0, 5).join(" "));
        if (!active) return;
        setItems(data as CollectionRecord[]);
        setDirty(false);
        setMessage("Wczytano dane projektu.");
      })
      .catch((error: unknown) => {
        if (!active) return;
        setLoadFailed(true);
        setMessage(`Błąd odczytu: ${String(error)}`);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [name, reloadCount]);

  // The browser asks before closing or refreshing the tab with unexported changes.
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const problems = useMemo(() => validateRecords(items, name), [items, name]);
  const listed = useMemo(
    () =>
      items
        .filter((item) =>
          matchesTerms([item.title, item.author, item.number, item.year, item.id], filter),
        )
        .slice(0, MAX_LISTED),
    [items, filter],
  );
  const selected = items.find((item) => item.id === selectedId);

  function switchCollection(next: CollectionName) {
    if (next === name) return;
    if (dirty && !window.confirm("Niezapisane zmiany zostaną utracone. Kontynuować?")) return;
    setName(next);
    setFilter("");
    setMessage("");
  }

  function editField(key: string, value: RecordValue) {
    setItems((current) =>
      current.map((item) => (item.id === selectedId ? { ...item, [key]: value } : item)),
    );
    setDirty(true);
  }

  function addRecord() {
    const record = createRecord(name, items);
    setItems((current) => [...current, record]);
    setSelectedId(record.id);
    setDirty(true);
    setMessage("Nowy rekord: uzupełnij wymagane pola, następnie wyeksportuj JSON.");
  }

  function removeRecord() {
    if (!selected || !window.confirm(`Usunąć rekord #${selected.id}: ${selected.title}?`)) return;
    setItems((current) => current.filter((item) => item.id !== selected.id));
    setSelectedId(null);
    setDirty(true);
  }

  async function importJson(file: File | undefined) {
    if (!file || loading) return;
    if (dirty && !window.confirm("Import zastąpi bieżącą listę wraz z niezapisanymi zmianami. Kontynuować?")) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const found = validateRecords(parsed, name);
      if (found.length) {
        setMessage(`Import odrzucony: ${found.slice(0, 8).join(" ")}`);
        return;
      }
      const records = parsed as CollectionRecord[];
      setLoadFailed(false);
      setItems(records);
      setSelectedId(null);
      setDirty(true);
      setMessage(`Zaimportowano ${records.length} rekordów. Wyeksportuj plik, aby zachować zmiany.`);
    } catch (error) {
      setMessage(`Błąd importu: ${String(error)}`);
    }
  }

  function exportJson() {
    if (problems.length || !items.length) return;
    const blob = new Blob([JSON.stringify(items, null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDirty(false);
    setMessage(`Wyeksportowano ${name}.json. Podmień plik w public/data/ i zatwierdź zmianę w Git.`);
  }

  function reload() {
    if (dirty && !window.confirm("Odrzucić zmiany i wczytać oryginał?")) return;
    setReloadCount((count) => count + 1);
  }

  return (
    <section className={styles.page}>
      <h1>Lokalny edytor kolekcji</h1>
      <p>
        Edytor działa tylko przez <code>npm run dev</code>. Nic nie zapisuje na serwerze. Po
        zmianach pobierz JSON i podmień go w <code>public/data/</code>.
      </p>

      <div className={styles.toolbar}>
        <label>
          Kolekcja
          <select
            disabled={loading}
            value={name}
            onChange={(event) => switchCollection(event.target.value as CollectionName)}
          >
            <option value="books">{COLLECTIONS.books.label}</option>
            <option value="paperModels">{COLLECTIONS.paperModels.label}</option>
          </select>
        </label>
        <button type="button" onClick={addRecord} disabled={loading || loadFailed}>
          Dodaj rekord
        </button>
        <label className={styles.import}>
          Import JSON
          <input
            type="file"
            disabled={loading}
            accept=".json,application/json"
            onChange={(event) => {
              void importJson(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </label>
        <button
          type="button"
          disabled={loading || problems.length > 0 || !items.length}
          onClick={exportJson}
        >
          Eksportuj {name}.json
        </button>
        <button type="button" disabled={loading} onClick={reload}>
          Wczytaj ponownie
        </button>
      </div>

      <p role="status">
        {message} {dirty ? "• Zmiany jeszcze nie zostały wyeksportowane." : ""}
      </p>
      <p>
        {collection.label}: {items.length} rekordów.{" "}
        {problems.length
          ? `${problems.length} problemów z walidacją (eksport zablokowany).`
          : "Dane poprawne."}
      </p>
      {problems.length > 0 && (
        <div className={styles.errors} role="alert">
          <strong>Błędy:</strong>
          <ul>
            {problems.slice(0, 12).map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.layout}>
        <aside className={styles.list}>
          <label>
            Szukaj rekordu
            <input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Tytuł, autor, ID..."
            />
          </label>
          <p>Wyświetlono pierwsze {listed.length} pasujących rekordów.</p>
          {listed.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selectedId ? styles.active : ""}
              onClick={() => setSelectedId(item.id)}
            >
              #{item.id} — {String(item.title ?? "") || "(nowy rekord)"}
            </button>
          ))}
        </aside>

        <section className={styles.edit} aria-label="Edycja rekordu">
          {!selected ? (
            <p>Wybierz rekord z listy albo kliknij „Dodaj rekord”.</p>
          ) : (
            <>
              <h2>Edycja rekordu #{selected.id}</h2>
              {collection.fields.map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={selected[field.key]}
                  onChange={(value) => editField(field.key, value)}
                />
              ))}
              <button type="button" className={styles.remove} onClick={removeRecord}>
                Usuń ten rekord
              </button>
            </>
          )}
        </section>
      </div>
    </section>
  );
}

// Field definitions and validation for the local collection editor.
// To add a field to a collection, add one line to COLLECTIONS below and the
// field to the matching type in src/types/collection.ts.
import { BOOK_FORMATS, type Edition } from "../types/collection";
import { normalizeSearch } from "./search";

export type CollectionName = "books" | "paperModels";
export type RecordValue =
  | string
  | number
  | boolean
  | null
  | Edition[];
export type CollectionRecord = Record<string, RecordValue> & { id: number };

type FieldKind = "text" | "integer" | "boolean" | "editions";

export interface FieldDef {
  key: string;
  kind: FieldKind;
  /** Required fields cannot be null or empty. */
  required?: boolean;
  /** Smallest allowed value of an integer field. */
  min?: number;
  /** Value of the field in a newly added record (default: empty / null). */
  initial?: RecordValue;
}

const id: FieldDef = { key: "id", kind: "integer", required: true, min: 1 };

export const COLLECTIONS: Record<
  CollectionName,
  { label: string; fields: readonly FieldDef[] }
> = {
  books: {
    label: "Książki",
    fields: [
      id,
      { key: "title", kind: "text", required: true, initial: "" },
      { key: "author", kind: "text", required: true, initial: "" },
      { key: "originalTitle", kind: "text" },
      { key: "worldHero", kind: "text" },
      { key: "numberInSeries", kind: "integer", min: 0 },
      { key: "subSeries", kind: "text" },
      { key: "numberInSubSeries", kind: "integer", min: 0 },
      {
        key: "editions",
        kind: "editions",
        required: true,
        initial: [{ language: "polish", formats: ["paperback"] }],
      },
    ],
  },
  paperModels: {
    label: "Modele kartonowe",
    fields: [
      id,
      {
        key: "year",
        kind: "integer",
        required: true,
        min: 1,
        initial: new Date().getFullYear(),
      },
      { key: "number", kind: "text", required: true, initial: "" },
      { key: "title", kind: "text", required: true, initial: "" },
      { key: "scale", kind: "text" },
      { key: "owned", kind: "boolean", required: true, initial: false },
    ],
  },
};

/** A blank record for "Dodaj rekord", with the next free ID. */
export function createRecord(
  name: CollectionName,
  records: readonly CollectionRecord[],
): CollectionRecord {
  const record: CollectionRecord = {
    id: Math.max(0, ...records.map((item) => item.id)) + 1,
  };
  for (const field of COLLECTIONS[name].fields) {
    if (field.key === "id") continue;
    const initial = field.initial ?? null;
    // Copy, so new records never share the same list.
    record[field.key] = JSON.parse(JSON.stringify(initial)) as RecordValue;
  }
  return record;
}

/** Checks the language versions of a book: each has a language and formats. */
function checkEditions(key: string, value: unknown): string | null {
  if (!Array.isArray(value) || value.length === 0) {
    return `${key}: dodaj co najmniej jedną wersję językową.`;
  }
  const languages = new Set<string>();
  for (const edition of value as Array<Record<string, unknown> | null>) {
    if (!edition || typeof edition !== "object") {
      return `${key}: wersja językowa musi być obiektem.`;
    }
    const language = typeof edition.language === "string" ? edition.language.trim() : "";
    if (!language) return `${key}: wpisz język każdej wersji.`;
    if (languages.has(normalizeSearch(language))) {
      return `${key}: język ${language} występuje więcej niż raz — połącz formaty w jednej wersji.`;
    }
    languages.add(normalizeSearch(language));

    const formats = edition.formats;
    if (!Array.isArray(formats) || formats.length === 0) {
      return `${key}: wersja ${language} wymaga co najmniej jednego formatu (${BOOK_FORMATS.join(", ")}).`;
    }
    const badFormat = formats.find(
      (format) => !(BOOK_FORMATS as readonly unknown[]).includes(format),
    );
    if (badFormat !== undefined) {
      return `${key}: nieznany format ${String(badFormat)} (${language}).`;
    }
    if (new Set(formats).size !== formats.length) {
      return `${key}: format wpisano więcej niż raz (${language}).`;
    }
  }
  return null;
}

/** Returns an error message for one field value, or null when it is valid. */
function checkField(field: FieldDef, value: unknown): string | null {
  const { key, kind, required, min = 0 } = field;

  if (value === undefined) return `brak klucza ${key}.`;
  if (value === null) return required ? `${key} nie może być null.` : null;

  switch (kind) {
    case "text":
      if (typeof value !== "string") return `${key} musi być tekstem.`;
      return required && !value.trim() ? `${key} nie może być puste.` : null;
    case "integer":
      return Number.isSafeInteger(value) && (value as number) >= min
        ? null
        : `${key} musi być liczbą całkowitą (min. ${min}).`;
    case "boolean":
      return typeof value === "boolean"
        ? null
        : `${key} musi mieć wartość true/false.`;
    case "editions":
      return checkEditions(key, value);
  }
}

/** The same book = the same title and author (languages go into `editions`). */
const bookKey = (entry: Record<string, unknown>): string | null => {
  const title = normalizeSearch(entry.title);
  const author = normalizeSearch(entry.author);
  if (!title || !author) return null;
  return `${title}|${author}`;
};

/** Returns a list of problems found in the collection (empty = valid). */
export function validateRecords(input: unknown, name: CollectionName): string[] {
  if (!Array.isArray(input)) return ["Plik musi zawierać tablicę rekordów JSON."];

  const errors: string[] = [];
  const idsSeen = new Set<number>();
  const booksSeen = new Map<string, number>();

  input.forEach((item: unknown, index) => {
    const where = `Rekord ${index + 1}`;
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(`${where}: nie jest obiektem.`);
      return;
    }
    const entry = item as Record<string, unknown>;

    for (const field of COLLECTIONS[name].fields) {
      const problem = checkField(field, entry[field.key]);
      if (problem) errors.push(`${where}: ${problem}`);
    }

    if (Number.isSafeInteger(entry.id)) {
      const entryId = entry.id as number;
      if (idsSeen.has(entryId)) errors.push(`${where}: powtórzone ID ${entryId}.`);
      idsSeen.add(entryId);
    }

    // One book = one record. Another language or format goes into `editions`.
    if (name === "books") {
      const key = bookKey(entry);
      const firstIndex = key === null ? undefined : booksSeen.get(key);
      if (key !== null && firstIndex !== undefined) {
        errors.push(
          `${where}: książka „${String(entry.title)}” już istnieje jako rekord ${firstIndex}. Dodaj język lub format w jednym rekordzie (pole editions).`,
        );
      } else if (key !== null) {
        booksSeen.set(key, index + 1);
      }
    }
  });

  return errors;
}

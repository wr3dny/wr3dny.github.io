// Shapes of the records stored in public/data/*.json.

/** Every format a book can exist in. */
export const BOOK_FORMATS = ["paperback", "ebook", "audiobook"] as const;
export type BookFormat = (typeof BOOK_FORMATS)[number];

/**
 * Languages offered as suggestions in the editor, with the short code shown
 * on the phone. Any other language can still be typed; it is shown as written.
 */
export const BOOK_LANGUAGES: Record<string, string> = {
  polish: "PL",
  english: "EN",
  german: "DE",
};

/** One language version of a book and the formats you own it in. */
export type Edition = {
  language: string;
  formats: BookFormat[];
};

/** One title = one record. Different languages are listed in `editions`. */
export type Book = {
  id: number;
  title: string;
  author: string;
  originalTitle: string | null;
  worldHero: string | null;
  numberInSeries: number | null;
  subSeries: string | null;
  numberInSubSeries: number | null;
  editions: Edition[];
};

export type PaperModel = {
  id: number;
  year: number;
  number: string;
  title: string;
  scale: string | null;
  owned: boolean;
};

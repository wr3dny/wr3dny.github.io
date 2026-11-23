/** Normalize Polish text, punctuation, and case for collection search. */
export const normalizeSearch = (value: unknown): string =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "l")
    .toLocaleLowerCase("pl")
    .replace(/\s+/g, " ")
    .trim();

/** All search terms must match, possibly across different columns. */
export const matchesTerms = (values: readonly unknown[], query: string): boolean => {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const haystack = values.map(normalizeSearch).join(" ");
  return terms.every((term) => haystack.includes(term));
};

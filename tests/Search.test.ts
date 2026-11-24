import { describe, expect, it } from "vitest";
import { normalizeSearch, matchesTerms } from "../src/utils/search";

describe("collection search", () => {
  it("handles Polish diacritics including ł", () => {
    expect(normalizeSearch("Łódź Żółw")).toBe("lodz zolw");
  });
  it("matches words across fields in any order", () => {
    expect(matchesTerms(["Andrzej Pilipiuk", "Kuzynki"], "kuzynki pilipiuk")).toBe(true);
  });
  it("rejects missing terms", () => {
    expect(matchesTerms(["Wiedźmin"], "wiedzmin 5")).toBe(false);
  });
});

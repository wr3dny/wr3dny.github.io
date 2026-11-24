// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Books } from "../src/pages/Books/Books";
import { Lego } from "../src/pages/Lego/Lego";
import { Models } from "../src/pages/Models/Models";
import { Wasgij } from "../src/pages/Wasgij/Wasgij";
import { stubJson } from "./stubJson";

const models = [
  { id: 1, year: 2000, number: "4a", scale: null, title: "First", owned: true },
  { id: 2, year: 1958, number: "2", scale: "1:33", title: "Older", owned: false },
  { id: 3, year: 2000, number: "4", scale: "1:50", title: "Second", owned: false },
];

const book = (id: number, title: string, author: string, editions: unknown[]) => ({
  id,
  title,
  author,
  originalTitle: null,
  worldHero: null,
  numberInSeries: null,
  subSeries: null,
  numberInSubSeries: null,
  editions,
});

const books = [
  {
    ...book(1, "Regression book", "Anna Autor", [
      { language: "polish", formats: ["paperback", "ebook"] },
      { language: "english", formats: ["audiobook"] },
    ]),
    worldHero: "Świat testowy",
    numberInSeries: 3,
  },
  book(2, "Audio only", "Jan Lektor", [
    { language: "german", formats: ["audiobook"] },
  ]),
];

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Models page", () => {
  it("orders years and columns and keeps the source order inside a year", async () => {
    stubJson({ "paperModels.json": models });
    render(<Models />);

    const tables = await screen.findAllByRole("table");
    expect(screen.getAllByRole("heading").map((h) => h.textContent)).toEqual([
      "1958",
      "2000",
    ]);
    for (const table of tables) {
      expect(
        within(table)
          .getAllByRole("columnheader")
          .map((h) => h.textContent),
      ).toEqual(["Numer", "Skala", "Tytuł"]);
    }

    const rows = within(tables[1]).getAllByRole("row").slice(1);
    expect(
      rows.map((row) => within(row).getAllByRole("cell")[0].textContent),
    ).toEqual(["4a", "4"]);
    expect(within(rows[0]).getAllByRole("cell")[1].textContent).toBe("");
  });

  it("combines ownership with a complete year and sanitizes the year input", async () => {
    stubJson({ "paperModels.json": models });
    const user = userEvent.setup();
    render(<Models />);

    const owned = await screen.findByRole("combobox", { name: "Posiadanie" });
    const year = screen.getByRole("textbox", { name: "Rocznik" });

    await user.selectOptions(owned, "owned");
    expect(screen.queryByText("Older")).toBeNull();
    expect(screen.queryByText("Second")).toBeNull();

    await user.selectOptions(owned, "notOwned");
    expect(screen.queryByText("First")).toBeNull();

    await user.type(year, "200"); // fewer than 4 digits: no year filter yet
    expect(screen.queryByText("Older")).not.toBeNull();
    await user.type(year, "0");
    expect(screen.queryByText("Older")).toBeNull();
    expect(screen.queryByText("Second")).not.toBeNull();

    await user.clear(year);
    await user.type(year, "ab1958x9");
    expect((year as HTMLInputElement).value).toBe("1958");
    expect(screen.queryByText("Older")).not.toBeNull();

    await user.selectOptions(owned, "owned");
    expect(screen.queryByText("Nie znaleziono modeli.")).not.toBeNull();
  });

  it("shows loading first, then an error when the file cannot be read", async () => {
    stubJson({}); // every request answers 404
    render(<Models />);
    expect(screen.getByRole("status").textContent).toContain("Ładowanie");
    expect((await screen.findByRole("alert")).textContent).toContain("Nie udało");
  });
});

describe("Books page", () => {
  it("shows one entry per book with every language and format", async () => {
    stubJson({ "books.json": books });
    render(<Books />);

    expect(await screen.findByText("Regression book")).toBeTruthy();
    expect(screen.getByText("Anna Autor")).toBeTruthy();
    expect(screen.getByText("Świat testowy #3")).toBeTruthy();

    const first = screen.getAllByRole("listitem")[0];
    const chips = within(within(first).getByRole("list")).getAllByRole("listitem");
    expect(chips.map((chip) => chip.textContent)).toEqual([
      "PL paperback, ebook",
      "EN audiobook",
    ]);
  });

  it("finds a book by language code, language name or format", async () => {
    stubJson({ "books.json": books });
    const user = userEvent.setup();
    render(<Books />);
    const box = await screen.findByRole("searchbox");

    await user.type(box, "en audiobook"); // English audiobook: only book 1
    expect(screen.queryByText("Regression book")).not.toBeNull();
    expect(screen.queryByText("Audio only")).toBeNull();

    await user.clear(box);
    await user.type(box, "german");
    expect(screen.queryByText("Regression book")).toBeNull();
    expect(screen.queryByText("Audio only")).not.toBeNull();
  });

  it("answers clearly when a title is not in the collection", async () => {
    stubJson({ "books.json": books });
    const user = userEvent.setup();
    render(<Books />);

    await user.type(await screen.findByRole("searchbox"), "nieistniejaca");
    expect(screen.getByText(/Nie masz tej książki/)).toBeTruthy();
  });

  it("reports a failed download", async () => {
    stubJson({});
    render(<Books />);
    expect((await screen.findByRole("alert")).textContent).toContain("książek");
  });
});

describe("static pages", () => {
  it("renders the LEGO wishlist links", () => {
    render(<Lego />);
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("marks Wasgij as under construction and shows the graphic", () => {
    render(<Wasgij />);
    expect(screen.getByRole("heading", { name: "Wasgij" })).toBeTruthy();
    expect(screen.getByText(/Under construction/)).toBeTruthy();
    expect(screen.getByRole("img", { name: /Układanka/ })).toBeTruthy();
  });
});

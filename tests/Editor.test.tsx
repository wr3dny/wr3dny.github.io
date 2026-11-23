// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readFileSync } from "node:fs";
import { CollectionEditor } from "../src/pages/CollectionEditor";
import { validateRecords } from "../src/utils/collection";
import { stubJson } from "./stubJson";

const books = JSON.parse(readFileSync("public/data/books.json", "utf8"));
const models = JSON.parse(readFileSync("public/data/paperModels.json", "utf8"));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("collection validation", () => {
  it("accepts the shipped data files", () => {
    expect(books.length).toBeGreaterThan(0);
    expect(models.length).toBeGreaterThan(0);
    expect(validateRecords(books, "books")).toEqual([]);
    expect(validateRecords(models, "paperModels")).toEqual([]);
  });

  it("rejects duplicate IDs, bad types and a non-array file", () => {
    expect(validateRecords([books[0], books[0]], "books").join()).toContain(
      "powtórzone ID",
    );
    expect(
      validateRecords([{ ...models[0], owned: "false" }], "paperModels").join(),
    ).toContain("true/false");
    expect(validateRecords([{ ...books[0], author: null }], "books")).not.toEqual([]);
    expect(validateRecords({}, "books")).not.toEqual([]);
  });

  it("requires every language version to have a language and a known format", () => {
    const withEditions = (editions: unknown) =>
      validateRecords([{ ...books[0], editions }], "books");
    const polish = { language: "polish", formats: ["paperback", "ebook"] };

    expect(withEditions([polish, { language: "english", formats: ["audiobook"] }])).toEqual([]);
    expect(withEditions([])).not.toEqual([]);
    expect(withEditions([{ language: " ", formats: ["ebook"] }]).join()).toContain("język");
    expect(withEditions([{ language: "polish", formats: [] }]).join()).toContain("co najmniej jednego formatu");
    expect(withEditions([{ language: "polish", formats: ["vinyl"] }]).join()).toContain("nieznany format");
    expect(withEditions([{ language: "polish", formats: ["ebook", "ebook"] }]).join()).toContain("więcej niż raz");
    expect(withEditions([polish, { ...polish, formats: ["ebook"] }]).join()).toContain("połącz formaty");
  });

  it("allows one record per book: the same title and author is a duplicate", () => {
    const copy = {
      ...books[0],
      id: 9999,
      editions: [{ language: "english", formats: ["ebook"] }],
    };
    expect(validateRecords([books[0], copy], "books").join()).toContain("już istnieje");
  });
});

describe("collection editor", () => {
  it("edits and exports, keeps the ID read-only and blocks an incomplete new book", async () => {
    stubJson({ "books.json": books });
    const createObjectURL = vi.fn().mockReturnValue("blob:test");
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<CollectionEditor />);

    await screen.findByText(/Wczytano dane projektu/);
    await user.click(screen.getByRole("button", { name: /#1 —/ }));
    expect((screen.getByLabelText("id") as HTMLInputElement).readOnly).toBe(true);

    fireEvent.change(screen.getByLabelText("title"), {
      target: { value: "Poprawiony tytuł" },
    });
    await user.click(screen.getByRole("button", { name: "Eksportuj books.json" }));
    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(createObjectURL.mock.calls[0][0]).toBeInstanceOf(Blob);

    await user.click(screen.getByRole("button", { name: "Dodaj rekord" }));
    const exportButton = screen.getByRole("button", { name: "Eksportuj books.json" });
    expect((exportButton as HTMLButtonElement).disabled).toBe(true);
    const nextId = Math.max(...books.map((book: { id: number }) => book.id)) + 1;
    expect((screen.getByLabelText("id") as HTMLInputElement).value).toBe(String(nextId));
  });

  it("adds a language version and a format, and refuses an empty version", async () => {
    stubJson({ "books.json": books });
    const user = userEvent.setup();
    render(<CollectionEditor />);

    await screen.findByText(/Wczytano dane projektu/);
    await user.click(screen.getByRole("button", { name: /#1 —/ }));
    const first = within(screen.getByRole("group", { name: "Wersja 1" }));
    const ebook = first.getByRole("checkbox", { name: "ebook" }) as HTMLInputElement;
    expect(ebook.checked).toBe(false);
    await user.click(ebook);
    expect(ebook.checked).toBe(true);

    // Add an English version: it is invalid until a language is typed.
    await user.click(screen.getByRole("button", { name: "Dodaj wersję językową" }));
    expect(screen.getByRole("alert").textContent).toContain("język");
    const exportButton = screen.getByRole("button", { name: "Eksportuj books.json" });
    expect((exportButton as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(screen.getByLabelText("Język (wersja 2)"), {
      target: { value: "english" },
    });
    expect(screen.queryByRole("alert")).toBeNull();
    expect((exportButton as HTMLButtonElement).disabled).toBe(false);

    // The last remaining version cannot be removed.
    await user.click(screen.getByRole("button", { name: "Usuń wersję 2" }));
    expect(
      (screen.getByRole("button", { name: "Usuń wersję 1" }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it("prevents accidental replacement after a failed load", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<CollectionEditor />);

    await screen.findByText(/Błąd odczytu/);
    const add = screen.getByRole("button", { name: "Dodaj rekord" });
    const exportButton = screen.getByRole("button", { name: "Eksportuj books.json" });
    expect((add as HTMLButtonElement).disabled).toBe(true);
    expect((exportButton as HTMLButtonElement).disabled).toBe(true);
  });
});

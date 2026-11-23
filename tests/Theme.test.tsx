// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSelector } from "../src/components/ThemeSelector/ThemeSelector";
import { PageWithTable } from "../src/components/PageWithTable/PageWithTable";

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Theme selection", () => {
  it("offers exactly the two accepted themes and persists a manual selection", async () => {
    const user = userEvent.setup();
    const view = render(<ThemeSelector />);
    const selector = screen.getByRole("combobox", { name: "Motyw strony" });
    expect(
      screen.getAllByRole("option").map((option) => option.textContent),
    ).toEqual(["Latte (jasny)", "Espresso (ciemny)"]);
    expect(document.documentElement.dataset.theme).toBe("latte");
    for (const value of ["espresso", "latte", "espresso"]) {
      await user.selectOptions(selector, value);
      expect(document.documentElement.dataset.theme).toBe(value);
      expect(localStorage.getItem("theme")).toBe(value);
    }
    view.unmount();
    render(<ThemeSelector />);
    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
      "espresso",
    );
    expect(document.documentElement.dataset.theme).toBe("espresso");
  });

  it.each([
    ["latte", "latte"],
    ["espresso", "espresso"],
    ["day", "latte"],
    ["night", "espresso"],
    ["cyberpunk", "espresso"],
  ])("keeps or migrates stored %s to %s", (storedTheme, expectedTheme) => {
    localStorage.setItem("theme", storedTheme);
    render(<ThemeSelector />);
    expect(document.documentElement.dataset.theme).toBe(expectedTheme);
  });

  it("falls back to latte for an invalid stored value", () => {
    localStorage.setItem("theme", "diablo");
    render(<ThemeSelector />);
    expect(document.documentElement.dataset.theme).toBe("latte");
  });

  it("still switches when the browser refuses storage access", async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    render(<ThemeSelector />);
    await user.selectOptions(screen.getByRole("combobox"), "espresso");
    expect(document.documentElement.dataset.theme).toBe("espresso");
  });

  it("preserves table filters and results while changing the theme", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ThemeSelector />
        <PageWithTable
          columns={[{ key: "title", label: "Tytuł" }]}
          rows={[
            { id: 1, year: 1958, owned: true, cells: { title: "Zlin" } },
            { id: 2, year: 1958, owned: false, cells: { title: "Orzeł" } },
            { id: 3, year: 1959, owned: true, cells: { title: "P-70" } },
          ]}
        />
      </>,
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Posiadanie" }),
      "owned",
    );
    await user.type(screen.getByRole("textbox", { name: "Rocznik" }), "1958");
    for (const theme of ["espresso", "latte"]) {
      await user.selectOptions(
        screen.getByRole("combobox", { name: "Motyw strony" }),
        theme,
      );
      expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
        "1958",
      );
      expect(
        (
          screen.getByRole("combobox", {
            name: "Posiadanie",
          }) as HTMLSelectElement
        ).value,
      ).toBe("owned");
      expect(screen.getByText("Zlin")).toBeTruthy();
      expect(screen.queryByText("Orzeł")).toBeNull();
      expect(screen.queryByText("P-70")).toBeNull();
    }
  });
});

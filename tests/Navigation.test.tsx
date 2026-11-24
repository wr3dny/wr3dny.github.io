// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../src/components/Navbar/Navbar";

afterEach(cleanup);

describe("Navigation", () => {
  it("lists the pages, marks the active one and closes the mobile menu with Escape", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/models"]}>
        <Navbar />
      </MemoryRouter>,
    );

    const links = screen
      .getAllByRole("link")
      .map((link) => link.textContent)
      .filter(Boolean);
    expect(links).toEqual(["Books", "LEGO", "Models", "Wasgij"]);
    expect(
      screen.getByRole("link", { name: "Models" }).getAttribute("aria-current"),
    ).toBe("page");

    const menuButton = screen.getByRole("button", { name: "Otwórz menu" });
    await user.click(menuButton);
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    await user.keyboard("{Escape}");
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
  });
});

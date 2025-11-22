import { MemoryRouter } from "react-router-dom";
import { NavButton } from "./NavButton.tsx";

export const Basic = () => (
  <MemoryRouter initialEntries={["/"]}>
    <NavButton label="Home" to={"/"} key="one" disabled={false} />
  </MemoryRouter>
);

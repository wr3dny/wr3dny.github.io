import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Basic = () => (
    <MemoryRouter initialEntries={["/"]}>
        <Navbar />
    </MemoryRouter>
);
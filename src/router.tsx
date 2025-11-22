import { Route, Routes } from "react-router-dom";
import { PATHS } from "./const/paths";

import { Lego } from "./pages/Lego/Lego";
import { Home } from "./pages/Home/Home";
import { Gallery } from "./pages/Gallery/Gallery";
import { Books } from "./pages/Books/Books.tsx";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.GALLERY} element={<Gallery />} />
      <Route path={PATHS.BOOKS} element={<Books />} />
      <Route path={PATHS.LEGO} element={<Lego />} />
    </Routes>
  );
};

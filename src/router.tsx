import { Route, Routes } from "react-router-dom";
import { PATHS, SUBPATHS } from "./const/paths";

import { Lego } from "./pages/Lego/Lego";
import { Home } from "./pages/Home/Home";
import { Gallery } from "./pages/Gallery/Gallery";
import { Books } from "./pages/Books/Books.tsx";
import { Wasgij } from "./pages/Wasgij/Wasgij.tsx";
import { MMModels } from "./pages/MMModels/MMModels.tsx";
import { Coins } from "./pages/Coins/Coins.tsx";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={PATHS.GALLERY} element={<Gallery />} />
      <Route path={PATHS.BOOKS} element={<Books />} />
      <Route path={SUBPATHS.LEGO} element={<Lego />} />
      <Route path={SUBPATHS.WASGIJ} element={<Wasgij />} />
      <Route path={SUBPATHS.COINS} element={<Coins />} />
      <Route path={SUBPATHS.MMMODELS} element={<MMModels />} />
    </Routes>
  );
};

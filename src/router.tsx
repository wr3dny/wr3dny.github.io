import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./const/paths";

import { Books } from "./pages/Books/Books";
import { CollectionEditor } from "./pages/CollectionEditor";
import { Home } from "./pages/Home/Home";
import { Lego } from "./pages/Lego/Lego";
import { Models } from "./pages/Models/Models";
import { Wasgij } from "./pages/Wasgij/Wasgij";

export const RouterConfig = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path={PATHS.BOOKS} element={<Books />} />
    <Route path={PATHS.LEGO} element={<Lego />} />
    <Route path={PATHS.MODELS} element={<Models />} />
    <Route path={PATHS.WASGIJ} element={<Wasgij />} />
    {/* The editor exists only in `npm run dev`, never in the public build. */}
    {import.meta.env.DEV && (
      <Route path="/editor" element={<CollectionEditor />} />
    )}
    <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
  </Routes>
);

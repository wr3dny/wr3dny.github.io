import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { readStoredTheme } from "./const/themes";

// Apply the saved palette before React renders the application.
document.documentElement.dataset.theme = readStoredTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

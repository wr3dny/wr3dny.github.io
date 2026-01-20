import { Navbar } from "./components/Navbar/Navbar.tsx";
import { HashRouter } from "react-router-dom";
import { RouterConfig } from "./router.tsx";
import { Footer } from "./components/Footer/Footer.tsx";

export const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <RouterConfig />
      <Footer />
    </HashRouter>
  );
};

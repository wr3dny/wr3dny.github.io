import { Navbar } from "./components/Navbar/Navbar.tsx";
import { HashRouter } from "react-router-dom";
import { RouterConfig } from "./router.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import styles from "./App.module.css";

export const App = () => {
  return (
    <HashRouter>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <RouterConfig />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

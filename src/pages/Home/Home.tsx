import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <section className={styles.page} aria-labelledby="home-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Prywatne archiwum kolekcji</p>
        <h1 id="home-heading">Collectorium</h1>
        <p>
          Książki, modele i wishlista LEGO — uporządkowane spokojnie,
          czytelnie i po swojemu.
        </p>
        <p className={styles.note}>Najlepiej działa przy kawie.</p>
        {import.meta.env.DEV && (
          <p>
            <Link to="/editor">Otwórz lokalny edytor kolekcji</Link>
          </p>
        )}
      </div>
      <p className={styles.apiStatus} role="status">
        Dane kolekcji są częścią tej strony — bez zewnętrznego API.
      </p>
    </section>
  );
};

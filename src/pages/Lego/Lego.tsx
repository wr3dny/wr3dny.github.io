import { LegoWishlist, type LegoSet } from "../../const/lego";
import styles from "./Lego.module.css";

const sortedWishlist = [...LegoWishlist].sort(
  (left, right) => left.price - right.price,
);

const getLabel = (item: LegoSet) =>
  `${item.series} ${item.setNumber}, ${item.year} — ${item.price} zł`;

export const Lego = () => {
  return (
    <section className={styles.page} aria-labelledby="lego-heading">
      <h1 id="lego-heading">LEGO — lista życzeń</h1>
      <p>Wybrane zestawy, które chcę mieć. Ceny są orientacyjne, a odnośniki prowadzą do zewnętrznego serwisu.</p>
      <div className={styles.grid}>
        {sortedWishlist.map((item) => (
          <a
            key={item.setNumber}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label={`${getLabel(item)} — otwórz w nowej karcie`}
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
            <span>{getLabel(item)}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

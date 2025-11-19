import { LegoWishlist } from "../../const/lego.ts";
import styles from "./Lego.module.css";

interface Lego {
  setNumber: number;
  url: string;
  image: string;
  alt: string;
}

export const Lego = () => {
  const sortedList = [...LegoWishlist].sort((a, b) => a.price - b.price);

  return (
    <div className={styles.page}>
      <h4>Lista życzeń</h4>
      <div className={styles.item}>
        {sortedList.map((item: Lego) => (
          <a
            key={item.setNumber}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.mask}>
              <img src={item.image} alt={item.alt} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

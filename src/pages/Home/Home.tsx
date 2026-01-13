import styles from "./Home.module.css";
import { health } from "../../api/health.ts";
import { useEffect, useState } from "react";

const homeTxt = [
  "Draft of draft of page one day to be",
  "At the moment it's purpose was only to serve wishlist",
  "Next in progress is connecting to some api to grab needed data",
  "But first need to finish creating mentioned api",
];

export const Home = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const result = await health();
        setStatus(result);
      } catch {
        setError(true);
      }
    };
    fetchHealth();
  }, [status]);

  return (
    <div className={styles.home}>
      <div>
        {homeTxt.map((item, index) => (
          <p className={styles.par} key={index}>
            {item}
          </p>
        ))}
      </div>
      <p className={styles.status}>
        Status:{" "}
        {error
          ? "Unavailable"
          : status === null
            ? "Loading"
            : status === 200
              ? "OK"
              : status}
      </p>
    </div>
  );
};

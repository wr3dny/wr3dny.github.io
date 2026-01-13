import styles from "./Home.module.css";

const homeTxt = [
  "Draft of draft of page one day to be",
  "At the moment it's purpose was only to serve wishlist",
  "Next in progress is connecting to some api to grab needed data",
  "But first need to finish creating mentioned api",
];

export const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        {homeTxt.map((item, index) => (
          <p className={styles.par} key={index}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

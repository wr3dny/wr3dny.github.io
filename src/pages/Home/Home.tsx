import styles from "./Home.module.css";

const homeTxt = [
  "Draft of draft of page one day to be",
  "Only purpose is ( at the moment ) wishlist",
  "Next will probably be something around books",
  "Later maybe gallery",
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

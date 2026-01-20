import { useHealthQuery } from "../../api/queries/useHealthQuery.ts";

import styles from "./Home.module.css";

const homeTxt = [
  "This page suppose to be polished few years ago",
  "But lack of time and tons of ideas got me nowhere",
  "So, as new year started I started (re)building this page",
  "With some kind of 'plan' ( big word ) ",
  "First let it work, then let it look",
];

export const Home = () => {
  const health = useHealthQuery();

  const statusClass = health.isLoading
    ? styles.loading
    : health.isError
      ? styles.error
      : styles.ok;

  return (
    <>
      <div className={styles.permanent}>
        <div className={styles.left}>Welcome traveler to my homePage</div>
        <div>I think you might have gotten lost...</div>
      </div>
      <div className={styles.home}>
        <p className={statusClass}>
          {" "}
          {health.isLoading
            ? "<insert loading banner>"
            : health.isError
              ? health.error.message
              : `API says:${health.data?.status}`}
        </p>

        {health.data &&
          homeTxt.map((item, index) => (
            <p className={styles.par} key={index}>
              {item}
            </p>
          ))}
      </div>
    </>
  );
};

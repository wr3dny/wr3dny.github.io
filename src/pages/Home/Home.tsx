import { useHealthQuery } from "../../api/queries/useHealthQuery.ts";

import styles from "./Home.module.css";
import { useFilesQuery } from "../../api/queries/useFilesQuery.ts";
import { useBooksQuery } from "../../api/queries/useBooksQuery.ts";

const homeTxt = [
  "Draft of draft of page one day to be",
  "At the moment it's purpose was only to serve wishlist",
  "Next in progress is connecting to some api to grab needed data",
  "But first need to finish creating mentioned api",
];

export const Home = () => {
  const health = useHealthQuery();
  const files = useFilesQuery();
  const books = useBooksQuery();

  console.log("files", files.data);
  console.log("health", health.data);
  console.log("books", books.data);

  const statusClass = health.isLoading
    ? styles.loading
    : health.isError
      ? styles.error
      : styles.ok;

  return (
    <>
      <div className={styles.permanent}>
        <div>Welcome traveler to my homePage</div>
        <div>Either you got lost or find your way here</div>
        <div>True my resume or less likely true my github account</div>
      </div>
      <div className={styles.home}>
        <div>
          {homeTxt.map((item, index) => (
            <p className={styles.par} key={index}>
              {item}
            </p>
          ))}
          <p className={statusClass}>
            Status:{" "}
            {health.isLoading
              ? "loading ..."
              : health.isError
                ? health.error.message
                : health.data?.status}
          </p>
        </div>
      </div>
    </>
  );
};

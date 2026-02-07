import { useHealthQuery } from "../../api/queries/useHealthQuery.ts";

import styles from "./Home.module.css";
import { AIloaderBar } from "../../components/AIloadingBar/AIloadingBar.tsx";
import { NoteField } from "../../components/NoteField/NoteField.tsx";

const homeTxt = [
  "This page suppose to be polished few years ago",
  "But lack of time and tons of ideas got me nowhere",
  "So, as new year started I started (re)building this page",
  "With some kind of 'plan' ( big word ) ",
  "First let it work, then let it look",
];

const completeThings = [
  "Working navbar",
  "Added AI generated component - loading bar",
  "Change display things at home",
];

const consideratingThings = [
  "Introduce i18next and pl/eng switch",
  "Writing test - vitest",
  "React hook form to edit lists",
  "zustand to keep changed things at bay before sending to BE",
  " Carousel for gallery's",
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
          {health.isLoading ? (
            <AIloaderBar />
          ) : health.isError ? (
            health.error.message
          ) : (
            `API says:${health.data?.status}`
          )}
        </p>

        {health.data && (
          <div className={styles.notes}>
            <NoteField header="Site story" text={homeTxt} />
            <NoteField header="Things done" text={completeThings} />
            <NoteField header="Things TODO ?" text={consideratingThings} />
          </div>
        )}
      </div>
    </>
  );
};

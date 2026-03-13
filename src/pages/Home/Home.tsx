import { useHealthQuery } from "../../api/queries/useHealthQuery.ts";

import styles from "./Home.module.css";
import { AIloaderBar } from "../../componentsAI/AIloadingBar/AIloadingBar.tsx";
import { NoteField } from "../../components/NoteField/NoteField.tsx";

const homeTxt = [
  "component for done things ( list + check box ) ",
  "- correct paddings for navbar",
  "- change and correct footer display",
  "- page with table as generic component",
  "- hook for page/table ",
  "- changelist - ",
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

  const ToDOList = () => {
    return (
      <div>
        <p>Short TODO list</p>
        <ul>
          {homeTxt.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className={styles.permanent}>
        <div className={styles.left}>Welcome traveler to my homePage</div>
      </div>
      <div className={styles.home}>
        <div className={statusClass}>
          {" "}
          {health.isLoading ? (
            <AIloaderBar />
          ) : health.isError ? (
            health.error.message
          ) : (
            `API status:${health.data?.status}`
          )}
        </div>

        {health.data && (
          <div className={styles.notes}>
            <ToDOList />
            <NoteField header="Things done" text={completeThings} />
            <NoteField header="Things TODO ?" text={consideratingThings} />
          </div>
        )}
      </div>
    </>
  );
};

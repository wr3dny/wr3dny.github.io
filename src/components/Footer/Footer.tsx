import styles from "./Footer.module.css";
import { useEffect, useState } from "react";

type BuildInfo = {
  commitSha: string;
  commitDate: string;
  commitMessage: string;
};

export const Footer = () => {
  const [info, setInfo] = useState<BuildInfo | null>(null);

  useEffect(() => {
    fetch("/build-info.json")
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error("No build info")),
      )
      .then(setInfo)
      .catch(() => setInfo(null));
  }, []);

  console.log(info?.commitMessage);

  const today = new Date().toISOString().split("T")[0];

  return (
    <footer className={styles.wrapper}>
      <div className={styles.hidden} />
      <div className={styles.display}>
        {!info ? <div>No info</div> : <div>{info.commitDate}</div>}
        <div>{today}</div>
      </div>
    </footer>
  );
};

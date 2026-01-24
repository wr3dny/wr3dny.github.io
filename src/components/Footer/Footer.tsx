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

  const lastCommitMsg = info?.commitMessage;

  const lastCommitDate = info?.commitDate
    ? new Date(info.commitDate)
    : undefined;

  const today = new Date();
  // const todayDisplay = new Date().toISOString().split("T")[0];

  const MS_IN_DAY = 1000 * 60 * 60 * 24;

  const daysSinceLastCommit = lastCommitDate
    ? Math.floor((today.getTime() - lastCommitDate.getTime()) / MS_IN_DAY)
    : undefined;

  console.log(lastCommitMsg);

  const backGrCol = (): string | undefined => {
    if (daysSinceLastCommit === undefined) {
      return undefined;
    }

    switch (true) {
      case daysSinceLastCommit <= 1:
        return "excellent";

      case daysSinceLastCommit <= 3:
        return "healthy";

      case daysSinceLastCommit <= 7:
        return "stable";

      case daysSinceLastCommit <= 12:
        return "stale";

      case daysSinceLastCommit <= 18:
        return "degrading";

      case daysSinceLastCommit <= 25:
        return "inactive";

      default:
        return "forgotten";
    }
  };

  const bgClass = backGrCol();

  return (
    <footer className={styles.wrapper}>
      <div className={styles.hidden} />
      <div className={styles.display}>
        <div className={styles.commitMsg}>{lastCommitMsg}</div>
        <div className={`${styles.commit} ${bgClass ? styles[bgClass] : ""}`}>
          {!info ? "?" : `${daysSinceLastCommit}`}
        </div>
      </div>
    </footer>
  );
};

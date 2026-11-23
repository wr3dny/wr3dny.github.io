import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

type BuildInfo = {
  commitSha: string;
  commitDate: string;
  commitMessage: string;
};

const isBuildInfo = (value: unknown): value is BuildInfo => {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.commitSha === "string" &&
    typeof record.commitDate === "string" &&
    typeof record.commitMessage === "string"
  );
};

export const Footer = () => {
  const [info, setInfo] = useState<BuildInfo | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}build-info.json`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Build info unavailable");
        return response.json() as Promise<unknown>;
      })
      .then((value) => setInfo(isBuildInfo(value) ? value : null))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setInfo(null);
        }
      });

    return () => controller.abort();
  }, []);

  const commitDate = info?.commitDate ? new Date(info.commitDate) : null;
  const hasValidDate =
    commitDate !== null && !Number.isNaN(commitDate.getTime());

  return (
    <footer className={styles.footer}>
      <span>Collectorium</span>
      {hasValidDate && commitDate && (
        <span className={styles.buildInfo}>
          Ostatnia aktualizacja:{" "}
          <time dateTime={commitDate.toISOString()}>
            {new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(
              commitDate,
            )}
          </time>
          {info?.commitMessage ? ` — ${info.commitMessage}` : ""}
        </span>
      )}
    </footer>
  );
};

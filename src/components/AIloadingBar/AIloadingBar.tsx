import styles from "./AIloadingBar.module.css";

type AIloaderBarProps = {
  /** width in px or any CSS value, e.g. 280, "100%", "24rem" */
  width?: number | string;
  /** height in px (number) or any CSS value */
  height?: number | string;
  /** optional extra class */
  className?: string;
  /** accessible label */
  label?: string;
};

const toCssSize = (v: number | string | undefined, fallback: string) => {
  if (v === undefined) return fallback;
  return typeof v === "number" ? `${v}px` : v;
};

export const AIloaderBar = ({
  width = 280,
  height = 10,
  className,
  label = "Loading",
}: AIloaderBarProps) => {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={{
        width: toCssSize(width, "280px"),
        height: toCssSize(height, "10px"),
      }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className={styles.track}>
        <div className={styles.bar} />
      </div>
    </div>
  );
};

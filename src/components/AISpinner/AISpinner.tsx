import styles from "./AISpinner.module.css";

type AISpinnerProps = {
  size?: number;
  className?: string;
};

export const AISpinner = ({ size = 96, className }: AISpinnerProps) => {
  return (
    <div
      className={[styles.decoSunburst, className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true">
        <defs>
          <radialGradient id="decoJewel" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f3e2b3" />
            <stop offset="100%" stopColor="#d6b35f" />
          </radialGradient>
        </defs>

        <g className={styles.rays}>
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={i}
              x="58"
              y="4"
              width="4"
              height="16"
              rx="1"
              transform={i === 0 ? undefined : `rotate(${i * 15} 60 60)`}
            />
          ))}
        </g>

        <circle
          className={[styles.ring, styles.ring1].join(" ")}
          cx="60"
          cy="60"
          r="40"
        />
        <circle
          className={[styles.ring, styles.ring2].join(" ")}
          cx="60"
          cy="60"
          r="28"
        />

        <circle className={styles.jewel} cx="60" cy="60" r="6" />
      </svg>
    </div>
  );
};

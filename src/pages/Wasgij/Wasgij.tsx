import styles from "./Wasgij.module.css";

/** Decorative puzzle: two pieces fit together, the third is still missing. */
const PuzzleGraphic = () => (
  <svg
    className={styles.graphic}
    viewBox="0 0 332 140"
    role="img"
    aria-label="Układanka z brakującym elementem"
  >
    <defs>
      {/* Cuts a round socket out of the right-hand piece. */}
      <mask id="wasgij-socket">
        <rect x="0" y="0" width="332" height="140" fill="white" />
        <circle cx="110" cy="70" r="14" fill="black" />
      </mask>
    </defs>
    <g className={styles.pieceLeft}>
      <rect x="10" y="20" width="100" height="100" rx="10" />
      <circle cx="110" cy="70" r="13" />
    </g>
    <g className={styles.pieceRight} mask="url(#wasgij-socket)">
      <rect x="110" y="20" width="100" height="100" rx="10" />
    </g>
    <rect
      className={styles.pieceMissing}
      x="222"
      y="20"
      width="100"
      height="100"
      rx="10"
    />
    <text className={styles.question} x="272" y="82" textAnchor="middle">
      ?
    </text>
  </svg>
);

export const Wasgij = () => (
  <section className={styles.page}>
    <h1>Wasgij</h1>
    <PuzzleGraphic />
    <p>Under construction — katalog jest w przygotowaniu.</p>
  </section>
);

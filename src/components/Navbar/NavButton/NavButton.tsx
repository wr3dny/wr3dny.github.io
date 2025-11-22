import styles from "./NavButton.module.css";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  disabled: boolean;
}

export const NavButton = ({ label, to, disabled }: Props) => {
  return (
    <Link
      to={disabled ? "#" : to}
      className={`${styles.link} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
    >
      <div className={styles.outer}>
        <div className={styles.inner}>{label}</div>
      </div>
    </Link>
  );
};

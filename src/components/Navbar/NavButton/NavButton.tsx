import styles from "./NavButton.module.css";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  disabled?: boolean;
}

export const NavButton = ({ label, to, disabled = false }: Props) => {
  return (
    <Link
      to={disabled ? "#" : to}
      className={`${styles.link} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <span className={styles.btn}>{label}</span>
    </Link>
  );
};

import styles from "./NavButton.module.css";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  label: string;
  to: string;
  disabled?: boolean;
  className?: string;
}

export const NavButton = ({
  label,
  to,
  disabled = false,
  className,
}: Props) => {
  return (
    <Link
      to={to}
      className={clsx(styles.link, disabled && styles.disabled, className)}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <span className={styles.btn}>{label}</span>
    </Link>
  );
};

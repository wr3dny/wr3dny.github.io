import styles from "./NavButton.module.css";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  label: string;
  to: string;
  active?: boolean;
  className?: string;
  onNavigate?: () => void;
}

export const NavButton = ({
  label,
  to,
  active = false,
  className,
  onNavigate,
}: Props) => {
  return (
    <Link
      to={to}
      className={clsx(styles.link, active && styles.active, className)}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      <span className={styles.btn}>{label}</span>
    </Link>
  );
};

import styles from "./NavLogo.module.css";
import dev404Logo from "../../../assets/dev404Logo.png";
import { Link } from "react-router-dom";

interface Props {
  onNavigate?: () => void;
}

export const NavLogo = ({ onNavigate }: Props) => {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className={styles.link}
      aria-label="Collectorium — strona główna"
    >
      <img src={dev404Logo} alt="" className={styles.logo} />
    </Link>
  );
};

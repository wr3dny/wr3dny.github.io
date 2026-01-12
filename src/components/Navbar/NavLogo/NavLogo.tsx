import styles from "./NavLogo.module.css";
import dev404Logo from "../../../assets/dev404Logo.png";
import { Link } from "react-router-dom";
import { PATHS } from "../../../const/paths.ts";

export const NavLogo = () => {
  return (
    <Link to={PATHS.HOME} className={styles.link}>
      <img src={dev404Logo} alt="dev404 logo" className={styles.logo} />
    </Link>
  );
};

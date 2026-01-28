import styles from "./NavLogo.module.css";
import dev404Logo from "../../../assets/dev404Logo.png";
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to={"/"} className={styles.link}>
      <div className={styles.outer}>
        <img src={dev404Logo} alt="dev404 logo" className={styles.logo} />
      </div>
    </Link>
  );
};

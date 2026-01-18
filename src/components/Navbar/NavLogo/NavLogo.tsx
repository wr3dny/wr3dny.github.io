import styles from "./NavLogo.module.css";
import dev404Logo from "../../../assets/dev404Logo.png";
import { Link, useLocation } from "react-router-dom";

export const NavLogo = () => {
  const location = useLocation();

  const isLego = location.pathname === "/lego";

  return (
    <Link to={"/"} className={styles.link}>
      <img
        src={dev404Logo}
        alt="dev404 logo"
        className={`${styles.logo} ${
          isLego ? styles.maxLines : styles.lessLine
        }`}
      />
    </Link>
  );
};

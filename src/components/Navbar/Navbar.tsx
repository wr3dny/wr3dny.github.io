import { useLocation } from "react-router-dom";
import { PATHS } from "../../const/paths.ts";
import { NavButton } from "./NavButton/NavButton.tsx";

import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";
import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton.tsx";

export const Navbar = () => {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className={styles.container}>
      <NavLogo />
      <div className={styles.non_logo}>
        <div className={styles.buttons}>
          {Object.entries(PATHS)
            .filter(([, path]) => path !== PATHS.HOME)
            .map(([name, path]) => (
              <NavButton
                key={name}
                label={name}
                to={path}
                disabled={location.pathname === path}
              />
            ))}
          <ThemeToggleButton />
        </div>
        <div className={styles.hidden} />
      </div>
    </div>
  );
};

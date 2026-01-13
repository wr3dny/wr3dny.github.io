import { useLocation } from "react-router-dom";

import { NavButton } from "./NavButton/NavButton.tsx";

import { PATHS } from "../../const/paths.ts";
import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";

export const Navbar = () => {
  const currentPath = useLocation();
  const strippedPath = currentPath.pathname.startsWith("/")
    ? currentPath.pathname.slice(1)
    : currentPath.pathname;
  const uppercasePath = strippedPath.toUpperCase();

  console.log(currentPath);

  return (
    <div className={styles.container}>
      <NavLogo />
      <div className={styles.non_logo}>
        <div className={styles.buttons}>
          {Object.entries(PATHS).map(([name, path]) => (
            <NavButton
              key={name}
              label={name}
              to={path}
              disabled={uppercasePath === name}
            />
          ))}
        </div>
        <div className={styles.hidden} />
      </div>
    </div>
  );
};

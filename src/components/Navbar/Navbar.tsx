import { useLocation } from "react-router-dom";
import { PATHS, SUBPATHS } from "../../const/paths.ts";
import { NavButton } from "./NavButton/NavButton.tsx";

import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";
import { useState } from "react";
import { NavOpenMenuButton } from "./NavOpenMenuButton/NavOpenMenuButton.tsx";

export const Navbar = () => {
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  const currentPath = useLocation();
  const strippedPath = currentPath.pathname.startsWith("/")
    ? currentPath.pathname.slice(1)
    : currentPath.pathname;
  const uppercasePath = strippedPath.toUpperCase();

  const handleSubMenu = () => {
    setSubMenuIsOpen((prev) => !prev);
  };

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
          <NavOpenMenuButton
            label="COLLECTIONS"
            key="COLLECTIONS"
            onClick={handleSubMenu}
          />
          {subMenuIsOpen &&
            Object.entries(SUBPATHS).map(([name, path]) => (
              <NavButton
                key={name}
                label={name}
                to={path}
                disabled={uppercasePath === name}
              />
            ))}
          {/*<NavButton*/}
          {/*  label={status !== null ? status?.toString() : "null"}*/}
          {/*  to={"/"}*/}
          {/*  disabled={false}*/}
          {/*/>*/}
          {/*<NavOpenMenuButton label={} to={} disabled={} />*/}
        </div>
        <div className={styles.hidden} />
      </div>
    </div>
  );
};

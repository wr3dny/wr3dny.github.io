import { useLocation } from "react-router-dom";
import { PATHS, SUBPATHS } from "../../const/paths.ts";
import { NavButton } from "./NavButton/NavButton.tsx";

import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { NavOpenMenuButton } from "./NavOpenMenuButton/NavOpenMenuButton.tsx";

export const Navbar = () => {
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  // const [legoMenu, setLegoMenu] = useState(false);
  const location = useLocation();

  const handleSubMenu = () => {
    setSubMenuIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const path = location.pathname.replace("/", "").toUpperCase();

    if (path === "GALLERY" || path === "BOOKS") {
      setSubMenuIsOpen(false);
    }
  }, [location.pathname]);

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
              disabled={path === name}
            />
          ))}
          <NavOpenMenuButton
            label="COLLECTIONS"
            key="COLLECTIONS"
            onClick={handleSubMenu}
          />
        </div>
        <div className={styles.buttons}>
          {subMenuIsOpen &&
            Object.entries(SUBPATHS).map(([name, path]) => (
              <NavButton
                key={name}
                label={name}
                to={path}
                disabled={path === name}
              />
            ))}
        </div>
        <div className={styles.buttons}>
          {subMenuIsOpen &&
            Object.entries(SUBPATHS).map(([name, path]) => (
              <NavButton
                key={name}
                label={name}
                to={path}
                disabled={path === name}
              />
            ))}
        </div>
        <div className={styles.hidden} />
      </div>
    </div>
  );
};

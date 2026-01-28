import { useLocation } from "react-router-dom";
import { PATHS } from "../../const/paths.ts";
import { NavButton } from "./NavButton/NavButton.tsx";

import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";
import { ThemeToggleButton } from "../ThemeToggleButton/ThemeToggleButton.tsx";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(true);
  }, [location.pathname]);

  console.log(location.pathname);

  return (
    <div className={styles.container}>
      <NavLogo />
      <div className={styles.actionButtons}>
        <ThemeToggleButton />
        <div className={styles.secondLine}>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.burger}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <span className={styles.burgerIcon} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.firstLine}>
        <div
          className={`${styles.navButtons} ${isMenuOpen ? styles.navButtonsOpen : ""}`}
          role="navigation"
          aria-label="Primary"
        >
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
        </div>
      </div>
    </div>
  );
};

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../const/paths";
import { ThemeSelector } from "../ThemeSelector/ThemeSelector";
import { NavButton } from "./NavButton/NavButton";
import { NavLogo } from "./NavLogo/NavLogo";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const location = useLocation();
  const navbarRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const root = document.documentElement;
    const previousHeight = root.style.getPropertyValue("--navbar-height");
    const updateHeight = () => {
      root.style.setProperty(
        "--navbar-height",
        `${navbar.getBoundingClientRect().height}px`,
      );
    };

    updateHeight();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => {
        window.removeEventListener("resize", updateHeight);
        if (previousHeight)
          root.style.setProperty("--navbar-height", previousHeight);
        else root.style.removeProperty("--navbar-height");
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(navbar);
    return () => {
      observer.disconnect();
      if (previousHeight)
        root.style.setProperty("--navbar-height", previousHeight);
      else root.style.removeProperty("--navbar-height");
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header ref={navbarRef} className={styles.container}>
      <NavLogo onNavigate={() => setIsMenuOpen(false)} />
      <nav
        id="primary-navigation"
        className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ""}`}
        aria-label="Główna nawigacja"
      >
        {NAV_ITEMS.map(({ label, path }) => {
          const active =
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`);
          return (
            <NavButton
              key={path}
              label={label}
              to={path}
              active={active}
              onNavigate={() => setIsMenuOpen(false)}
            />
          );
        })}
      </nav>
      <div className={styles.controls}>
        <ThemeSelector />
        <button
          type="button"
          className={styles.burger}
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.burgerIcon} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

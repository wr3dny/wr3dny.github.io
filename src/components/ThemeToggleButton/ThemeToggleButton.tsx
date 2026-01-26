import nightIcon from "../../assets/nightIcon.png";
import dayIcon from "../../assets/dayIcon.png";

import { useTheme } from "../../hooks/useTheme.ts";

import styles from "./ThemeToggleButton.module.css";

export function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const isNight = theme === "night";

  const iconSrc = isNight ? nightIcon : dayIcon;
  const iconAlt = isNight ? "Night theme" : "Day theme";

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.themeToggle}
      aria-label={isNight ? "Switch to day theme" : "Switch to night theme"}
      title={isNight ? "Switch to day theme" : "Switch to night theme"}
    >
      <img
        className={styles.icon}
        src={iconSrc}
        alt={iconAlt}
        draggable={false}
      />
    </button>
  );
}

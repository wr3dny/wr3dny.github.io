import { THEMES, isTheme } from "../../const/themes";
import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeSelector.module.css";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <label className={styles.control}>
      <span className={styles.label}>Motyw strony</span>
      <select
        className={styles.select}
        value={theme}
        onChange={(event) => {
          const value = event.target.value;
          if (isTheme(value)) setTheme(value);
        }}
      >
        {THEMES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

import { useLocation } from "react-router-dom";
import { PATHS } from "../../const/paths.ts";
import { NavButton } from "./NavButton/NavButton.tsx";

import { NavLogo } from "./NavLogo/NavLogo.tsx";

import styles from "./Navbar.module.css";
import { useAllAnswersQuery } from "../../api/useAllAnswers.ts";

export const Navbar = () => {
  const currentPath = useLocation();
  const strippedPath = currentPath.pathname.startsWith("/")
    ? currentPath.pathname.slice(1)
    : currentPath.pathname;
  const uppercasePath = strippedPath.toUpperCase();

  const { data, isLoading, isError } = useAllAnswersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading answers</div>;

  console.log(data);

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
          {/*<NavButton*/}
          {/*  label={status !== null ? status?.toString() : "null"}*/}
          {/*  to={"/"}*/}
          {/*  disabled={false}*/}
          {/*/>*/}
        </div>
        <div className={styles.hidden} />
      </div>
    </div>
  );
};

import {NavButton} from "./NavButton/NavButton.tsx";
import styles from './Navbar.module.css'
import {PATHS} from "../../const/paths.ts";
import {useLocation} from "react-router-dom";
import {NavLogo} from "./NavLogo/NavLogo.tsx";

export const Navbar = () => {
    const currentPath = useLocation();
    const strippedPath = currentPath.pathname.startsWith("/") ? currentPath.pathname.slice(1) : currentPath.pathname;
    const uppercasePath = strippedPath.toUpperCase()
    const displayPath = uppercasePath || "HOME"

    return (
        <div className={styles.container}>
            <NavLogo />
            <div className={styles.non_logo}>
                <div className={styles.path}>{displayPath}            </div>
                <div className={styles.buttons}>
                    {Object.entries(PATHS).map(([name, path]) => (
                        <NavButton key={name} label={name} to={path} />
                    ))}
                </div>
                <div className={styles.hidden} />
            </div>
        </div>
    )
}
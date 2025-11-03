import styles from './NavLogo.module.css';
import dev404Logo from '../../../assets/dev404Logo.png';

export const NavLogo = () => {
    return (
            <img src={dev404Logo} alt="dev404 logo" className={styles.logo} />
    );
};
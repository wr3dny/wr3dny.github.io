import styles from './NavButton.module.css'
import {Link} from 'react-router-dom'


interface Props {
    label: string;
    to: string
}

export const NavButton = ({label, to}:Props) => {
    return (
        <Link to={to}>
            <div className={styles.outer}>
                <div className={styles.inner} >{label}</div>
            </div>
        </Link>

    )
}
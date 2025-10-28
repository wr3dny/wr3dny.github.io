import {NavButton} from "./NavButton/NavButton.tsx";
import styles from './Navbar.module.css'

const labels = [
    'one' , 'two' , 'three', 'four'
]

export const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                {labels.map((l) => (
                    <NavButton key={l} label={l} />
                ))}
            </div>
        </div>
    )
}
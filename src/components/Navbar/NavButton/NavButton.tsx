import styles from './NavButton.module.css'

interface Props {
    label: string;

}

export const NavButton = ({label}:Props) => {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>{label}</div>
        </div>
    )
}
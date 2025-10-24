import classNames from 'classnames'
import styles from './Button.module.css'

interface Props {
    label: string
    type: 'navbar' | 'navbar-lego'
    onClick?: () => void
}

export const Button = ({label, type, onClick}:Props) => {
    return (
        <div className={classNames(styles[type])} onClick={onClick}>
            {label}
        </div>
    )
}
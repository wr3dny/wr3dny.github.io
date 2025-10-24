import classNames from 'classnames'
import styles from './Button.module.css'

interface Props {
    label: string
    type: 'navbar' | 'navbar-lego'
}

export const Button = ({label, type}:Props) => {
    return (
        <div className={classNames(styles[type])}>
            {label}
        </div>
    )
}
import classNames from 'classnames'
import styles from './Button.module.css'

interface Props {
    label: string
    size: 'small' | 'medium' | 'large' | 'round'
    onClick?: () => void
}

export const Button = ({label,size,  onClick}:Props) => {

    return (
        <div className={classNames(styles[size])} onClick={onClick}>
            {label}
        </div>
    )
}
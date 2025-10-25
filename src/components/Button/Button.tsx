import classNames from 'classnames'
import styles from './Button.module.css'

interface Props {
    label: string
    type: 'navbar' | 'navbar-lego'
    onClick?: () => void
    insideBorder?: boolean
}

export const Button = ({label, type, onClick, insideBorder}:Props) => {
    if(insideBorder){
        return (
            <div className={classNames(styles[type], styles['outer'])}>
            <div className={classNames(styles[type])} onClick={onClick}>
                {label}
            </div>
            </div>
        )
    }

    return (
        <div className={classNames(styles[type])} onClick={onClick}>
            {label}
        </div>
    )
}
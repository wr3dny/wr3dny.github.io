import styles from "./App.module.css";
import {Button} from "./components/Button/Button.tsx";

export const App = () => {


  return (
    <>
<div className={styles.header}>
    <div className={styles.logo}>LOGO</div>
    <div className={styles.top_menu}>
        <div className={styles.page}>Home</div>
        <Button label="LEGO" type="navbar"/>
        <Button label="COINS" type="navbar"/>
        <Button label="BOOKS" type="navbar"/>
    </div>

</div>
        <div>IMG</div>
        <div>
            <div>Button footer</div>
            <div>Button footer</div>
            <div>Button footer</div>
        </div>
    </>
  )
}


import styles from "./NavOpenMenuButton.module.css";

interface Props {
  label: string;
  onClick?: () => void;
}

export const NavOpenMenuButton = ({ label, onClick }: Props) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      {label}
    </div>
  );
};

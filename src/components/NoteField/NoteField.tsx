import styles from "./NoteField.module.css";

interface Props {
  header: string;
  text: string[];
}

export const NoteField = ({ header, text }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{header}</div>
      {text.map((item) => (
        <p className={styles.item}>{item}</p>
      ))}
    </div>
  );
};

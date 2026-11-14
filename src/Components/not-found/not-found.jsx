import styles from "./not-found.module.css";

export default function NotFound({ title, message, className }) {
  return (
    <main className={styles.notfound}>
      <h1>{title}</h1>
      <p>{message}</p>
    </main>
  );
}
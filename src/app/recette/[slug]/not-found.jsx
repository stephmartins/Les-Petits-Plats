import NotFound from "@/Components/not-found/not-found";
import styles from "./page.module.css";

export default function NotFoundPage() {
  return (
    <NotFound
      title="Recette introuvable"
      message="La recette que vous recherchez n'existe pas."
      className={styles.notfound}
    />
  );
}
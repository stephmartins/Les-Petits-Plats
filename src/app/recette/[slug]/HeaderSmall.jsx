import styles from "./page.module.css";
import Logo from "@/Components/Logo/Logo";


export default function HeaderSmall() {

  return (
    <header className={styles["header-small"]}>
      
          <h1><Logo/></h1>

    </header>
  );
}
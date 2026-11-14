import styles from "./Logo.module.css";
import Link from "next/link";

export default function Logo() {

  return (
        <Link href="/" className={styles["logo"]}>
          <img className={styles["logo-image"]}
            src="/images/logo-les-petits-plats.png"
            alt="Logo les Petits Plats"
          />
        </Link>
        );
} 
import styles from "./SearchBar.module.css";
import Link from "next/link";


export default function SearchBar() {

  return (
<div className={styles["search-bar"]}>

              <form className={styles["rectangle-recherche"]}>
                    <input
                        type="search"
                        placeholder="Rechercher une recette, un ingrédient..."
                    />
                    <button className={styles["loupe"]}> <img src="/images/loupe-noire-recherche.png" alt="Lancer la recherche" />
                    </button>
              </form>

              
</div>
  )
}
"use client";
import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

    useEffect(() => {
      /*Equivaut à debounce*/
        const term = search.trim(); /*Supprime les éventuels espaces avnt et après*/

            if (term.length < 3) /*La recherche ne se lance pas si moins de 3 caractères saisis*/{
            onSearch("");
            return;
            }

        const timer = setTimeout(() => {
            onSearch(term);

        }, 300); /*A partir de 3 caractères saisis, attente de 300ms avant de lancer la recherche*/

        return () => clearTimeout(timer); /*Annule le délai précédent si l'utilisateur continue à taper*/
    }, [search, onSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const term = search.trim(); /*Supprime les espaces de début et fin*/

    if (!term) {
      onSearch("");
      return;
    }

    if (term.length < 3) return;
    onSearch(term);
  };
         
 return (
<div className={styles["search-bar"]}>

        <form
            className={styles["rectangle-recherche"]}
            onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Rechercher une recette, un ingrédient..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)} /*Mise à jour de la valeur du champ selon la saisie (recherche déclenchée par useEffect au bout de 300 ms).*/
                />

                <button
                    className={styles["loupe"]}
                    type="submit">
                    <img src="/images/loupe-noire-recherche.png" alt="Lancer la recherche" />
                </button>
              
              </form>
</div>
  );
}          

"use client";
import styles from "./SearchBar.module.css";
import Link from "next/link";
import { useState } from "react";


export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const term = search.trim();

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
                        onSubmit={handleSubmit}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <button
                        className={styles["loupe"]}
                        type="submit">
                        <img src="/images/loupe-noire-recherche.png" alt="Lancer la recherche" />
                    </button>
              </form>
             
</div>
  )
}
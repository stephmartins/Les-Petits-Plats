import styles from "./Filter.module.css";
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function Ustensiles ({ onSelect }) {
    const [search, setSearch] = useState("");
    {/*Gestion du clic sur la flèche*/}
    const [isOpen, setIsOpen] = useState(false);
    {/*Pour récupérer le nom de tous les ustensiles du fichier JSON, parcourir chaque recette et supprimer les ingrédients en doublon*/}
    const ustensiles = [
    ...new Set(
        recipes.flatMap((recipe) =>
            recipe.ustensils.map((item) => item)
        )
    ),
    ].sort();
    {/*Filtrage des ustensiles en transformant la saisie en lettres minuscules*/}
    const filteredUstensiles = ustensiles.filter((ustensile) =>
        ustensile.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <form>
    <div
        className={`${styles["rectangle-recherche"]} ${
            isOpen ? styles["rectangle-recherche-open"] : ""
        }`}
    >
    <input
        type="text"
        placeholder={isOpen ? "" : "Ustensiles"}
        value={search}
        onFocus={() => setIsOpen(true)}
        /*e=évènement déclenché par la saisie, e.target.value=texte saisi*/
        onChange={(e) => setSearch(e.target.value)}
      />
      
    <button
         type="button"
         className={styles.fleche}
         onClick={() => setIsOpen((open) => !open)}
    > 
        <img 
            src={isOpen
                ? "/images/fleche-vers-haut.png" 
                : "images/fleche-vers-bas.png"}
                alt={isOpen ? "Afficher les ingrédients filtrés" : "Saisir les ingrédients souhaités"}
                />
    </button>
      {isOpen && (
        <ul className={styles["filtre-list"]}>
          {filteredUstensiles.map((ustensile) => (
            <li
                 key={ustensile}
                onClick={() => {
                setSearch(ustensile);
                onSelect?.(ustensile);
        }}
            >
              {ustensile}
            </li>
          ))}
        </ul>
      )}
    </div>
  
    

    </form>
  
    );  
    }
import styles from "./Filter.module.css";
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function Ingredients({ onSelect }) {
    const [search, setSearch] = useState("");
    {/*Gestion du clic sur la flèche*/}
    const [isOpen, setIsOpen] = useState(false);
    {/*Pour récupérer le nom de tous les ingrédients du fichier JSON, parcourir chaque recette et supprimer les ingrédients en doublon*/}
    const ingredients = [
    ...new Set(
        recipes.flatMap((recipe) =>
            recipe.ingredients.map((item) => item.ingredient)
        )
    ),
    ].sort();
    {/*Filtrage des ingrédients en transformant la saisie en lettres minuscules*/}
    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
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
        placeholder={isOpen ? "" : "Ingrédients"}
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
          {filteredIngredients.map((ingredient) => (
            <li
                 key={ingredient}
                onClick={() => {
                setSearch(ingredient);
                onSelect?.(ingredient);
        }}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  
    

    </form>
  
    );  
    }
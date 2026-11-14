import styles from "./Filter.module.css";
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function Appareils ({ onSelect }) {
    const [search, setSearch] = useState("");
    {/*Gestion du clic sur la flèche*/}
    const [isOpen, setIsOpen] = useState(false);
    {/*Pour récupérer le nom de tous les appareils du fichier JSON, parcourir chaque recette et supprimer les ingrédients en doublon*/}
    const appareils = [
    ...new Set(
        recipes.map((recipe) => recipe.appliance) /*chaque recette n'a qu'un seul appareil*/
    ),
    ].sort();
    {/*Filtrage des appareils en transformant la saisie en lettres minuscules*/}
    const filteredAppareils = appareils.filter((appareil) =>
        appareil.toLowerCase().includes(search.toLowerCase())
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
        placeholder={isOpen ? "" : "Appareils"}
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
                alt={isOpen ? "Afficher les appareils filtrés" : "Saisir les appareils souhaités"}
                />
    </button>
      {isOpen && (
        <ul className={styles["filtre-list"]}>
          {filteredAppareils.map((appareil) => (
            <li
                 key={appareil}
                onClick={() => {
                setSearch(appareil);
                onSelect?.(appareil);
        }}
            >
              {appareil}
            </li>
          ))}
        </ul>
      )}
    </div>
  
    

    </form>
  
    );  
    }
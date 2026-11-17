"use client";
import styles from "./FilterBar.module.css";
import Link from "next/link";
import Tag from "@/Components/FilterBar/Tag/Tag";


{/*Props définies dans page.jsx*/}
export default function FilterBar({ recipes, onFilterChange }) {
   
    const ingredients = [
      ...new Set /*Convertir l'ensemble des données en un seul tableau, supprime les doublons, ce qui permettra de les trier avec .sort*/(
        recipes.flatMap((recipe) /*Flatmap : rassemble les résultats en un seul tableau, ce qui permettra de dédoublonner et trier et */ =>
          /*Données recipe.ingredients récupérées du fichier json*/
          recipe.ingredients.map((item) => item.ingredient)
        )
      ),
    ].sort(); /*liste ordonnée*/

    const appareils = [...new Set(recipes.map((recipe) => recipe.appliance))].sort();

    const ustensiles = [...new Set(recipes.flatMap((recipe) => recipe.ustensils)),
    ].sort();


        return (
          <div className={styles["filter-bar"]}>
            <Tag
               label="Ingrédients"
               options={ingredients}
               onSelect={(value) => onFilterChange("ingredient" /*voir page.jsx : useState puis composant FilterBar*/, value)} /*Mise à jour du nombre de recettes affichées*/
               />
            <Tag
               label="Appareils"
               options={appareils}
               onSelect={(value) => onFilterChange("appliance", value)} 
               />
            <Tag
               label="Ustensiles"
               options={ustensiles}
               onSelect={(value) => onFilterChange("utensil", value)}
               />
         <div className={styles["recettes-50"]}>50 recettes</div>    
          </div>      
                    
  )
}

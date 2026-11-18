"use client";
import styles from "./FilterBar.module.css";
import Tag from "@/Components/FilterBar/Tag/Tag";
import { useState } from "react";


{/*Props définies dans page.jsx*/}
export default function FilterBar({ recipes, onFilterChange }) {
   
    /*Gestion des options sélectionnées*/
    const [selectedByType, setSelectedByType] = useState({
      ingredient: [],
      appliance: [],
      ustensil: [],
    });

    const updateSelectedOptions = (type, options) => {
      const nextOptions = options ?? [];
      setSelectedByType((current) => ({ ...current, [type]: nextOptions }));
      onFilterChange(type, nextOptions);
    }; /*Mise à jour lorsqu'une option est ajoutée*/

    const removeOption = (type, option) => {
      updateSelectedOptions(
        type,
        selectedByType[type].filter((selected) => selected !== option)
      );
    }; /*Mise à jour lorsqu'une option est supprimée*/

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

    const allSelectedOptions = Object.entries(selectedByType).flatMap(
      ([type, options]) => options.map((option) => ({ type, option }))
    ); /*Objet transformé en liste*/

        return (
          <div className={`${styles["filter-bar"]} ${
          allSelectedOptions.length === 0
          ? styles["filter-bar-without-options"]
          : ""
      }`}> {/*Ajustement des marges lorsqu'aucune option n'est sélectionnée*/}
            
            <div className={styles["filter-groups"]}>
            
            <Tag
               label="Ingrédients"
               options={ingredients}
               selectedOptions={selectedByType.ingredient} /*Gestion des options sélectionnées*/
               onSelect={(value) => updateSelectedOptions("ingredient", value)} /*Mise à jour du nombre de recettes affichées*/
               /> {/*voir page.jsx : useState puis composant FilterBar*/}
            
            <Tag
               label="Appareils"
               options={appareils}
               selectedOptions={selectedByType.appliance}
               onSelect={(value) => updateSelectedOptions("appliance", value)} 
               />
            
            <Tag
               label="Ustensiles"
               options={ustensiles}
               selectedOptions={selectedByType.ustensil}
               onSelect={(value) => updateSelectedOptions("ustensil", value)}
               />
               
            </div>

              <div className={styles["recettes-50"]}>{recipes.length} {recipes.length === 1 ? "recette" : "recettes"} </div>  {/*Mise à jour du nombre de recettes actualisé selon l'affichage*/}

            {/*Affichage pour retirer une option :*/}
            {allSelectedOptions.length > 0 && (
              
              <ul className={styles["selected-options"]}>
                
                {allSelectedOptions.map(({ type, option }) => (
                  
                  <li className={styles["selected-option"]} key={`${type}-${option}`}>
                    
                    <span>{option}</span>
                    
                    <button
                      type="button"
                      aria-label={`Retirer ${option}`}
                      onClick={() => removeOption(type, option)}
                    >
                      ×
                    </button>
                  
                  </li>
                ))}

              </ul>
            )}

          </div>      
                    
  )
}

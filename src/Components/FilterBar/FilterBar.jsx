"use client";
import styles from "./FilterBar.module.css";
import Link from "next/link";
import { useState } from "react";
import Tag from "@/Components/FilterBar/Filter/Tag";



export default function FilterBar({ recipes, onFilterChange }) {
   
    const ingredients = [
      ...new Set(
        recipes.flatMap((recipe) =>
          recipe.ingredients.map((item) => item.ingredient)
        )
      ),
    ].sort();

    const appareils = [...new Set(recipes.map((recipe) => recipe.appliance))].sort();

    const ustensiles = [
      ...new Set(recipes.flatMap((recipe) => recipe.ustensils)),
    ].sort();


        return (
          <div className={styles["filter-bar"]}>
            <Tag
               label="Ingrédients"
               options={ingredients}
               onSelect={(value) => onFilterChange("ingredient", value)} /*Mise à jour du nombre de recettes*/
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

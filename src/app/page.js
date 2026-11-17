"use client"
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import FilterBar from "@/Components/FilterBar/FilterBar"
import CardRecette from "@/Components/CardRecette/CardRecette"
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function Home() {
    
  const [searchTerm, setSearchTerm] = useState(""); /*Recherche principale et par tags*/

  const [filters, setFilters] = useState({
  ingredient: "",
  appliance: "",
  utensil: "",
});   /*Recherche par Tag*/

  const updateFilter = (type, value) => {
    setFilters((current) => ({ ...current, [type]: value || "" }));
  }; /*type =filtre à modifier (ingredient, appareil ou ustensile), value=option reçue (voir FilterBar), ...current : recopie les filtres en conservant les 2 qui ne changent pas */

  const normalizedSearch = searchTerm.trim().toLowerCase(); /*trim : enlève espace au début et à la fin*/

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch  =
      !normalizedSearch || /*Accepte toute recette si la recherche est vide*/
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.description.toLowerCase().includes(normalizedSearch) ||
      recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(normalizedSearch)
      ); /*matchesSearch : Filtre  par rapport à la saisie en recherche principale dans le header.
      .filter examine chaque recette et crée un nouveau tableau avec celles qui satisfont les conditions en-dessous (chercher le texte saisi en recherche principale dans la liste des recettes)*/

    const matchesFilters = /*Vérifie si une recette correspond aux filtres sélectionnés*/
      (!filters.ingredient /*Aucun ingrédient n'est sélectionné*/||
        recipe.ingredients.some(
          (item) =>
            item.ingredient.toLowerCase() === filters.ingredient.toLowerCase()
        )) /*Vérifie si un ingrédient correspond au filtre*/
        &&
      (!filters.appliance ||
        recipe.appliance.toLowerCase() === filters.appliance.toLowerCase()) &&
      (!filters.utensil ||
        recipe.ustensils.some(
          (utensil) => utensil.toLowerCase() === filters.utensil.toLowerCase()
        ));
  /*matchesFilter : Filtre  par rapport aux Tags sélectionnés.*/

    return matchesSearch && matchesFilters;
  });
    
          
  return (
    <main>
     <Header onSearch={setSearchTerm}/> {/*Transmission de la prop onSearch à Header : voir Header.jsx*/}
        <FilterBar recipes={filteredRecipes}  onFilterChange={updateFilter} /*Transmission des props pour la liste filtrée : voir FilterBar*//>
        {filteredRecipes.length === 0 ? (
            
                <div className="message-recherche-infructueuse">
                {searchTerm
                  ? `Aucune recette ne contient ${searchTerm}, vous pouvez chercher «
                  tarte aux pommes », « poisson », etc.`
                  : "Aucune recette ne correspond aux filtres sélectionnés."}
            
            </div>
          
        ) : (
        <CardRecette recipes={filteredRecipes} />
        )} {/*prop filteredRecipes transmise à CardRecette*/}
     
     <Footer/>
  
  </main>
  );
}

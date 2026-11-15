"use client"
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import FilterBar from "@/Components/FilterBar/FilterBar"
import CardRecette from "@/Components/CardRecette/CardRecette"
import { useState } from "react";
import recipes from "@/data/recipes.json";

export default function Home() {
    
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
  ingredient: "",
  appliance: "",
  utensil: "",
});

  const updateFilter = (type, value) => {
    setFilters((current) => ({ ...current, [type]: value || "" }));
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      !normalizedSearch ||
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.description.toLowerCase().includes(normalizedSearch) ||
      recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(normalizedSearch)
      );

    const matchesFilters =
      (!filters.ingredient ||
        recipe.ingredients.some(
          (item) =>
            item.ingredient.toLowerCase() === filters.ingredient.toLowerCase()
        )) &&
      (!filters.appliance ||
        recipe.appliance.toLowerCase() === filters.appliance.toLowerCase()) &&
      (!filters.utensil ||
        recipe.ustensils.some(
          (utensil) => utensil.toLowerCase() === filters.utensil.toLowerCase()
        ));

    return matchesSearch && matchesFilters;
  });
    
      
    
  return (
    <main>
     <Header onSearch={setSearchTerm}/>
        <FilterBar recipes={filteredRecipes} /*Transmission de la liste filtrée*/ onFilterChange={updateFilter} />
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

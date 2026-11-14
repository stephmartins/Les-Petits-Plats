import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import FilterBar from "@/Components/FilterBar/FilterBar"
import CardRecette from "@/Components/CardRecette/CardRecette"
import { notFound } from "next/navigation";

export default function Home() {
    
  {/* Affiche la page 404 du segment si le slug ne correspond à aucune recette*/}
  if (!recette) {
    notFound();
  }
  
  return (
    <main>
     <Header/>
        <FilterBar/>
        <CardRecette/>
     <Footer/>
  </main>
  );
}

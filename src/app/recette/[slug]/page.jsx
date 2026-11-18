import { Suspense } from "react";
import HeaderSmall from "./HeaderSmall";
import Footer from "@/Components/Footer/Footer";
import recipes from "@/data/recipes.json";
import styles from "./page.module.css";
import { notFound } from "next/navigation";


/*Ajouté pour résoudre une erreur : pour ne pas attendre les params suite à l'exécution et éviter le blocage*/
export function generateStaticParams() {
  return recipes.map((recette) => ({ slug: recette.slug }));
}

export default function RecettePage({ params }) {
  return (
    <main className={styles.main}>
      <HeaderSmall />
        {/*Ajouté pour répondre à une erreur : chaque lien partage toujours le même préchargement et que seule la région encapsulée est chargée après la navigation.*/}
      <Suspense fallback={<p>Chargement de la recette...</p>}>
        <RecetteDetails params={params} />
      </Suspense>

      <Footer />
    </main>
  );
}

async function RecetteDetails({ params }) {
  const { slug } = await params;
  const recette = recipes.find((item) => item.slug === slug);

  {/* Affiche la page 404 (message d'erreur personnalisé) si le slug ne correspond à aucune recette*/}
  if (!recette) {
    notFound();
  }

  return (
    <div className={styles["conteneur-page-recette"]}>
      {/*Récupération du nom de fichier de l'image de la recette depuis le fichier JSON*/}
      <img
        src={`/images/JSON%20recipes/${recette.image}`}
        alt={recette.name}
        className={styles["recette-image"]}
      />

      <section className={styles["recette-content"]}>
        <div className={styles["titre-recette"]}>
          {/*Récupération du nom du restaurant depuis le fichier JSON et affichage du nom*/}
          <h2>{recette.name}</h2>
        </div>

        <div className={styles["sous-titre-temps"]}>
          <h3>TEMPS DE PRÉPARATION</h3>
          <span>{recette.time}min</span>
        </div>

        <div className={styles.ingredients}>
          <div className={styles["sous-titre-ingredients"]}>
            <h3>INGREDIENTS</h3>
          </div>
          <ul>
            {recette.ingredients.map((item, index) => (
              <li key={`${recette.id}-${index}`}>
                <span>{item.ingredient}</span>
                {(item.quantity != null || item.unit) && (
                  <span className={styles.quantite}>
                    {item.quantity}
                    {item.unit && ` ${item.unit}`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.ustensiles}>
          <div className={styles["sous-titre-ustensiles"]}>
            <h3>USTENSILES NÉCESSAIRES</h3>
          </div>
          <ul>
            {recette.ustensils.map((ustensile, index) => (
              <li key={`${recette.id}-${index}`}>
                <span>{ustensile}</span>
                <span className={styles.quantite}>1</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.appareils}>
          <div className={styles["sous-titre-appareils"]}>
            <h3>APPAREILS NÉCESSAIRES</h3>
          </div>
          <ul>
            <li>
              <span>{recette.appliance}</span>
              <span className={styles.quantite}>1</span>
            </li>
          </ul>
        </div>

        <div className={styles.description}>
          <div className={styles["sous-titre-description"]}>
            <h3>RECETTE</h3>
          </div>
          <p>{recette.description}</p>
        </div>
      </section>
    </div>
  );
}
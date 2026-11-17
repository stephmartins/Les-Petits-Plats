import styles from "./CardRecette.module.css";
import Link from "next/link";

export default function CardRecette({ recipes }) /*Prop récupérée : voir page.jsx*/
{
  return (
    <div className={styles["liste-recettes"]}>
      {recipes.map((recette) => (
        <article key={recette.id} className={styles["recette-card"]}>
          {/*Lien cliquable de la carte recette vers la page recette */}
            <Link href={`/recette/${recette.slug}`} className={styles["lien-recette"]}>

            <div className={styles["image-temps"]}>
              
                <img
                    src={`/images/JSON%20recipes/${recette.image}`} /*recette.image : ajoute le nom du fichier de la recette en cours (Recette01.jpg...)*/
                    alt={recette.name}
                    className={styles["recette-image"]}
                />
            <p className={styles.temps}>{recette.time}min</p>
          </div>

          <div className={styles["bloc-texte-recette"]}>
                <div className={styles["titre-recette"]}>
                      <h2>{recette.name}</h2>
                </div>

                <div className={styles["sous-titre-recette-ingredients"]}>
                      <h3>RECETTE</h3>
                </div>

                      <div className={styles.description}>
                            <p>{recette.description}</p>
                      </div>

                <div className={styles["sous-titre-recette-ingredients"]}>
                        <h3>INGRÉDIENTS</h3>
                </div>
                          
                      <div className={styles.ingredients}>
                            <ul>
                            {recette.ingredients.map((item, index) => (
                              <li key={`${recette.id}-${index}`}>
                                <span>{item.ingredient}</span>

                                {(item.quantity != null || item.unit) && (
                                  <span className={styles["quantite-ingredient"]}>
                                    {item.quantity}
                                    {item.unit && ` ${item.unit}`}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                          
                      </div>
                            
                </div>
             </Link>           
        </article>
        
      ))}
    
    </div>
  );
}

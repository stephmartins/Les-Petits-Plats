"use client";

import { useState } from "react";
import styles from "./Tag.module.css";

export default function Tag({ label, options, onSelect })/*Props récupérées de FilterBar*/ {
  const [search, setSearch] = useState(""); /*Recherche initialisée par un champ vide*/

  const [selectedOption, setSelectedOption] = useState(""); /*Pas d'option sélectionnée au départ*/

  const [isOpen, setIsOpen] = useState(false); /*Chevron vers le bas par défaut*/

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  ); /*Parcourt le tableau options (ingrédients, appareils ou ustensiles) et construit un nouveau tableau avec les éléments qui passent le test de .includes(...) : vérifie si le mot recherché est présent (résultat : true/false).*/

  return (
    <form onSubmit={(event) => event.preventDefault()}> {/*Empêche de recharger la page*/}
      <div
        className={`${styles["rectangle-recherche"]} ${
            isOpen ? styles["rectangle-recherche-open"] : ""
          } ${
            selectedOption && !isOpen
              ? styles["rectangle-recherche-selectionnee"] /*Fond jaune si mot sélectionné*/
              : ""
          }`}
        
      >
        <input
          type="text"
          aria-label={label} /*label : Ingrédients, appareils ou ustensiles*/
          placeholder={isOpen ? "" : label} /*Si on clique sur la flèche, le champ est vidé. Si rien n'a été saisi, on laisse apparaitre le nom de l'option à choisir : ingrédient, appareils ou ustensiles.*/
          value={search}
          onFocus={() => setIsOpen(true)} /*Champ de recherche déplié*/
          onChange={(event) => {
              if (selectedOption) {
                onSelect?.(null); /*Réinitialisation du filtre si l'utilisateur retape après avoir sélectionné un mot*/
              } /*Fonction onSelect reçue en Prop du composant Tag : voir FilterBar*/
              setSearch(event.target.value); /*Mise à jour de Search avec le texte saisi*/
              setSelectedOption(""); /*Efface l'option précédemment sélectionnée*/
            }}
           
        />

        <button /*Gestion des chevrons et de la croix*/
          type="button"
          className={styles.fleche}
          aria-expanded={isOpen}
          onClick={() => {
              if (selectedOption) {
                setSearch("");
                setSelectedOption("");
                setIsOpen(false);
                onSelect?.(null); /*lorsque la croix efface la sélection*/
              return;
              }

          setIsOpen((open) => !open);
        }}
        >
        
          <img
            src={
                isOpen
                  ? "/images/fleche-vers-haut.png"
                  : selectedOption
                    ? "/images/croix.png"
                    : "/images/fleche-vers-bas.png"
              }
            alt=""
          />
        </button>

        {/*Gestion de la liste affichée*/}
        {isOpen && (
          <ul className={styles["filtre-list"]}>
            {filteredOptions.map((option) => (
              <li 
                key={option}
                onClick={() => {
                    setSearch(option);
                    setSelectedOption(option); /*Option sélectionnée*/
                    setIsOpen(false); /*Ferme la liste si mot sélectionné*/
                    onSelect?.(option); /*Fonction onSelect appelée en transmettant l'option choisie : voir FilterBar*/
                }}
               >
                {option} {/*Affiche le texte de l'option dans la liste*/}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
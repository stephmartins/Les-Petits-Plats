"use client";

import { useState } from "react";
import styles from "./Filter.module.css";

export default function Tag({ label, options, onSelect }) {
  const [search, setSearch] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div
        className={`${styles["rectangle-recherche"]} ${
            isOpen ? styles["rectangle-recherche-open"] : ""
          } ${
            selectedOption && !isOpen
              ? styles["rectangle-recherche-selectionnee"]
              : ""
          }`}
        
      >
        <input
          type="text"
          aria-label={label}
          placeholder={isOpen ? "" : label}
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
              if (selectedOption) {
                onSelect?.(null); /*Réinitialisation du filtre si l'utilisateur retape après avoir sélectionné un mot*/
              }
              setSearch(event.target.value);
              setSelectedOption("");
            }}
           
        />

        <button
          type="button"
          className={styles.fleche}
          aria-expanded={isOpen}
          onClick={() => {
              if (selectedOption) {
                setSearch("");
                setSelectedOption("");
                setIsOpen(false);
                onSelect?.(null); /*lorsque la croix effece la sélection*/
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

        {isOpen && (
          <ul className={styles["filtre-list"]}>
            {filteredOptions.map((option) => (
              <li 
                key={option}
                onClick={() => {
                    setSearch(option);
                    setSelectedOption(option);
                    setIsOpen(false);
                    onSelect?.(option);
                }}
               >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
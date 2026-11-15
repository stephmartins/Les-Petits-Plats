import styles from "./Header.module.css";
import Link from "next/link";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

export default function Header({ onSearch }) {

  return (
    <header className={styles.header}>
      
          <h1><Logo/></h1>

          <h2 className={styles.title}> DÉCOUVREZ NOS RECETTES<br/>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES </h2>
          
          <SearchBar onSearch={onSearch}/>
          
    </header>
  );
}


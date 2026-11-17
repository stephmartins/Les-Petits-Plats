import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

{/*Prop onSearch définie dans page.jsx pour transmission par Header à SearchBar*/}
export default function Header({ onSearch }) {

  return (
    <header className={styles.header}>
      
          <h1><Logo/></h1>

          <h2 className={styles.title}> DÉCOUVREZ NOS RECETTES<br/>DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES </h2>
          
          <SearchBar onSearch={onSearch}/>
          
    </header>
  );
}


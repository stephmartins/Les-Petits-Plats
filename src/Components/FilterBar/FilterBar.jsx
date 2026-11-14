"use client";
import styles from "./FilterBar.module.css";
import Link from "next/link";
import { useState } from "react";
import Ingredients from "@/Components/FilterBar/Filter/Ingredients"
import Appareils from "@/Components/FilterBar/Filter/Appareils"
import Ustensiles from "@/Components/FilterBar/Filter/Ustensiles"

export default function FilterBar() {
   
        return (
          <div className={styles["filter-bar"]}>
         <Ingredients/>
         <Appareils/>
         <Ustensiles/>
         <div className={styles["recettes-50"]}>50 recettes</div>    
          </div>      
                    
  )
}
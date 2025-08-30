import { useState } from "react";
import styles from "./SearchBox.module.css";
import { useDispatch } from "react-redux";

import { setTitleFilter } from "../../redux/filters/slice";
import { fetchRecipes } from "../../redux/recipesList/operations";



export default function SearchBox() {
const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch(setTitleFilter(query)); 
    dispatch(fetchRecipes());       
  };



  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}
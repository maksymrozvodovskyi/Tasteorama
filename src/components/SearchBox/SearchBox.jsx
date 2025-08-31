import styles from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";

import { setSearchQuery, setTitleFilter } from "../../redux/filters/slice";
import { fetchRecipes } from "../../redux/recipesList/operations";
import { selectSearchQuery } from "../../redux/filters/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTitleFilter(query));
    dispatch(fetchRecipes());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Search recipes"
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

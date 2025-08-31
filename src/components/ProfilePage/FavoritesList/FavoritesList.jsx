import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteRecipes } from "../../../redux/recipes/operations.js";
import { selectFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import RecipeList from "../../RecipeList/RecipeList.jsx";
import styles from "./FavoritesList.module.css";
import {
  selectTotalRecipes,
  selectCurrentPage,
  selectTotalPages,
} from "../../../redux/recipesList/selectors.js";
import { nextPage } from "../../../redux/recipesList/slice";
import { clearFavitems, clearitems } from "../../../redux/recipesList/slice";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const total = useSelector(selectTotalRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(clearFavitems());
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  if (!Array.isArray(recipes) || recipes.length === 0)
    return <h3>No favorites</h3>;

  return (
    <div>
      <p className={styles.recipesCount}>{total} recipes</p>
      <RecipeList
        recipes={recipes}
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPage}
        fetchRecipes={fetchFavoriteRecipes}
      />
    </div>
  );
};

export default FavoritesList;

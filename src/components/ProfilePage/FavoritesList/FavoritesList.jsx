import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteRecipes } from "../../../redux/recipes/operations.js";
import { selectFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import RecipeList from "../../RecipeList/RecipeList.jsx";
import styles from "./FavoritesList.module.css";
import {
  selectTotalFavoritesRecipes,
  selectTotalPagesFavorites,
  selectCurrentPageFavorite,
} from "../../../redux/recipesList/selectors.js";
import { nextPageFavorite } from "../../../redux/recipesList/slice";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../../redux/recipesList/selectors.js";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const total = useSelector(selectTotalFavoritesRecipes);
  const currentPage = useSelector(selectCurrentPageFavorite); //
  const totalPages = useSelector(selectTotalPagesFavorites); //
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );

  useEffect(() => {
    // dispatch(clearFavitems());
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  return (
    <div>
      {total === 0 && !isLoadingFavoriteRecipes && <h3>No favorites</h3>}
      {total !== 0 && <p className={styles.recipesCount}>{total} recipes</p>}
      <RecipeList
        recipes={recipes}
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPageFavorite}
        fetchRecipes={fetchFavoriteRecipes}
      />
    </div>
  );
};

export default FavoritesList;

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
import { clearFavitems, clearitems } from "../../../redux/recipesList/slice";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const total = useSelector(selectTotalFavoritesRecipes);
  const currentPage = useSelector(selectCurrentPageFavorite);
  const totalPages = useSelector(selectTotalPagesFavorites);
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(clearitems());
    dispatch(clearFavitems());
    if (token) {
      dispatch(fetchFavoriteRecipes());
    }
  }, [dispatch, token]);

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
        mode={"favorites"}
      />
    </div>
  );
};

export default FavoritesList;

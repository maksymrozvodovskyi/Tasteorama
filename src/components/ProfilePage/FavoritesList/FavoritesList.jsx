import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteRecipes } from "../../../redux/recipes/operations.js";
import { selectFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import RecipeList from "../../RecipeList/RecipeList.jsx";
import styles from "./FavoritesList.module.css";
import {
  selectCurrentPage,
  selectTotalPages,
  selectTotalFavoritesRecipes,
} from "../../../redux/recipesList/selectors.js";
import { nextPage } from "../../../redux/recipesList/slice";
import { clearFavitems } from "../../../redux/recipesList/slice";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import Loader from "../../Loader/Loader.jsx";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const total = useSelector(selectTotalFavoritesRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );

  useEffect(() => {
    dispatch(clearFavitems());
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  // if (!Array.isArray(recipes) || recipes.length === 0)
  //   return <h3>No favorites</h3>;

  return (
    <div>
      {total === 0 && !isLoadingFavoriteRecipes && <h3>No favorites</h3>}
      {total !== 0 && <p className={styles.recipesCount}>{total} recipes</p>}
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

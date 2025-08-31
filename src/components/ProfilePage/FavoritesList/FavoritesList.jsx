import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteRecipes } from "../../../redux/recipes/operations.js";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import { selectFavoriteRecipes } from "../../../redux/recipesList/selectors.js";
import RecipeList from "../../RecipeList/RecipeList.jsx";
import Loader from "../../Loader/Loader";
import styles from "./FavoritesList.module.css";
import {
  selectTotalRecipes,
  selectCurrentPage,
  selectTotalPages,
} from "../../../redux/recipesList/selectors.js";
import { nextPage } from "../../../redux/recipesList/slice";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectFavoriteRecipes);
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );
  const total = useSelector(selectTotalRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  if (isLoadingFavoriteRecipes) return <Loader />;

  // if (recipes.length === 0) return <h3>No favorites recipes</h3>;
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

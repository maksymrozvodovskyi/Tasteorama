import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavoriteRecipes } from "../../../redux/favourite/operations.js";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../../redux/recipes/selectors";
import { selectRecipes } from "../../../redux/recipesList/selectors.js";

import RecipeList from "../MyRecipesList/MyRecipesList";
import Loader from "../../Loader/Loader";
import styles from "./FavoritesList.module.css";

const FavoritesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );

  useEffect(() => {
    dispatch(fetchFavoriteRecipes());
  }, [dispatch]);

  if (isLoadingFavoriteRecipes) return <Loader />;

  // if (recipes.length === 0) return <h3>No favorites recipes</h3>;
  if (!Array.isArray(recipes) || recipes.length === 0)
    return <h3>No favorites</h3>;

  return (
    <div>
      <p className={styles.recipesCount}>{recipes.length} recipes found</p>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default FavoritesList;

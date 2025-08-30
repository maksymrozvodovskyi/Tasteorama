import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOwnRecipes } from "../../../redux/recipes/operations";
import {
  selectOwnRecipes,
  selectRecipesIsLoadingOwnRecipes,
} from "../../../redux/recipesList/selectors";
import styles from "./MyRecipesList.module.css";
import RecipeList from "../../RecipeList/RecipeList";
import Loader from "../../Loader/Loader";

const MyRecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectOwnRecipes);

  const isLoadingOwnRecipes = useSelector(selectRecipesIsLoadingOwnRecipes);

  useEffect(() => {
    dispatch(fetchOwnRecipes());
  }, [dispatch]);

  if (isLoadingOwnRecipes) return <Loader />;

  if (!Array.isArray(recipes) || recipes.length === 0)
    return <h3>No own recipes</h3>;

  return (
    <div>
      <p className={styles.recipesCount}>{recipes.length} recipes</p>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default MyRecipesList;

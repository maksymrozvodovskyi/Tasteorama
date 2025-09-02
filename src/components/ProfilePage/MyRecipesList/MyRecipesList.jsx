import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnRecipes } from "../../../redux/recipes/operations";
import RecipeList from "../../RecipeList/RecipeList";
import Loader from "../../Loader/Loader";
import styles from "./MyRecipesList.module.css";

import {
  selectOwnRecipes,
  selectRecipesIsLoadingOwnRecipes,
  selectTotalOwn,
  selectTotalPagesOwn,
  selectCurrentPageOwn,
} from "../../../redux/recipesList/selectors";
import { nextPageOwn } from "../../../redux/recipesList/slice";

const MyRecipesList = () => {
  const dispatch = useDispatch();

  const recipes = useSelector(selectOwnRecipes);
  const total = useSelector(selectTotalOwn);
  const totalPages = useSelector(selectTotalPagesOwn);
  const currentPage = useSelector(selectCurrentPageOwn);
  const isLoading = useSelector(selectRecipesIsLoadingOwnRecipes);

  useEffect(() => {
    dispatch(fetchOwnRecipes());
  }, [dispatch]);

  return (
    <div>
      {total === 0 && !isLoading && <h3>No own recipes</h3>}
      {total !== 0 && <p className={styles.recipesCount}>{total} recipes</p>}
      <RecipeList
        recipes={recipes}
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPageOwn}
        fetchRecipes={fetchOwnRecipes}
        mode={"my"}
      />
    </div>
  );
};

export default MyRecipesList;

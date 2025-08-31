import { useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import RecipeCard from "../RecipeCard/RecipeCard";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../redux/recipesList/selectors.js";
import Loader from "../Loader/Loader";

const RecipesList = ({
  recipes,
  totalPages,
  currentPage,
  nextPage,
  fetchRecipes,
}) => {
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );

  return (
    <>
      <ul className={styles.list}>
        {Array.isArray(recipes) &&
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} mode="default" />
            </li>
          ))}
      </ul>
      {isLoadingFavoriteRecipes && <Loader />}
      {totalPages > 0 &&
        currentPage < totalPages &&
        !isLoadingFavoriteRecipes && (
          <LoadMoreBtn nextPage={nextPage} fetchAction={fetchRecipes} />
        )}
    </>
  );
};

export default RecipesList;

import { useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import RecipeCard from "../RecipeCard/RecipeCard";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../redux/recipesList/selectors.js";
import Loader from "../Loader/Loader";
import { useEffect, useRef } from "react";

const RecipesList = ({
  recipes,
  totalPages,
  currentPage,
  nextPage,
  fetchRecipes,
  mode,
}) => {
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );
  const listRef = useRef(null);

  useEffect(() => {
    if (currentPage > 1 && listRef.current) {
      const firstItem = listRef.current.firstElementChild;
      if (firstItem) {
        const { height } = firstItem.getBoundingClientRect();
        window.scrollBy({
          top: height * 2.8,
          behavior: "smooth",
        });
      }
    }
  }, [recipes, currentPage]);
  return (
    <>
      <ul className={styles.list} ref={listRef}>
        {Array.isArray(recipes) &&
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} mode={mode} />
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

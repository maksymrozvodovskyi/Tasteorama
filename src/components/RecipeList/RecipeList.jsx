import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
// import { fetchRecipes } from "../../redux/recipesList/operations";
// import { nextPage } from "../../redux/recipesList/slice";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import RecipeCard from "../RecipeCard/RecipeCard";
import { setAuthToken } from "../../services/favoritesAPI";
import { fetchFavorites } from "../../redux/favourite/operations";
import { selectRecipesIsLoadingFavoriteRecipes } from "../../redux/recipesList/selectors.js";
import Loader from "../Loader/Loader";

const RecipesList = ({
  recipes,
  totalPages,
  currentPage,
  nextPage,
  fetchRecipes,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const isLoadingFavoriteRecipes = useSelector(
    selectRecipesIsLoadingFavoriteRecipes
  );

  // const recipes = useSelector(selectRecipes);
  // const currentPage = useSelector(selectCurrentPage);
  // const totalPages = useSelector(selectTotalPages);

  console.log("Виклик тут", recipes);

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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
import {
  selectRecipes,
  selectTotalPages,
  selectCurrentPage,
} from "../../redux/recipesList/selectors";
import { fetchRecipes } from "../../redux/recipesList/operations";
import { nextPage } from "../../redux/recipesList/slice";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Filters from "../Filters/Filters";
import RecipeCard from "../RecipeCard/RecipeCard";
import { setAuthToken } from "../../services/favoritesAPI";
import { fetchFavorites } from "../../redux/favourite/operations";

const RecipesList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(fetchRecipes());

    if (token) {
      setAuthToken(token);
      dispatch(fetchFavorites());
    }
  }, [dispatch, token]);

  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  console.log("Виклик тут", recipes);

  if (recipes.length === 0) {
    return <p>No recipes found</p>; // тут треба викликати модалку "We’re sorry! We were not able to find a match."
  }

  return (
    <>
      <ul className={styles.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} mode="default" />
          </li>
        ))}
      </ul>
      {totalPages > 0 && currentPage < totalPages && (
        <LoadMoreBtn nextPage={nextPage} fetchAction={fetchRecipes} />
      )}
    </>
  );
};

export default RecipesList;

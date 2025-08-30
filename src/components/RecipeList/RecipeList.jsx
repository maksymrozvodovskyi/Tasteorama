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
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

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
      {totalPages > 0 && currentPage < totalPages && (
        <LoadMoreBtn nextPage={nextPage} fetchAction={fetchRecipes} />
      )}
    </>
  );
};

export default RecipesList;

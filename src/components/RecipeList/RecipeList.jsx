import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
import { selectRecipes } from "../../redux/recipesList/selectors";
import { fetchRecipes } from "../../redux/recipesList/operations";
import Filters from "../Filters/Filters";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  console.log(recipes);

  if (recipes.length === 0) {
    return <p>No recipes found</p>; // тут треба викликати модалку "We’re sorry! We were not able to find a match."
  }

  return (
    <>
      <ul className={styles.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {recipe.title}
            {/*<RecipeCard recipe={recipe} />*/}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipesList;

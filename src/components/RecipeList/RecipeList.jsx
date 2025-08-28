import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./RecipeList.module.css";
import { selectRecipes, selectTotalPages, selectCurrentPage } from "../../redux/recipesList/selectors";
import { fetchRecipes } from "../../redux/recipesList/operations";
import { nextPage } from "../../redux/recipesList/slice";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const RecipesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  console.log('Виклик тут', recipes);

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
      {totalPages>0 && currentPage<totalPages &&<LoadMoreBtn currentPage={currentPage} nextPage={nextPage} fetchAction={fetchRecipes} />}
    </>
  );
};

export default RecipesList;

import { useParams } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipeById } from "../../redux/recipes/operations.js";
import {
  selectRecipesError,
  selectRecipesIsLoadingCurrentRecipe,
} from "../../redux/recipes/selectors.js";
// import styles from "./RecipeViewPage.module.css";
import NotFound from "../../components/RecipeViewPage/NotFound/NotFound.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const RecipeDetails = lazy(() =>
  import("../../components/RecipeViewPage/RecipeDetails/RecipeDetails.jsx")
);

const RecipeViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const error = useSelector(selectRecipesError);
  const isLoading = useSelector(selectRecipesIsLoadingCurrentRecipe);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  if (error?.status === 404) return <NotFound />;

  return (
    <Suspense fallback={<Loader />}>
      <RecipeDetails />
    </Suspense>
  );
};

export default RecipeViewPage;

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipeById } from "../../redux/recipes/operations.js";
import {
  selectRecipesError,
  selectRecipesIsLoadingCurrentRecipe,
} from "../../redux/recipes/selectors.js";
import NotFound from "../../components/RecipeViewPage/NotFound/NotFound.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import RecipeDetails from "../../components/RecipeViewPage/RecipeDetails/RecipeDetails.jsx";

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

  return <RecipeDetails />;
};

export default RecipeViewPage;

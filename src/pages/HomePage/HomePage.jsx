import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/recipesList/operations";
import { setTitleFilter } from "../../redux/filters/slice";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectTotalPages,
  selectCurrentPage,
} from "../../redux/recipesList/selectors";
import { useEffect } from "react";
import { nextPage } from "../../redux/recipesList/slice";
import { setAuthToken } from "../../services/favoritesAPI";
import { fetchFavoriteRecipes } from "../../redux/recipes/operations.js";
import { clearitems } from "../../redux/recipesList/slice";
import { selectRecipesIsLoadingOwnRecipes } from "../../redux/recipesList/selectors";
import css from "../../styles/container.module.css";
import { lazy } from "react";

const Hero = lazy(() => import("../../components/Hero/Hero.jsx"));
const Filters = lazy(() => import("../../components/Filters/Filters"));
const RecipesList = lazy(() =>
  import("../../components/RecipeList/RecipeList")
);

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const token = useSelector((state) => state.auth.accessToken);
  const loader = useSelector(selectRecipesIsLoadingOwnRecipes);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(clearitems());
      await dispatch(fetchRecipes());
      if (token) {
        await setAuthToken(token);
        await dispatch(fetchFavoriteRecipes());
      }
    };
    fetchData();
  }, [token, dispatch]);

  const handleSearch = (query) => {
    dispatch(setTitleFilter(query));
    dispatch(fetchRecipes());
  };

  return (
    <section>
      <Hero onSearch={handleSearch} />
      <div className={css.containerFilterRecList}>
        <Filters />
        {!loader && (
          <RecipesList
            recipes={recipes}
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={nextPage}
            fetchRecipes={fetchRecipes}
            mode={"default"}
          />
        )}
      </div>
    </section>
  );
}

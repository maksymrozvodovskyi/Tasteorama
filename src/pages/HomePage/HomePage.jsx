import Hero from "../../components/Hero/Hero.jsx";
import { useDispatch } from "react-redux";
import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipeList/RecipeList";
import { fetchRecipes } from "../../redux/recipesList/operations";
import { setTitleFilter } from "../../redux/filters/slice";
import css from "../../styles/container.module.css";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectTotalPages,
  selectCurrentPage,
} from "../../redux/recipesList/selectors";
import { useEffect } from "react";
import { nextPage } from "../../redux/recipesList/slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  console.log("recipes", recipes);
  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch(setTitleFilter(query));
    dispatch(fetchRecipes());
  };

  return (
    <div className={css.container}>
      <Hero onSearch={handleSearch} />
      <Filters />
      <RecipesList
        recipes={recipes}
        totalPages={totalPages}
        currentPage={currentPage}
        nextPage={nextPage}
        fetchRecipes={fetchRecipes}
      />
    </div>
  );
}

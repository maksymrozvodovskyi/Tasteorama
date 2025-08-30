import Hero from "../../components/Hero/Hero.jsx";

import { useDispatch } from "react-redux";

import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipeList/RecipeList";
import { fetchRecipes } from "../../redux/recipesList/operations";

import { setTitleFilter } from "../../redux/filters/slice";

import css from "../../styles/container.module.css";

export default function HomePage() {
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(setTitleFilter(query));
    dispatch(fetchRecipes());
  };

  return (
    <div className={css.container}>
      <Hero onSearch={handleSearch} />
      <Filters />
      <RecipesList />
    </div>
  );
}

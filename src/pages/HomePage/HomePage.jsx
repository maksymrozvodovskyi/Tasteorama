import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipeList/recipeList";
import css from "../../styles/container.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1>HomePage</h1>
      <Filters />
      <RecipesList />
    </div>
  );
}

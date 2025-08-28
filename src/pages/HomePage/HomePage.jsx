import Filters from "../../components/Filters/Filters";
import RecipesList from "../../components/RecipeList/RecipeList";

export default function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <h2>Recipes</h2>
      <Filters />
      <RecipesList />
    </>
  );
}

import FavoritesList from "../../components/ProfilePage/FavoritesList/FavoritesList";
import MyRecipesList from "../../components/ProfilePage/MyRecipesList/MyRecipesList";

export default function MyRecipesPage() {
  return (
    <>
      <h1>MyRecipesPage</h1>
      <MyRecipesList />
      <FavoritesList />
    </>
  );
}

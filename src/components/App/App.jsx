import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RecipeDetailsPage from "../../pages/RecipeDetailsPage/RecipeDetailsPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import MyRecipesPage from "../../pages/MyRecipesPage/MyRecipesPage";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage";
import RecipePage from "../../pages/RecipePage/RecipePage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recipes" element={<RecipePage />} />
      <Route path="/recipes/:id" element={<RecipeDetailsPage />} />

      {/* приватні роути */}
      <Route path="/my-recipes" element={<MyRecipesPage />} />
      <Route path="/add-recipe" element={<AddRecipePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      {/* ерор пейдж 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

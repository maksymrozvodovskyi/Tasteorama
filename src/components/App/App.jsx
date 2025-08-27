import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import MyRecipesPage from "../../pages/MyRecipesPage/MyRecipesPage";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage";
import RecipePage from "../../pages/RecipePage/RecipePage";
// import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />

        {/* приватні роути */}
        <Route path="/my-recipes" element={<MyRecipesPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* ерор пейдж 404 */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

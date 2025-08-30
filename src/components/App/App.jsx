import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import ProfilePage from "../../pages/MyRecipesPage/MyRecipesPage";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage";
import RecipePage from "../../pages/RecipePage/RecipePage";
import Footer from "../Footer/Footer";
import NotFound from "../RecipeViewPage/NotFound/NotFound";
import ModalAuthentication from "../ModalAuthentication/ModalAuthentication";
import Header from "../Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<RecipeViewPage />} />

        {/* приватні роути */}
        <Route path="/my-recipes" element={<ProfilePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* ерор пейдж 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

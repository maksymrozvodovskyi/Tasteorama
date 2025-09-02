import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "../../styles/container.module.css";

import HomePage from "../../pages/HomePage/HomePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RecipeViewPage from "../../pages/RecipeViewPage/RecipeViewPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import ProfilePage from "../../pages/MyRecipesPage/MyRecipesPage";
import AddRecipePage from "../../pages/AddRecipePage/AddRecipePage";

import NotFound from "../RecipeViewPage/NotFound/NotFound";
import ProfileTabs from "../../components/ProfilePage/PrifileTabs/ProfileTabs";

function App() {
  return (
    <div className={css.appWrapper}>
      <Header />
      <div className={css.pageContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />

          {/* приватні роути */}
          <Route path="/my-recipes" element={<ProfilePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile/:recipeType" element={<ProfileTabs />} />

          {/* ерор пейдж 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

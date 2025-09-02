import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import css from "../../styles/container.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() =>
  import("../../pages/RegisterPage/RegisterPage")
);
const RecipeViewPage = lazy(() =>
  import("../../pages/RecipeViewPage/RecipeViewPage")
);
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage")
);
const ProfilePage = lazy(() =>
  import("../../pages/MyRecipesPage/MyRecipesPage")
);
const AddRecipePage = lazy(() =>
  import("../../pages/AddRecipePage/AddRecipePage")
);

const NotFound = lazy(() => import("../RecipeViewPage/NotFound/NotFound"));
const ProfileTabs = lazy(() =>
  import("../../components/ProfilePage/PrifileTabs/ProfileTabs")
);

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      <Footer />
    </>
  );
}

export default App;

import { useState } from "react";
import Hero from "../../components/Hero/Hero.jsx";
// import RecipeList from "../components/RecipeList/RecipeList";
// import { fetchRecipes } from "../services/api";
// import toast from "react-hot-toast";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query, filters) => {
  //   if (!query.trim()) {
  //     toast.error("Введіть назву рецепту!");
  //     return;
  //   }

  //   try {
  //     const data = await fetchRecipes(query, filters);

  //     if (data.length === 0) {
  //       setRecipes([]);
  //       toast("Рецептів за цим запитом не знайдено!");
  //       return;
  //     }

  //     setRecipes(data);
  //   } catch (error) {
  //     toast.error("Сталася помилка при завантаженні рецептів.");
  //   }
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      {/* <RecipeList recipes={recipes} /> */}
    </>
  );
}
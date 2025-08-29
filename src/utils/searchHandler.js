import toast from "react-hot-toast";
import { fetchRecipes } from "../redux/recipesList/operations";

export const handleRecipeSearch = (query, filters, dispatch) => {
  if (!query.trim()) {
    toast.error("Please enter a recipe name!");
    return;
  }

  const searchFilters = {
    title: query,
    category: filters?.category || "",
    ingredients: filters?.ingredients || [],
  };

  dispatch(fetchRecipes(searchFilters))
    .unwrap()
    .then((data) => {
      if (data.recipes?.length === 0) {
        toast("No recipes found for this query!");
      }
    })
    .catch(() => {
      toast.error("An error occurred while loading recipes.");
    });
};

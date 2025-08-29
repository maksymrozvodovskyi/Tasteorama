import axios from "axios";

export const fetchRecipes = async (query, filters) => {
  const params = {};

  if (query) params.search = query;
  if (filters?.category) params.category = filters.category;
  if (filters?.ingredient) params.ingredient = filters.ingredient;

  const { data } = await axios.get("https://tasteoramaapi.onrender.com/api/recipes", { params });

  return data;
};

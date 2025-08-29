import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import filterReducer from "../redux/filters/slice";
import recipesSlice from "./recipesList/slice.js";
import categoriesReducer from "./categories/slice.js";
import ingredientsReducer from "./ingredients/slice.js";
import favReducer from "../redux/favourite/slice";
import searchResultsReducer from "./searchResults/slice";



export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    filters: filterReducer,
    auth: authReducer,
    recipes: recipesSlice, 
    favorites: favReducer,
    searchResults: searchResultsReducer,

  },
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import recipesSlice from "./recipesList/slice.js";
import addRecipeReducer from "./addRecipe/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesSlice,
    addRecipe: addRecipeReducer,
  },
});

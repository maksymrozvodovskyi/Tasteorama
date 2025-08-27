import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
<<<<<<< HEAD
import addRecipeReducer from "./addRecipe/slice";
=======
import recipesSlice from "./recipesList/slice.js";
>>>>>>> main

export const store = configureStore({
  reducer: {
    auth: authReducer,
<<<<<<< HEAD
    addRecipe: addRecipeReducer,
=======
    recipes: recipesSlice, 
>>>>>>> main
  },
});

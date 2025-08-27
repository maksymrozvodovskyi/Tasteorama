import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import recipesReducer from "./recipes/slice.js";
import ingredientsReducer from "./ingredients/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
});

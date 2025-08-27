import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import filterReducer from "../redux/filters/slice";
import recipesSlice from "./recipesList/slice.js";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
    recipes: recipesSlice,
  },
});

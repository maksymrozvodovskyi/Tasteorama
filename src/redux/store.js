import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import addRecipeReducer from "./addRecipe/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addRecipe: addRecipeReducer,
  },
});

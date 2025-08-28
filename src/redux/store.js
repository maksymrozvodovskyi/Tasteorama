import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import filterReducer from "../redux/filters/slice";
import recipesSlice from "./recipesList/slice.js";
import categoriesReducer from "./categories/slice.js";
import ingredientsReducer from "./ingredients/slice.js";
import favReducer from "../redux/favourite/slice";
import recipesReducer from "./addRecipe/slice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "accessToken",
  storage,
  whitelist: ["accessToken"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recipes: recipesSlice,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    filters: filterReducer,
    favorites: favReducer,
    addRecipe: recipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

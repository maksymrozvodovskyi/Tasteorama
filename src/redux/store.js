import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import recipesSlice from "./recipesList/slice.js";

import { persistStore, persistReducer } from "redux-persist";
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
  },
});

export const persistor = persistStore(store);
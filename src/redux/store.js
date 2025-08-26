import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import favReducer from "../redux/favourite/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favReducer,
  },
});

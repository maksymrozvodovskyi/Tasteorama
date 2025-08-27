import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice";
import filterReducer from "../redux/filters/slice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
  },
});

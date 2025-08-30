import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../services/favoritesAPI";

// Додати улюблене
export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (id, thunkAPI) => {
    try {
      const result = await addToFavorites(id);
      return result;
    } catch (err) {
      console.error(
        "addFavorite failed:",
        err.response?.status,
        err.response?.data || err.message
      );
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

// Видалити з улюблених
export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (id, thunkAPI) => {
    try {
      const result = await removeFromFavorites(id);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

// Отримати всі улюблені рецепти
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await getFavorites();
      console.log(res);
      return res.data.data.recipes;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

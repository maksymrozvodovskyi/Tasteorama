import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../../services/favoritesAPI";

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (id, thunkAPI) => {
    try {
      const result = await addToFavorites(id);
      return result;
    } catch (err) {
      console.error("addFavorite failed:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

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

export const fetchFavoriteRecipes = createAsyncThunk(
  "favorites/fetch",
  async (_, thunkAPI) => {
    try {
      return await fetchFavorites();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

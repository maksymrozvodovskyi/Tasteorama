import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (recipeId, thunkAPI) => {
    try {
      const data = await axios.get(`/api/recipes/${recipeId}`);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const { currentPageOwn } = state.recipes;

      if (!token) {
        return thunkAPI.rejectWithValue("No access token");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: currentPageOwn },
      };

      const { data } = await axios.get("/api/recipes/own", config);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const { currentPageFavorite } = state.recipes;

      if (!token) {
        return thunkAPI.rejectWithValue("No access token");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: currentPageFavorite },
      };

      const { data } = await axios.get("/api/recipes/favorites", config);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const fetchAddRecipesToFavorite = createAsyncThunk(
  "recipes/fetchAddRecipesToFavorite",
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await axios.post("/recipes/favorites", { recipeId });
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchDeleteRecipesFromFavorite = createAsyncThunk(
  "recipes/fetchDeleteRecipesFromFavorite",
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/recipes/favorites/${recipeId}`);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

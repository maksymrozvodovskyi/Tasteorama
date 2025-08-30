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

export const fetchAddRecipesToFavorite = createAsyncThunk();
export const fetchDeleteRecipesFromFavorite = createAsyncThunk();

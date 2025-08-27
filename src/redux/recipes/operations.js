import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiBack } from "../../api/api.js";

export const fetchRecipesById = createAsyncThunk(
  "recipes/fetchRecipesById",
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await apiBack.get(`/recipes/${recipeId}`);
      return data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchAddRecipesToFavorite = createAsyncThunk();
export const fetchDeleteRecipesFromFavorite = createAsyncThunk();

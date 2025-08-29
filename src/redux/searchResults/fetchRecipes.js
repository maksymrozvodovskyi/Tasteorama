import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes } from "../../services/searchApi";

export const fetchRecipesThunk = createAsyncThunk(
  "searchResults/fetchRecipes",
  async ({ query }, thunkAPI) => {
    try {
      const data = await fetchRecipes(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


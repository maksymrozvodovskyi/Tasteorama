import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";
export const fetchRecipes = createAsyncThunk(
  "/recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { currentPage } = state.recipes;
      const { title, category, ingredients } = state.filters;
      let query = "/api/recipes?";

      if (ingredients && ingredients.length > 0) {
        query += `ingredients=`;
        ingredients.forEach((ingredient) => {
          query += `${ingredient},`;
        });
      }

      const response = await axios.get(query.slice(0, -1), {
        params: {
          perPage: 12,
          page: currentPage,
          ...(title.trim() && { title }),
          category: category,
        },
      });
    

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

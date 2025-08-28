import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";
export const fetchRecipes = createAsyncThunk(
  "/recipes/fetchAll",
  async (filters, thunkAPI) => {
    try {
      if (
        filters &&
        (filters.title || filters.category || filters.ingredients.length > 0)
      ) {
        const { title, category, ingredients } = filters;
        let query = "/api/recipes?";
        if (title) {
          query += `title=${title}&`;
        }
        if (category) {
          query += `category=${category}&`;
        }
        if (ingredients && ingredients.length > 0) {
          ingredients.forEach((ingredient) => {
            query += `ingredients=${ingredient}&`;
          });
        }
        const response = await axios.get(query.slice(0, -1));
        return response.data.data;
      }
      const response = await axios.get("/api/recipes");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

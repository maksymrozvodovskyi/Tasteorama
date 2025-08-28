import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";
export const fetchRecipes = createAsyncThunk(
  "/recipes/fetchAll",
  async (currentPage, thunkAPI) => {
    try {
      const response = await axios.get("/api/recipes",{
        params: {
          perPage: 12,
          page: currentPage
        }
    });
      console.log("recipes from backend:", response.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

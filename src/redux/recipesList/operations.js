import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";
export const fetchRecipes = createAsyncThunk(
  "/recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/recipes");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

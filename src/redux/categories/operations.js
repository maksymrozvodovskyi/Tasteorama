import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://tasteoramaapi.onrender.com";

export const fetchCategories = createAsyncThunk(
  "/categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

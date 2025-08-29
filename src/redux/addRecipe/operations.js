import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addRecipe = createAsyncThunk(
  "addRecipe/add",
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const accessToken = state.auth.accessToken;

      const res = await axios.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://tasteoramaapi.onrender.com/ingredients");
      if (!res.ok) throw new Error("Failed to fetch ingredients");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

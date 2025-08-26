import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToFavorites, removeFromFavorites } from "../../services/favoritesAPI";

export const addFavorite = createAsyncThunk("favorites/add", async (id, thunkAPI) => {
  try {
    const result = await addToFavorites(id);
    return result; // або return id
  } catch (err) {
    console.error("addFavorite failed:", err.response?.data || err.message);
    return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
  }
});


export const removeFavorite = createAsyncThunk("favorites/remove",
    async (id) => {
        await removeFromFavorites(id);
        return id;
    }
);
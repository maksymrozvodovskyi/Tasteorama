import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { addToFavorites, getFavorites, removeFromFavorites } from "../../services/favoritesAPI";
=======
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../../services/favoritesAPI";
>>>>>>> main

// Додати улюблене
export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (id, thunkAPI) => {
<<<<<<< HEAD
  try {
    const result = await addToFavorites(id);
    return result; 
  } catch (err) {
  console.error("addFavorite failed:", err.response?.status, err.response?.data || err.message);
  return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
}
});

=======
    try {
      const result = await addToFavorites(id);
      return result;
    } catch (err) {
      console.error(
        "addFavorite failed:",
        err.response?.status,
        err.response?.data || err.message
      );
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);
>>>>>>> main

// Видалити з улюблених
export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (id, thunkAPI) => {
    try {
      const result = await removeFromFavorites(id);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
<<<<<<< HEAD
);

=======
  }
);

// Отримати всі улюблені рецепти
>>>>>>> main
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await getFavorites();
<<<<<<< HEAD
=======
      console.log(res);
>>>>>>> main
      return res.data.data.recipes;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
    }
  }
<<<<<<< HEAD
);
=======
);
>>>>>>> main

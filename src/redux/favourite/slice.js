import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, fetchFavorites, removeFavorite } from "./operations";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (action.payload.favoritesRecipes) {
          const unique = [
            ...new Map(
              action.payload.favoritesRecipes.map((item) => [item._id, item])
            ).values(),
          ];
          state.items = unique;
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      .addCase(addFavorite.rejected, (state, action) => {
        console.error("addFavorite rejected:", action.payload);
      });
  },
});

export default favoriteSlice.reducer;

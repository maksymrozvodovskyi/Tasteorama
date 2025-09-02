import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./operations";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.items = action.payload || [];
    });
  },
});

export default favoriteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const initialState = {
  items: [],
  total: 0,
  loading: true,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.recipes;
        state.total = action.payload.totalResults;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default recipesSlice.reducer;

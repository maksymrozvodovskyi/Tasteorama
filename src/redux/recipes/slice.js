import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipeById } from "./operations.js";

import { handleError } from "../../utils/reduxUtils.js";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    currentRecipe: null,
    isLoadingCurrentRecipe: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.error = null;
        state.isLoadingCurrentRecipe = true;
      })
      .addCase(fetchRecipeById.fulfilled, (state, { payload }) => {
        state.error = null;
        state.currentRecipe = payload;
        state.isLoadingCurrentRecipe = false;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoadingCurrentRecipe = false;
        handleError(state, action);
      }),
});

export default recipesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { fetchRecipesById } from "./operations.js";

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
      .addCase(fetchRecipesById.pending, (state) => {
        state.error = null;
        state.isLoadingCurrentRecipe = true;
      })
      .addCase(fetchRecipesById.fulfilled, (state, { payload }) => {
        state.error = null;
        state.currentRecipe = payload;
        state.isLoadingCurrentRecipe = false;
      })
      .addCase(fetchRecipesById.rejected, (state, action) => {
        state.isLoadingCurrentRecipe = false;
        handleError(state, action);
      }),
});

export default recipesSlice.reducer;

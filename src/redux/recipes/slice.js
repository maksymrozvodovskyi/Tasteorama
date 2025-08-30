import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipeById,
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from "./operations.js";
import { handleError } from "../../utils/reduxUtils.js";

const recipesSliceById = createSlice({
  name: "recipes",
  initialState: {
    currentRecipe: null,
    isLoadingCurrentRecipe: false,
    isLoadingFavoriteRecipes: false,
    isLoadingOwnRecipes: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.error = null;
        state.isLoadingCurrentRecipe = true;
      })
      .addCase(fetchRecipeById.fulfilled, (state, { payload }) => {
        state.error = null;
        state.currentRecipe = payload.data;
        state.isLoadingCurrentRecipe = false;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoadingCurrentRecipe = false;
        handleError(state, action);
      })

      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.error = null;
        state.isLoadingFavoriteRecipes = true;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = payload;
        state.isLoadingFavoriteRecipes = false;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, action) => {
        state.isLoadingFavoriteRecipes = false;
        handleError(state, action);
      })

      .addCase(fetchOwnRecipes.pending, (state) => {
        state.error = null;
        state.isLoadingOwnRecipes = true;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = payload.data;
        state.page = payload.page;
        state.perPage = payload.perPage;
        state.totalItems = payload.totalItems;
        state.totalPages = payload.totalPages;
        state.isLoadingOwnRecipes = false;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.isLoadingOwnRecipes = false;
        handleError(state, action);
      }),
});

export default recipesSliceById.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";
import {
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from "../recipes/operations.js";
import { handleError } from "../../utils/reduxUtils.js";

const initialState = {
  ownItems: [],
  favoriteItems: [],
  items: [],
  total: 0,
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: null,
  isLoadingFavoriteRecipes: false,
  isLoadingOwnRecipes: false,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    clearitems: (state) => {
      state.items = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.currentPage > 1) {
          state.items = [...state.items, ...action.payload.recipes];
        } else {
          state.items = action.payload.recipes;
        }
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.totalResults;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.error = null;
        state.isLoadingFavoriteRecipes = true;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoadingFavoriteRecipes = false;
        if (state.currentPage > 1) {
          state.favoriteItems = [...state.favoriteItems, ...payload.recipes];
        } else {
          state.favoriteItems = payload.recipes;
        }
        state.totalPages = payload.totalPages;
        state.total = payload.totalResults;
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
        state.ownItems = payload.data?.recipes || payload; // записуємо у ownItems
        state.page = payload.page;
        state.perPage = payload.perPage;
        state.totalItems = payload.totalItems;
        state.totalPages = payload.totalPages;
        state.isLoadingOwnRecipes = false;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.isLoadingOwnRecipes = false;
        handleError(state, action);
      });
  },
});
export const { nextPage, clearitems } = recipesSlice.actions;
export default recipesSlice.reducer;

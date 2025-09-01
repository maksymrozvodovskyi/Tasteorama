import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";
import {
  fetchFavoriteRecipes,
  fetchOwnRecipes,
} from "../recipes/operations.js";
import { handleError } from "../../utils/reduxUtils.js";
import { removeFavorite, addFavorite } from "../favourite/operations.js";

const initialState = {
  ownItems: [],
  favoriteItems: [],
  items: [],

  total: 0,
  totalFavorites: 0,
  totalOwn: 0,

  loading: true,
  error: null,

  currentPage: 1,
  currentPageFavorite: 1,
  currentPageOwn: 1,

  totalPages: null,
  totalPagesFavorite: null,
  totalPagesOwn: null,

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
    nextPageFavorite: (state) => {
      state.currentPageFavorite += 1;
    },
    nextPageOwn: (state) => {
      state.currentPageOwn += 1;
    },
    clearitems: (state) => {
      state.items = [];
      state.currentPage = 1;
    },
    clearFavitems: (state) => {
      state.favoriteItems = [];
      state.currentPageFavorite = 1;
    },
    clearFavOwn: (state) => {
      state.favoriteItems = [];
      state.currentPageOwn = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoadingFavoriteRecipes = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoadingFavoriteRecipes = false;
        state.error = null;
        if (state.currentPage > 1) {
          const newRecipes = action.payload.recipes.filter(
            (r) => !state.items.some((item) => item._id === r._id)
          );
          state.items = [...state.items, ...newRecipes];
        } else {
          state.items = action.payload.recipes;
        }
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.totalResults;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.isLoadingFavoriteRecipes = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.error = null;
        state.isLoadingFavoriteRecipes = true;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoadingFavoriteRecipes = false;
        if (state.currentPageFavorite > 1) {
          const newRecipes = payload.recipes.filter(
            (r) => !state.favoriteItems.some((item) => item._id === r._id)
          );
          state.favoriteItems = [...state.favoriteItems, ...newRecipes];
        } else {
          state.favoriteItems = payload.recipes;
        }
        state.totalPagesFavorite = payload.totalPages;
        state.totalFavorites = payload.totalResults;
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
        state.isLoadingOwnRecipes = false;
        if (state.currentPageOwn > 1) {
          const newRecipes = payload.recipes.filter(
            (r) => !state.ownItems.some((item) => item._id === r._id)
          );
          state.ownItems = [...state.ownItems, ...newRecipes];
        } else {
          state.ownItems = payload.recipes;
        }
        state.totalPagesOwn = payload.totalPages;
        state.totalOwn = payload.totalResults;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.isLoadingOwnRecipes = false;
        handleError(state, action);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteItems = state.favoriteItems.filter(
          (favoriteItem) => favoriteItem._id !== action.meta.arg
        );
        state.totalFavorites = state.totalFavorites - 1;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        console.error("addFavorite rejected:", action.payload);
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (action.payload.favoritesRecipes) {
          const unique = [
            ...new Map(
              action.payload.favoritesRecipes.map((item) => [item._id, item])
            ).values(),
          ];
          state.favoriteItems = unique;
        }
      });
  },
});

export const {
  nextPage,
  clearitems,
  clearFavitems,
  nextPageFavorite,
  nextPageOwn,
  clearFavOwn,
} = recipesSlice.actions;
export default recipesSlice.reducer;

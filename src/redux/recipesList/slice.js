import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const initialState = {
  items: [],
  total: 0,
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: null,
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
      });
  },
});
export const { nextPage, clearitems } = recipesSlice.actions;
export default recipesSlice.reducer;

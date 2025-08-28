import {createSlice, current}  from '@reduxjs/toolkit';
import { fetchRecipes } from './operations';

const initialState = {
    items: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: null
};

const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    }
  },
   extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending,(state) => {
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
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
   }

});
export const { nextPage } = recipesSlice.actions;
export default recipesSlice.reducer;

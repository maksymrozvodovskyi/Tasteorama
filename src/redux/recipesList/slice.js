import {createSlice}  from '@reduxjs/toolkit';
import { fetchRecipes } from './operations';

const initialState = {
    items: [],
    loading: true,
    error: null
};

const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending,(state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
   }

});

export default recipesSlice.reducer;

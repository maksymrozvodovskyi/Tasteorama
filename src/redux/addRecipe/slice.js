import { createSlice } from "@reduxjs/toolkit";
import { addRecipe } from "./operations.js";

const addRecipeSlice = createSlice({
  name: "addRecipe",
  initialState: {
    recipe: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload; // тут буде новий рецепт з бекенду
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addRecipeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesThunk } from "../searchResults/fetchRecipes";



const initialState = {
  results: [],
  isLoading: false,
  error: null,
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipesThunk.fulfilled, (state, action) => {
        console.log("📦 Payload у slice:", action.payload);
        state.isLoading = false;
        state.results = action.payload.data.recipes;
      })
      .addCase(fetchRecipesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
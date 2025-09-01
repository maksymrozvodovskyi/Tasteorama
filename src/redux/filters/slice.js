import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    title: "",
    category: "",
    ingredients: [],
    searchQuery: "",
    loading: false,
    error: null,
  },
  reducers: {
    setTitleFilter(state, action) {
      state.title = action.payload;
    },
    setCategoryFilter(state, action) {
      state.category = action.payload;
    },
    setIngredientsFilter(state, action) {
      state.ingredients = action.payload;
    },
    resetFilters(state) {
      state.title = "";
      state.category = "";
      state.ingredients = [];
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setTitleFilter,
  setCategoryFilter,
  setIngredientsFilter,
  resetFilters,
  setSearchQuery,
} = slice.actions;

export default slice.reducer;

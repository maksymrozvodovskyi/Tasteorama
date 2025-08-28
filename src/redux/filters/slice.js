import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    title: "",
    category: "",
    ingredients: [],
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
  },
});

export const {
  setTitleFilter,
  setCategoryFilter,
  setIngredientsFilter,
  resetFilters,
} = slice.actions;

export default slice.reducer;

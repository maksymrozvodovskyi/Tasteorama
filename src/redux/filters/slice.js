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
});

export default slice.reducer;

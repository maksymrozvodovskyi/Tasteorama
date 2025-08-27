import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    title: "",
    category: "",
    ingredients: [],
  },
});

export default slice.reducer;

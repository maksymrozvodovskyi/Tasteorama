import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite } from "./operations";

const favoriteSlice = createSlice({
    name: "favoutires",
    initialState: {
        items: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.fulfilled, (state, action) => {
                    state.items.push(action.payload);
            })
            .addCase(addFavorite.rejected, (state, action) => {
                    console.error("addFavorite rejected:", action.payload);
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter((fav) => fav !== action.payload);
            });
    },
});

export default favoriteSlice.reducer;
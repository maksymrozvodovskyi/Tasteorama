import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite } from "./operations";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.fulfilled, (state, action) => {
                    state.items = action.payload.favoritesRecipes;
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.items = action.payload.favoritesRecipes;
            })
            .addCase(addFavorite.rejected, (state, action) => {
                    console.error("addFavorite rejected:", action.payload);
            });
    },
});

export default favoriteSlice.reducer;
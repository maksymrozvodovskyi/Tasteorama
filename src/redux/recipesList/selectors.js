export const selectRecipes = (state) => state.recipes.items;

export const selectCurrentPage = (state) => state.recipes.currentPage;

export const selectTotalPages = (state) => state.recipes.totalPages;

export const selectTotalRecipes = (state) => state.recipes.total;
export const selectTotalFavoritesRecipes = (state) =>
  state.recipes.totalFavorites;

//
export const selectRecipesIsLoadingOwnRecipes = (state) =>
  state.recipes.isLoadingOwnRecipes;

export const selectRecipesIsLoadingFavoriteRecipes = (state) =>
  state.recipes.isLoadingFavoriteRecipes;

export const selectOwnRecipes = (state) => state.recipes.ownItems;
export const selectFavoriteRecipes = (state) => state.recipes.favoriteItems;

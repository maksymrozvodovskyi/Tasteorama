export const selectRecipes = (state) => state.recipes.items;

export const selectCurrentPage = (state) => state.recipes.currentPage;
export const selectCurrentPageFavorite = (state) =>
  state.recipes.currentPageFavorite;
export const selectCurrentPageOwn = (state) => state.recipes.currentPageOwn;

export const selectTotalPages = (state) => state.recipes.totalPages;
export const selectTotalPagesFavorites = (state) =>
  state.recipes.totalPagesFavorite;
export const selectTotalPagesOwn = (state) => state.recipes.totalPagesOwn;

export const selectTotalRecipes = (state) => state.recipes.total;
export const selectTotalFavoritesRecipes = (state) =>
  state.recipes.totalFavorites;
export const selectTotalOwn = (state) => state.recipes.totalOwn;

export const selectRecipesIsLoadingOwnRecipes = (state) =>
  state.recipes.isLoadingOwnRecipes;

export const selectRecipesIsLoadingFavoriteRecipes = (state) =>
  state.recipes.isLoadingFavoriteRecipes;

export const selectOwnRecipes = (state) => state.recipes.ownItems;
export const selectFavoriteRecipes = (state) => state.recipes.favoriteItems;

export const selectRecipesItems = (state) => state.recipesSliceById.items;
export const selectCurrentRecipes = (state) =>
  state.recipesSliceById.currentRecipe;

export const selectRecipesIsLoadingCurrentRecipe = (state) =>
  state.recipesSliceById.isLoadingCurrentRecipe;

export const selectRecipesError = (state) => state.recipesSliceById.error;

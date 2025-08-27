export const selectRecipesItems = ({ recipes }) => recipes.items;
export const selectCurrentRecipes = ({ recipes }) => recipes.currentRecipe;

export const selectRecipesIsLoadingCurrentRecipe = ({ recipes }) =>
  recipes.isLoadingCurrentRecipe;

export const selectRecipesError = ({ recipes }) => recipes.error;

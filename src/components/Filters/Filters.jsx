import { useDispatch, useSelector } from "react-redux";
import { selectTotalRecipes } from "../../redux/recipesList/selectors";
import { useEffect } from "react";
import Select from "react-select";

import { selectCategories } from "../../redux/categories/selectors";
import { selectIngredients } from "../../redux/ingredients/selectors";
import { fetchIngredients } from "../../redux/ingredients/operations";
import { fetchCategories } from "../../redux/categories/operations";

const Filters = () => {
  const dispatch = useDispatch();

  const recipesAmount = useSelector(selectTotalRecipes);
  const ingredients = useSelector(selectIngredients);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchCategories());
  }, [dispatch]);

  const ingredientsOptions = ingredients.map((ingredient) => ({
    value: ingredient.name,
    label: ingredient.name,
  }));

  const categoriesOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const handleResetFilters = () => {};

  return (
    <div>
      <p>{recipesAmount} recipes</p>
      <div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
        <Select options={categoriesOptions} />
        <Select options={ingredientsOptions} />
      </div>
    </div>
  );
};

export default Filters;

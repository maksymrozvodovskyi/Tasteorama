import { useDispatch, useSelector } from "react-redux";
import { selectTotalRecipes } from "../../redux/recipesList/selectors";
import { useEffect } from "react";
import Select from "react-select";
import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";
import {
  selectCategories,
  selectIngredients,
} from "../../redux/filters/selectors";

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
        <Select options={ingredientsOptions} />
        <Select options={categoriesOptions} />
      </div>
    </div>
  );
};

export default Filters;
